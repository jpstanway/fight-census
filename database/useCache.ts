import * as env from 'env-var';
import bluebird from "bluebird";
import redis from "redis";

const useCache = async (resource: string, getResource: any, arg: null | string = null) => {
  bluebird.promisifyAll(redis.RedisClient.prototype);
  const CACHE_URI: string = env.get('CACHE_URI').required().asString();
  const CACHE_PORT: string = env.get('CACHE_PORT').required().asString();
  const options = { host: CACHE_URI };
  const cache = redis.createClient(CACHE_PORT, options);
  let data: any = {};

  // check in-memory cache for card data
  await cache.existsAsync(resource)
    .then(async (reply: any) => {
      if (reply !== 1) {
        // cache miss, need to fetch
        data = arg ? await getResource(arg) : await getResource();
        // assign resource in cache with expiration time
        cache.set(resource, JSON.stringify(data), "EX", 86400);
      } else {
        // cache hit, get data from redis
        data = JSON.parse(await cache.getAsync(resource));
      }
    })
    .catch((error: any) => {
      throw new Error(`RedisError: ${error.message}`);
    });

  return data;
};

export default useCache;
