import { send } from "process";
import { AppDataSource } from "../../../data-source";
import { CustomerOtp } from "../../../entities/customerOtp.entity";
import { User } from "../../../entities/user.entity";
import { otpGenerator, otpBody } from "./otpService";
import { sendSMS } from "./twilioClient";

export const smsService = async (input: any) => {
  const userRepository = AppDataSource.getRepository(User);
  const customerOtpRepository = AppDataSource.getRepository(CustomerOtp);

  const user = await userRepository.findOne({
    where: { token: input.token },
  });

  if (!user) {
    throw new Error("User not found");
  }
  const otp = otpGenerator();
  const body = otpBody(otp);

  const newOtp = customerOtpRepository.create({
    otp: otp,
    user: user,
  });
  await customerOtpRepository.save(newOtp);

  await sendSMS(input.mobile, body);
  return {
    message: "OTP sent successfully.",
    otp: newOtp,
  };
};
