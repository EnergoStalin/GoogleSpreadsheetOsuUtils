/**
 * Fetch user (caching for 7 days applied)
 * @param name user to fetch
 * @returns js object patched with some custom properties
 */
function getUser(name: string) {
  const lock = getDocumentLock();

  try {
    lock.waitLock(300000);
    return Config.isCachingEnabled() ? _getUserCached(name) : _getUser(name);
  } finally {
    lock.releaseLock();
  }
}

function _getUserCached(name: string) {
  const cache = getDocumentCache();
  const cacheKey = `u/${name}`;

  if (!Config.shouldIgnoreCached()) {
    const json = cache.get(cacheKey);
    if (json) {
      const obj = JSON.parse(json);
      if (obj) {
        Logger.log(`Got cached result: ${cacheKey}`);
        return obj;
      }
    }
  }

  const user = _getUser(name);
  cache.put(
    cacheKey,
    JSON.stringify(user),
    Number.parseInt(Config.getCacheTime()),
  );

  return user;
}

function _getUser(name: string) {
  const user = jSONArrayRequestGetFirst(
    applyOpts(
      `${Config.baseUrl}/get_user`,
      addApiKey({
        u: name,
        m: Config.getGameMode(),
      }),
    ),
  );

  user.cover_url = `http://s.ppy.sh/a/${user.user_id}`;

  Logger.log(`Fetched from api: ${name}`);

  return user;
}
