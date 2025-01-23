import { prisma } from "./prisma.service";
import crypto from "crypto"

export const createResetToken = async (userId: string) => {
  try {
    const token = crypto.randomBytes(16).toString("hex")

    return await prisma.resetToken.create({
      data: {
        token,
        userId,
        expiresIn: new Date(Date.now() + 5 * 60 * 1000),
      },
    });
  } catch (error: any) {
    console.error("Error creating reset token: ", error.message);
  }
};