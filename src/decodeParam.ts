/**
 * Extract the value for a given key in a url-encoded parameter string
 *
 * @param      {String} paramString The encoded parameter string
 * @param      {String} key The target key
 * @return     {String} Decoded value for given parameter key
 */

const decodeParam = (paramString: string, key: string): string => {
  return decodeURIComponent(
    paramString.replace(
      new RegExp(
        "^(?:.*[&\\?]" +
          // eslint-disable-next-line no-useless-escape
          encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") +
          "(?:\\=([^&]*))?)?.*$",
        "i"
      ),
      "$1"
    )
  );
};

export default decodeParam;
