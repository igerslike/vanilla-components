import { InputOptions } from '@/core/types';

type Measure = string | number;

type Data = Record<string, unknown>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PromiseRejectFn = ((reason?: any) => void);

type FetchOptionsFn = (query?: string, nextPage?: number) => FetchedOptions;

type Truthy = boolean | string;

// eslint-disable-next-line @typescript-eslint/ban-types
type IconProp = Element | string | (Data & { render?: Function });

type FetchedOptions = Promise<{ results: InputOptions; hasMorePages?: boolean; }>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PreFetchOptionsFn = (currentValue?: any) => Promise<InputOptions>;

export {
  Measure,
  Data,
  PromiseRejectFn,
  FetchOptionsFn,
  Truthy,
  IconProp,
  FetchedOptions,
  PreFetchOptionsFn,
};


