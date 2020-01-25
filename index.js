const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const github = require('@actions/github');
const {Octokit} = require("@octokit/action");
const core = require('@actions/core');
const Parser = require("junitxml-to-javascript");
const {SourceMapConsumer} = require("source-map");
const convert = require('xml-js');

async function reportToGithub(annotations) {
  try {
    const octokit = new Octokit();
    const ref = github.context.sha;
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
    const check_run = process.env.GITHUB_WORKFLOW;

    console.log(`Ref: ${ref}`);
    console.log(`Owner: ${owner}`);
    console.log(`Repo: ${repo}`);
    console.log(`Workflow: ${workflow}`);
    console.log(`Check Run: ${check_run}`);

    const {data: {check_runs}} = await octokit.checks.listForRef({
      owner,
      repo,
      ref,
      check_run,
      status: "in_progress"
    });

    const checkRunNameEnvVar = core.getInput('checkRunNameEnvVar', {required: true});
    const checkRunNameVarPart = process.env[checkRunNameEnvVar];
    const check_run_id = check_runs.filter(cr => cr.name.indexOf(checkRunNameVarPart) >= 0)[0].id;

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
  async ruby(lines) {
    const source = lines[lines.length - 1];
    return source.split(':');
  },

  async js(lines) {
    const sourceLine = lines[2];
    const [_, mapped_line, mapped_column] = /(\d+):(\d+)/.exec(sourceLine) || [];
    const {source, line} = await unMap(parseInt(mapped_line), parseInt(mapped_column));

    return [source, line];
  }

};

async function extractAnnotations(file, language = 'ruby') {
  const {assign} = Object;
  const testSuites = convert.xml2js(await readFile(file))
    .elements
    .map(_ => assign({
      testCases: _.elements.map(_ => assign({
        error: _.elements ? _.elements.map(_ => assign({
          content: _.elements[0].cdata
        }, _.attributes))[0] : null
      }, _.attributes))
    }, _.attributes));

  async function extractAnnotation(testCase) {
    const lines = (testCase.error.content || testCase.error.message).trim().split('\n');
    const [source, line] = await EXTRACTORS[language](lines);

    return ({
      path: source.trim(),
      start_line: line,
      end_line: line,
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

async function unMap(line, column, mapFile = 'tests.map') {
  const rawSourceMap = JSON.parse(await readFile(mapFile));
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
  console.log(JSON.stringify(annotations, null, 2));

  console.log('Reporting to github');
  await reportToGithub(annotations);
}


const path = core.getInput('report-file');
const language = core.getInput('language');

console.log(`Running Annotate Failing Tests Action ${path} in language${language}`);

if (path) {
  run(path, language);
}


