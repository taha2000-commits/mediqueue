export const fetchData: (params: {
  url: string | URL | Request;
  init?: RequestInit | undefined;
}) => Promise<Response> = async ({ url, init }) => {
  const baseUrl = "http://localhost:3000/api";
  return await fetch(`${baseUrl}${url}`, init);
};
