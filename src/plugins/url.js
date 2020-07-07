// eslint-disable-next-line import/prefer-default-export
export function encodeQueryData(data) {
  const ret = [];

  Object.keys(data).forEach((key) => {
    ret.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
  });
  return ret.join('&');
}
