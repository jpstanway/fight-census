import "redis";

declare module "redis" {
  export interface RedisClient {
    existsAsync: any;
    getAsync: any;
  }
}