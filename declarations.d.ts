import "redux";

declare module "redux" {
  export interface Store {
    __persistor: any;
  }
}
