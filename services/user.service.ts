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

export const getUserByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({
      where: {
        email
      }
    })
  } catch (error: any) {
    console.error("Error getting user by email: ", error.message)
  }
}

export const getUserById = async (id: string) => {
  try {
    return await prisma.user.findUnique({
      where: {
        id
      }
    })
  } catch (error: any) {
    console.error("Error getting user by id: ", error.message)
  }
}