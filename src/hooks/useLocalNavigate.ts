import type { NavigateOptions } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

type GetParamFromPathResult<TParam extends PropertyKey> = { [key in TParam]: string };
type GetParamFromPath<TPath extends string> = TPath extends `${string}:${infer TParam}/${infer TRest}`
  ? GetParamFromPathResult<TParam> & GetParamFromPath<TRest>
  : TPath extends `${string}:${infer TParam}`
  ? GetParamFromPathResult<TParam>
  : unknown;

export const useLocalNavigate = () => {
  const navigate = useNavigate();
  const customNavigate = <TPath extends string>(
    path: TPath,
    options?: NavigateOptions & { params?: GetParamFromPath<TPath>; query?: Record<string, string> },
  ) => {
    const { params, query, ...rest } = options || { params: {}, query: {} };

    const paramEntries = Object.entries<string>(params || {});
    const pathWithParams = paramEntries.reduce((acc: string, [key, value]) => {
      return acc.replace(`:${key}`, value);
    }, path);

    const queryEntries = Object.entries<string>(query || {});
    const queryString = queryEntries.reduce((acc: string, [key, value]) => {
      return `${acc}${acc ? '&' : '?'}${key}=${value}`;
    }, '');

    navigate(`${pathWithParams}${queryString}`, rest);
  };

  return customNavigate;
};
