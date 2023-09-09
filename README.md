# Vite + TS + React + Tailwind Graphql + Boilerplate

## Node Engine

- If you are using nvm, run `nvm use` to use the correct node version.
- If you are not using nvm, make sure you are using node version `v16.17.1`. You can check your node version by running `node -v`.

## Installation

- Run `yarn install` to install all the dependencies.

## Running the app

- Run `yarn start` to start the app in development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Running the app in production mode

- Run `yarn build` to build the app for production.
- Run `yarn preview` to serve the app in production mode.
- Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## Running the app in docker

- Run `docker build -t vite-ts-react-app .` to build the docker image.
- Run `docker run -p 3000:3000 vite-ts-react-app` to run the docker image.
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Running the app in docker-compose

- Run `docker-compose up` to run the docker image.
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Running the app in docker-compose in production mode

- Run `export ENV=prod && docker compose up` to run the docker image.
- Run with tag `export ENV=prod TAG=1.0 && docker compose up` to run the docker image.
- Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## Generate the code coverage report

- Run `yarn test:coverage` to generate the code coverage report.

## Running the tests

- Run `yarn test` to run the tests.

## Running the tests in watch mode

- Run `yarn test:watch` to run the tests in watch mode.

## Generate GraphQL types

- Run `yarn codegen` to generate the GraphQL types.

## Generate GraphQL types in watch mode

- Run `yarn codegen:watch` to generate the GraphQL types in watch mode.

## Committing the code

- Run `yarn commit` to commit the code.

### Re-Usable Components

`QueryFetchTemplate` - The QueryFetchTemplate component is used to handle render the loading, error and no data states for a query fetcher.

**Example 1:** Benefit of using with `loadingContent` props is we don't need to worry about handle the `null/undefined` check for the data.

```tsx
const NoDataContent = () => <div>No Data</div>;

const LoadingContent = () => <div>Loading...</div>;

const DataContent = ({ listItems }: { listItems: any[] }) => (
  <div>
    {listItems.map(item => (
      <div key={item.id}>{item.name}</div>
    ))}
  </div>
);

const ExampleComponent = () => {
  const { loading, data, error } = useGraphQLQuery(graphqlQuery, {
    id: '1',
  });

  return (
    <QueryFetchTemplate
      loading={loading}
      error={error}
      data={data}
      noDataContent={<NoDataContent />}
      loadingContent={<LoadingContent />}
    >
      {({ data }) => <DataContent listItems={data} />}
    </QueryFetchTemplate>
  );
};
```

**Example 2:** Benefit of using without `loadingContent` props is we can pass `isLoading` value to all the children components while loading for the data.

```tsx
const NoDataContent = () => <div>No Data</div>;

const Child1 = ({ isLoading, listItems }) => (isLoading ? <div>Loading..</div> : <div>{listItems[0]}</div>);
const Child2 = ({ isLoading, listItems }) => (isLoading ? <div>Loading..</div> : <div>{listItems[1]}</div>);

const DataContent = ({ isLoading, listItems }: { isLoading: boolean; listItems: any[] }) => (
  <div>
    <Child1 isLoading={isLoading} listItems={listItems} />
    <Child2 isLoading={isLoading} listItems={listItems} />
  </div>
);

const ExampleComponent = () => {
  const { loading, data, error } = useGraphQLQuery(graphqlQuery, {
    id: '1',
  });
  return (
    <QueryFetchTemplate loading={loading} error={error} data={data} noDataContent={<NoDataContent />}>
      {({ data, isLoading }) => <DataContent isLoading={isLoading} listItems={data} />}
    </QueryFetchTemplate>
  );
};
```
