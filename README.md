# annotate-failing-tests

Action to annotate github PRs with stack traces when they fail.

## Usage

Simply add to your workflow after a testing step, with a pointer to the junit test report.

```yaml
name: Verify Code 
jobs:
  test:
    env:
      GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}

    steps:
    
      - name: Run Tests
        runs: rails test
        
      - name: Annotate Source
        uses: Foodee/annotate-failing-tests@master
        with:
          report-file: report.xml
          language: ruby

```
