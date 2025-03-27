/**
 * Object consisting from string properties and string values
 */
interface SSO {
  [key: string]: string;
}

/**
 * Transpose opts to url query
 * @param url baseUrl
 * @param opts opts to transpose
 * @returns result url
 */
function applyOpts(url: string, opts: SSO) {
  let tmp = url;
  for (const k in opts) {
    tmp += `${!tmp.includes('?') ? '?' : '&'}${k}=${encodeURIComponent(opts[k])}`;
  }
  return tmp;
}

/**
 * Perform json request to url, parse and returns first object in array.
 * Also logging api errors
 */
function jSONArrayRequestGetFirst(url: string): SSO {
  const res = UrlFetchApp.fetch(url);
  if (res.getResponseCode() !== 200)
    throw `Peppy responded with code ${res.getResponseCode()} you baka. Responce body: ${res.getContentText()}`;
  const text = res.getContentText('UTF8');
  const json = JSON.parse(text)[0];
  if (json) return json;

  const error = `Api error: ${url} ${text} ${json}`;
  Logger.log(error);
  throw error;
}

function checkApiKey(key: string): boolean {
  try {
    jSONArrayRequestGetFirst(
      applyOpts(`${Config.baseUrl}/get_user`, {
        k: key,
        type: 'id',
        u: '2',
      }),
    );

    return true;
  } catch {
    return false;
  }
}

function addApiKey(opts: SSO): SSO {
  return {
    ...opts,
    k: Config.getApiKey(),
  };
}

function getDocumentLock() {
  const lock = LockService.getDocumentLock();
  if (!lock) throw new Error("Can't aquire document lock!");

  return lock;
}

function getDocumentCache() {
  const cache = CacheService.getDocumentCache();
  if (!cache) throw new Error("Can't aquire document cache!");

  return cache;
}
