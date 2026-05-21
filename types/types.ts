export type ResponseType<T> = {
  count: number;
  page: number;
  numOfPage: number;
  next: number | null;
  prev: number | null;
  results: T;
  from: number;
  to: number;
};
