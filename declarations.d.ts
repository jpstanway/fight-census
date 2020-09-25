import "redux";
import "redis";

declare module "redux" {
  export interface Store {
    _persist: any;
    __persistor: any;
  }
}

declare module "redis" {
  export interface RedisClient {
    existsAsync: any;
    getAsync: any;
  }
}
