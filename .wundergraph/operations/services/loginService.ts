import { AppDataSource } from "../../../data-source";
import { CustomerOtp } from "../../../entities/customerOtp.entity";
import { User } from "../../../entities/user.entity";
import { otpGenerator, otpBody } from "./otpService";
import { sendSMS } from "./twilioClient";
import { generateToken } from "../../auth/jwt";

export const loginService = {
  login: async (input: any) => {
    const userRepository = AppDataSource.getRepository(User);
    const customerOtpRepository = AppDataSource.getRepository(CustomerOtp);

    const user = await userRepository.findOne({
      where: { mobile: input.mobile },
    });
    if (!user) {
      throw new Error("No user found.");
    }
    const otp = otpGenerator();
    const body = otpBody(otp);
    await sendSMS(otp, body);

    const newOtp = customerOtpRepository.create({
      otp: otp,
      user: user,
    });
    await customerOtpRepository.save(newOtp);

    const token = generateToken({ id: user.id, mobile: user.mobile });
    return {
      message: "OTP sent successfully.",
      otp: newOtp, // Optionally return the OTP object or any other necessary data
      token, // Return the generated token
    };
  },
};
