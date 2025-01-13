import { User } from "@prisma/client";
import { addUser, getUserByEmail } from "./user.service";

export const login = async (email: string) => {
    try {
        const user = await getUserByEmail(email);
        return user;
    } catch (error: any) {
        console.error("Error in auth.service, loginUser: ", error.message);
    }
};

export const signUp = async (payload: User) => {
    try {
        return await addUser(payload);
    } catch (error: any) {
        console.error("Error in auth.service, signUp: ", error.message);
    }
}