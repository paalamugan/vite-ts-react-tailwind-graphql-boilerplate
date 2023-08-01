import type { CodegenConfig } from '@graphql-codegen/cli';

// import { devEnvConfig } from '@/config/dev';

// Only used for local development, So use dev environment url and api key for download the schema from appsync
const config: CodegenConfig = {
  schema: [
    'https://swapi-graphql.netlify.app/.netlify/functions/index',
    // {
    //   [devEnvConfig.apiUrl]: {
    //     headers: {
    //       'X-Api-Key': devEnvConfig.apiKey,
    //     },
    //   },
    // },
  ],
  documents: ['src/graphql/**/*.{ts,tsx}', '!src/gql/**/*'],
  generates: {
    './src/gql/': {
      config: {
        documentMode: 'string',
      },
      hooks: { afterAllFileWrite: ['prettier --write'] },
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
    },
    './schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
};

export default config;
