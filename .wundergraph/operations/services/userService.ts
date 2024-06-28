import { AppDataSource } from "../../../data-source";
import { User } from "../../../entities/user.entity";
import { validateInput } from "./validation";
import { sendSMS } from "./twilioClient";

export const userService = {
  createUser: async (input: any) => {
    const userRepository = AppDataSource.getRepository(User);

    // Validate the input
    await validateInput(input);

    // Create a new user instance
    const newUser = userRepository.create({
      first_name: input.first_name,
      middle_name: input.middle_name,
      last_name: input.last_name,
      email: input.email,
      mobile: input.mobile,
      status: input.status,
      is_citizen: input.is_citizen,
      nic_number: input.nic_number,
      passport_number: input.passport_number,
      token: input.token,
    });

    // Save the new user to the database
    await userRepository.save(newUser);
    // console.log(Math.floor(100000 + Math.random() * 900000));
    // const body = Math.floor(100000 + Math.random() * 900000);
    // const smsBody = `Hi ${input.first_name} ${input.last_name}! Your verification code: ${body}`;
    // await sendSMS(input.mobile, smsBody);

    return newUser;
  },

  getAllUsers: async () => {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    return users;
  },
};
