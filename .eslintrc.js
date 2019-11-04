module.exports = {
    "plugins": ["jest"],
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
        "jquery": true,
        "jest/globals": true
    },
    "extends": ["eslint:recommended", "plugin:jest/recommended"],
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    rules: {
        'no-console': 'off',
        "linebreak-style": 'off',
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
        "no-console": 0
    },
};