module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        "subject-case": [2, 'always', 'sentence-case'],
        "type-enum": [2, 'always', ['feature', 'fix', 'docs', 'style','test', 'release']]
    }
};
