const CacheSymbol = Symbol.for("RequestCacheSymbol");
window[CacheSymbol] = window[CacheSymbol] || {};
const cache = window[CacheSymbol];

const myRequest = (path, leftRetry = 3) => {
  if (!cache[path]) {
    cache[path] = requestWithRetry(path, leftRetry).catch((err) => {
      cache[path] = null;
      console.warn(`request for ${path} failed after ${leftRetry} retry`);
      throw err;
    });
  }
  return cache[path];
};

const requestWithRetry = (path, leftRetry) =>
  fetch(path)
    .then((res) => {
      if (!res.ok) {
        throw Error(`request failed`);
      }
      return res.json();
    })
    .catch((err) => {
      if (leftRetry) {
        return requestWithRetry(path, --leftRetry);
      }
      throw err;
    });

export default myRequest;

// test
// for (let i = 0; i < 5; i++) {
//   request("https://api.github.com/").then(console.log);
// }
// request("https://api.github.com/not_found").then(console.log, console.error);
