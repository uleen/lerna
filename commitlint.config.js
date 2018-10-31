module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        "scope-case": [2, 'always', 'upper-case'],
        "subject-case": [2, 'always', 'sentence-case'],
        "type-enum": [2, 'always', ['feature', 'fix', 'docs', 'style','test', 'release']]
    },
    parserPreset: {
      parserOpts: {
        issuePrefixes: ['FC-']
      }
    }
};
