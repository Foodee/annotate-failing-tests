import { extractAnnotations } from "./index";

test('extracts annotations from ruby stack traces', async () => {
  const annotations = await extractAnnotations('test-ruby.xml');

  expect(annotations).toStrictEqual([
    {
      "path": "test/models/accounting/consolidation_configuration_test.rb",
      "start_line": 7,
      "end_line": 7,
      "annotation_level": "failure",
      "message": "Error:\nAccounting::ConsolidationConfiguration#test_0001_is a factory for consolidation runs:\nNoMethodError: undefined method `default_area' for nil:NilClass\n    app/models/accounting/consolidation_configuration.rb:64:in `next_identifier'\n    app/models/accounting/consolidation_configuration.rb:50:in `build_run'\n    test/models/accounting/consolidation_configuration_test.rb:7:in `block (2 levels) in <top (required)>'\n",
      "title": "test_0001_is a factory for consolidation runs Failed"
    }
  ])
});

test('extracts annotations from ember stack traces', async () => {
  const annotations = await extractAnnotations('test-ember.xml', 'ember_js_mocha');

  expect(annotations).toStrictEqual([
    {
      "path": "star-fox/tests/unit/features/logged-in/orders/route-test.js",
      "start_line": 11,
      "end_line": 11,
      "annotation_level": "failure",
      "message": "(0 , _chai.expect)(...).to.be is not a function",
      "title": "LoggedInOrdersRoute exists  Failed"
    }
  ])
});
