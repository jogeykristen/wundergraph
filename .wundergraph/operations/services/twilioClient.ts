import { Twilio } from "twilio";

const accountSid = "";
const authToken = "";

const fromPhoneNumber = "+15037663789";

const client = new Twilio(accountSid, authToken);

export const sendSMS = async (to: string, body: string) => {
  try {
    const message = await client.messages.create({
      body,
      from: fromPhoneNumber,
      to: "+917736356358",
    });
    console.log("Message sent successfully:", message.sid);
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
