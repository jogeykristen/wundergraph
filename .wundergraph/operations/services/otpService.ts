export const otpGenerator = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const otpBody = (otp: string) => {
  return `your verification code is ${otp}`;
};
