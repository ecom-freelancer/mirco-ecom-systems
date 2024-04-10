/* eslint-disable @typescript-eslint/ban-types */
import dayjs from 'dayjs';
import { cleanObject } from '../helpers';
import { useMemo } from 'react';

export interface ObjectMap {}

export const getQueryString = (params: ObjectMap) => {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach(
    (key) => params[key] && searchParams.append(key, params[key]),
  );
  return searchParams.toString();
};

export type QueryConfig<Q extends {} = ObjectMap> = {
  [K in keyof Q]?: (value?: string) => Q[K] | undefined;
};

function paramsToObject<T extends { [key: string]: string } = {}>(
  searchParams: URLSearchParams,
  config?: QueryConfig<T>,
): T {
  const result: ObjectMap = {};
  for (const [key, value] of searchParams.entries()) {
    result[key] = config?.[key as keyof QueryConfig<T>]
      ? config[key as keyof QueryConfig<T>]?.(value)
      : value;
  }
  return result as T;
}

export const getQueryParams = <T extends {}>(
  searchString?: string,
  config?: QueryConfig<T>,
): Partial<T> => {
  if (!searchString) {
    return {};
  }
  const urlParams = new URLSearchParams(searchString);
  const params = paramsToObject(urlParams, config);
  return params;
};

/**
 * @fact
 * next-router is cache by nginx and return in `getServerSideProps`, `getInitialProps`
 * when we use useRouter hook, this means `router.query` is fetched from cache
 *
 * @solution
 * get the correct query from current URL instead of cache.
 */
export const useQuery = <T extends {}>(
  config?: QueryConfig<T>,
  search?: string,
  onNavigate?: (query: string) => void,
) => {
  //   const location = useLocation();
  //   const navigate = useNavigate();

  const query = useMemo((): Partial<T> => {
    try {
      return getQueryParams(search, config);
    } catch (e) {
      return {};
    }
  }, [location.search]);

  const setQueryParams = (params: T) => {
    onNavigate(
      getQueryString(
        cleanObject({
          ...params,
        }),
      ),
    );
  };
  return [query, setQueryParams] as const;
};

export const NumberParam = (value?: string) => {
  try {
    if (!value) return undefined;
    return Number(value);
  } catch {
    return undefined;
  }
};
export const StringParam = <T = string>(value?: string) => value as T;

export const DateParam = (value?: string) => {
  try {
    return dayjs(value);
  } catch (e) {
    return;
  }
};

export const BoolParam = (value?: string) => value == 'true' || value == '1';

export const ArrayStringParam = <T extends string>(
  value?: string,
  splitChar = ',',
): T[] => (value || '').split(splitChar).filter((a) => !!a) as T[];

export const ArrayNumberParam = (value?: string, splitChar = ',') =>
  (value || '').split(splitChar).map(NumberParam) as number[];
