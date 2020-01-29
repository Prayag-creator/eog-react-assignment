//metric names are fetched from the API and passed to getInputQuery to avoid hardcoding the query
const getMetricsQuery = `
  query{
    getMetrics
  }
`;
export default getMetricsQuery;
