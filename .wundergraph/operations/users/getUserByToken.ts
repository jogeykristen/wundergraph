import { createOperation, z } from "../../generated/wundergraph.factory";
import { getService } from "../services/getService";

export default createOperation.mutation({
  input: z.object({
    token: z.string(),
  }),
  handler: async ({ input }) => {
    const user = await getService.getUser(input.token);
    return user;
  },
});
