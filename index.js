const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const github = require('@actions/github');
const {Octokit} = require("@octokit/action");
const core = require('@actions/core');
const {SourceMapConsumer} = require("source-map");
const convert = require('xml-js');

const parsePullRequestId = githubRef => {
  const result = /refs\/pull\/(\d+)\/merge/g.exec(githubRef);
  if (!result) throw new Error("Reference not found.");
  const [, pullRequestId] = result;
  return pullRequestId;
};

async function reportToGithub(annotations) {
  try {
    const octokit = new Octokit();
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
    const check_run = process.env.GITHUB_WORKFLOW;

    const checkName = core.getInput('check-name', {required: true});

    // if we're running on a PR we need to get the last commit
    const pull_number = github.event.number;

    console.log(`Pull Number: ${pull_number}`);

    const {data} = await octokit.pulls.listCommits({
      owner,
      repo,
      pull_number
    });

    const commits = data;

    console.log(JSON.stringify(commits, null, 2));

    const ref = commits[commits.length - 1].sha;

    console.log(`Ref: ${ref}`);
    console.log(`Owner: ${owner}`);
    console.log(`Repo: ${repo}`);
    console.log(`Check Run: ${check_run}`);

    const res = await octokit.checks.listForRef({
      owner,
      repo,
      ref,
      // check_run,
      status: "in_progress"
    });

    const {data: {check_runs}} = res;

    console.log('Checks');
    console.log(JSON.stringify(check_runs, null, 2));

    const check_run_id = check_runs.filter(cr => cr.name === checkName)[0].id;

    await octokit.checks.update({
      owner,
      repo,
      check_run_id,
      output: {title: `${check_run} Check Run`, summary: `${annotations.length} errors(s) found`, annotations}
    });
  } catch (e) {
    console.log(e)
  }
}

const EXTRACTORS = {

  async ruby(stack_trace) {
    const testRoot = core.getInput('test-root');
    console.log('Searching for test root: ' + testRoot);
    console.log('In: ');
    console.log(JSON.stringify(stack_trace, null, 2));
    let start = stack_trace.find(_ =>  _.includes(testRoot));
    console.log('Found: ' + start);

    let path = start.split(`${testRoot}/`)[1];
    const [source, line] = path.split(':');

    return [source, line];
  },

  async ember_js_mocha(stack_trace) {
    let sourceLine = stack_trace.find(_ => _.includes('test-support.js'));
    const inTestSupport = !!sourceLine;

    sourceLine = sourceLine ? sourceLine : stack_trace.find(_ => _.includes('tests.js'));
    const mapFile = inTestSupport ? 'test-support.map' : 'tests.map';

    const [_, mapped_line, mapped_column] = /(\d+):(\d+)/.exec(sourceLine) || [];
    const {source, line} = await unMap(parseInt(mapped_line), parseInt(mapped_column), mapFile);

    return [source, line];
  }

};

async function extractAnnotations(file, language = 'ruby') {
  const {assign} = Object;

  // Extract relevant info from the junit test report didn't use an NPM package
  // as it does not extract content from error message which in the case of
  // ember JS is where the stack trace lives.

  let string = await readFile(file, 'utf8');
  const testSuites = convert
    .xml2js(string)
    .elements
    .map(_ => assign({
      testCases: _.elements.map(_ => assign({
        error: _.elements ? _.elements.map(_ => assign({
          content: _.elements[0].cdata || _.elements[0].text
        }, _.attributes))[0] : null
      }, _.attributes))
    }, _.attributes));

  async function extractAnnotation(testCase) {
    console.log('Extracting Error From: ');
    console.log(JSON.stringify(testCase, null, 2));

    const lines = testCase.error.content.trim().split('\n');
    const [source, line] = await EXTRACTORS[language](lines);

    console.log(`Found source: ${source} line: ${line}`);
    return ({
      path: source.trim(),
      start_line: parseInt(line, 10),
      end_line: parseInt(line, 10),
      annotation_level: "failure",
      message: testCase.error.message,
      title: `${testCase.name} Failed`
    });
  }

  return Promise
    .all(
      testSuites
        .map(testSuite => testSuite
          .testCases
          .filter(testCase => testCase.error)
          .map(extractAnnotation)
        ).flat()
    );
}

async function unMap(line, column, mapFile) {
  const fullMapFile = `${core.getInput('asset-folder')}/${mapFile}`;
  const rawSourceMap = JSON.parse(await readFile(fullMapFile));
  return await SourceMapConsumer.with(rawSourceMap, null, _ =>
    _.originalPositionFor({
      line: line,
      column: column
    })
  );
}

async function run(path, language) {
  console.log(`Extracting to annotations from ${path} in language${language}`);
  const annotations = await extractAnnotations(path, language);
  console.log('Extracted Annoations');
  console.log(JSON.stringify(annotations, null, 2));
  console.log('Reporting to github');
  await reportToGithub(annotations);
}


const path = core.getInput('report-file');
const assetPath = core.getInput('asset-folder');
const language = core.getInput('language');

console.log(`Running Annotate Failing Tests Action ${path} in language ${language} with asset path ${assetPath}`);

if (path, language) {
  run(path, language);
}
