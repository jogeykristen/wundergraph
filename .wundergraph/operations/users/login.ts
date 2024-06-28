import { createOperation, z } from "../../generated/wundergraph.factory";
import { CustomerOtp } from "../../../entities/customerOtp.entity";
import { loginService } from "../services/loginService";

const login = createOperation.mutation({
  input: z.object({
    mobile: z.string().regex(/^(\+91\d{10}|\d{10})$/),
  }),
  handler: async ({ input }) => {
    const newUser = await loginService.login(input);
    return newUser;
  },
});

export default login;
