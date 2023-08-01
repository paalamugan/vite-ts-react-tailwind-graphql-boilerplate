import { graphql } from '@/gql';

export const FilmItemFragment = graphql(/* GraphQL */ `
  fragment FilmItemFragment on Film {
    title
    director
    releaseDate
  }
`);
