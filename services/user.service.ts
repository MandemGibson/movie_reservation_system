import { prisma } from "./prisma.service";

export const addUser = async (payload: {
  fullname: string;
  email: string;
  password: string;
}) => {
  try {
    return await prisma.user.create({
      data: payload,
    });
  } catch (error: any) {
    console.error("Error adding a user: ", error.message);
  }
};

export const getAllUsers = async () => {
  try {
    return await prisma.user.findMany()
  } catch (error: any) {
    console.error("Error getting all users: ", error.message)
  }
}
