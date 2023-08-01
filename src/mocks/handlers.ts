import { graphql, rest } from 'msw';

export const restHandlers = [
  rest.get('http://localhost:3000/dummmy.json', (_req, res, ctx) => {
    const data = {
      message: 'Hello World',
    };

    return res(ctx.status(200), ctx.json(data));
  }),
];

const posts = [
  {
    id: 1,
  },
];

export const graphqlHandlers = [
  graphql.query('https://graphql-endpoint.example/api/v1/posts', (_req, res, ctx) => {
    return res(ctx.data(posts));
  }),
];
