import { User } from "@prisma/client";
import { prisma } from "./prisma.service";

export const addUser = async (payload: User) => {
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

export const updateUser = async (id: string, payload: {
  fullname?: string;
  email?: string;
  password?: string;
}) => {
  try {
    return await prisma.user.update({
      where: {
        id
      },
      data: payload
    })
  } catch (error: any) {
    console.error("Error updating user: ", error.message)
  }
}

export const deleteUser = async (id: string) => {
  try {
    return await prisma.user.delete({
      where: {
        id
      }
    })
  } catch (error: any) {
    console.error("Error deleting user: ", error.message)
  }
}