import { prisma } from "./prisma.service";
import crypto from "crypto";

export const createOtp = async (userId: string) => {
  try {
    const otp = crypto.randomInt(1000, 9999)
    const hashedOtp = crypto
      .createHash("sha256")
      .update(otp.toString())
      .digest("hex");

    await prisma.otp.create({
      data: {
        otp: hashedOtp,
        userId,
        expiresIn: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    return otp;
  } catch (error: any) {
    console.error("Error creating OTP: ", error.message);
  }
};