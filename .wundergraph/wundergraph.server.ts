import { configureWunderGraphServer } from "@wundergraph/sdk/server";
import "reflect-metadata";

export default configureWunderGraphServer(() => ({
  hooks: {
    queries: {
      Countries: {
        preResolve: async ({ operations }) => {},
      },
    },
    mutations: {},
  },
}));
