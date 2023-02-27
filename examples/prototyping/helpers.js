import Cache from "file-system-cache";

const cache = new Cache.FileSystemCache({
  basePath: "./.cache", // Optional. Path where cache files are stored (default).
});

const getCache = async (cacheKey) => {
  let cached = await cache.get(cacheKey)
  if (cached) {
    const now = new Date();
    if (cached.expiresAt <= now.getTime()) {
      return false;
    }

    return JSON.parse(cached.content);
  }

  return false;
}

const setCache = async (cacheKey, content, expiresIn = undefined) => {
  const now = new Date()
  const cacheExpiresIn = expiresIn || 60
  const status = await cache.set(cacheKey, {
    'expiresAt': now.setSeconds(now.getSeconds() + cacheExpiresIn),
    'content': JSON.stringify(content)
  })
  return status;
}

const helpers = { getCache, setCache }

export default helpers