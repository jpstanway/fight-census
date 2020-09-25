import bluebird from "bluebird";
import redis from "redis";

const useCache = async (resource: string, getResource: any, arg = false) => {
  bluebird.promisifyAll(redis.RedisClient.prototype);
  const cache = redis.createClient();
  let data: any = {};

  // check in-memory cache for card data
  await cache.existsAsync(resource).then(async (reply: any) => {
    if (reply !== 1) {
      // cache miss, need to fetch
      data = arg ? await getResource(resource) : await getResource();
      // assign resource in cache with 7 day lifetime
      cache.set(resource, JSON.stringify(data), "EX", 86400 * 3);
    } else {
      // cache hit, get data from redis
      data = JSON.parse(await cache.getAsync(resource));
    }
  });

  return data;
};

export default useCache;