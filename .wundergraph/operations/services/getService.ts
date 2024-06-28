import { AppDataSource } from "../../../data-source";
import { User } from "../../../entities/user.entity";

export const getService = {
  getUser: async (token: string) => {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { token: token } });
    console.log("user = ", user);
    if (!user) {
      throw new Error("No user found.");
    }
    return user;
  },
};
