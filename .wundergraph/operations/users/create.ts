import { createOperation, z } from "../../generated/wundergraph.factory";
//import { validateInput } from "../services/validation";
import { userService } from "../services/userService";
import { sendSMS } from "../services/twilioClient";
import { smsService } from "../services/smsService";

const createUserMutation = createOperation.mutation({
  input: z.object({
    first_name: z.string(),
    middle_name: z.string().optional(),
    last_name: z.string(),
    email: z.string().email(),
    mobile: z.string().regex(/^(\+91\d{10}|\d{10})$/),
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
    is_citizen: z.boolean(),
    nic_number: z.string().optional(),
    passport_number: z.string().optional(),
    token: z.string(),
  }),
  handler: async ({ input }) => {
    const newUser = await userService.createUser(input);
    const otp = await smsService(input);
    return otp;
  },
});

export default createUserMutation;
