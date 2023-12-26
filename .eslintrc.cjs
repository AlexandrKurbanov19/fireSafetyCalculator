module.exports = {
  env: {
    browser: true,
    es2021: true,
    // 'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
    'plugin:vitest/recommended',
    'plugin:react-perf/all',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'tsc',
    'react',
    '@typescript-eslint',
    'graphql',
    'vitest',
    'react-perf',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'tsc/config': [1, {
      configFile: 'tsconfig.json',
    }],
    'graphql/template-strings': ['error', {
      // Import default settings for your GraphQL client. Supported values:
      // 'apollo', 'relay', 'lokka', 'fraql', 'literal'
      env: 'apollo',
      // Import your schema JSON here
      schemaJson: require('./graphql.schema.json'),

      // OR provide absolute path to your schema JSON (but not if using `eslint --cache`!)
      // schemaJsonFilepath: path.resolve(__dirname, './schema.json'),

      // OR provide the schema in the Schema Language format
      // schemaString: printSchema(schema),

      // tagName is gql by default
    }],

    'react/jsx-filename-extension': [2, {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }],
    'import/extensions': 0,
    'react/function-component-definition': [2, {
      namedComponents: 'arrow-function',
    }],
    'no-underscore-dangle': 0,
    'no-nested-ternary': 0,
    'react/no-unstable-nested-components': [2, {
      allowAsProps: true,
    }],
    'react/jsx-no-bind': 0,
    'class-methods-use-this': 0,
    'no-plusplus': 0,
    'react/static-property-placement': 0,
    'react/default-props-match-prop-types': 0,
    'react/no-unused-prop-types': 0,
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 0,
    'no-param-reassign': 0,
    '@typescript-eslint/naming-convention': 0,
    'max-len': ['error', {
      code: 120,
      tabWidth: 2,
      ignoreComments: true,
      ignoreTrailingComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    }],
    'no-console': ['error', {
      allow: ['warn', 'error', 'time', 'timeEnd'],
    }],

    // TODO: Прощаем некоторые грехи TS, а по хорошему надо исправить
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
    '@typescript-eslint/no-this-alias': 'warn',

    // TODO: Прощаем некоторые грехи оптимизации, а по хорошему надо исправить
    'react-perf/jsx-no-new-object-as-prop': 'warn',
    'react-perf/jsx-no-new-array-as-prop': 'warn',
    'react-perf/jsx-no-new-function-as-prop': 'warn',
    'react-perf/jsx-no-jsx-as-prop': 'off',

    "import/no-extraneous-dependencies": [
      "error", {
      "devDependencies": true
    }]
  },
  ignorePatterns: ['src/generated/*.*'],
};
