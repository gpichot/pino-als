import { AsyncLocalStorage } from "async_hooks";
import pino from "pino";

type Store = Map<string, string>;

export const als = new AsyncLocalStorage<Store>();

const logger = pino({
  mixin() {
    const store = als.getStore();
    const requestId = store?.get("requestId");
    const requestNumber = store?.get("requestNumber");

    return { requestId, requestNumber };
  },
});

export default logger;
