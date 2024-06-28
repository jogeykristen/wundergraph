import { createOperation } from "../../generated/wundergraph.factory";
import { userService } from "../services/userService";
import { authMiddleware } from "../../auth/middleware";

const JWT_SECRET = "key";

const getAllUsersQuery = createOperation.query({
  handler: async ({ context }) => {
    authMiddleware(context.req, context.res, () => {});
    const users = await userService.getAllUsers();
    return users;
  },
});

export default getAllUsersQuery;
