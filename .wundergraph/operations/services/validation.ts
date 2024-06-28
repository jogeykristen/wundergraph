import { AppDataSource } from "../../../data-source";
import { User } from "../../../entities/user.entity";

export async function validateInput(input: any) {
  if (input.is_citizen && !input.nic_number) {
    throw new Error("NIC number is required for citizens.");
  }
  if (!input.is_citizen && !input.passport_number) {
    throw new Error("Passport number is required for non-citizens.");
  }

  const userRepository = AppDataSource.getRepository(User);

  // Check if email or mobile already exists in the database
  const existingUser = await userRepository.findOne({
    where: [
      { email: input.email },
      { mobile: input.mobile },
      { token: input.token },
    ],
  });
  if (existingUser) {
    throw new Error("Email or mobile number already exists.");
  }
}
