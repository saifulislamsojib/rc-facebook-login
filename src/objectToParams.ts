/**
 * Encode object to url parameters
 *
 * @param      {Object} params The object needs to encode as url parameters
 * @return     {String} Encoded url parameters
 */
const objectToParams = (params: Record<string, any>): string =>
  "?" +
  Object.keys(params)
    .map((param) => `${param}=${encodeURIComponent(params[param])}`)
    .join("&");
export default objectToParams;
