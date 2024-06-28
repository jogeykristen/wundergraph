import { createOperation, z } from "../../generated/wundergraph.factory";
import { smsService } from "../services/smsService";

const sms = createOperation.mutation({
  input: z.object({
    token: z.string(),
  }),
  handler: async ({ input }) => {
    const newUSer = await smsService(input);
    return newUSer;
  },
});
export default sms;
