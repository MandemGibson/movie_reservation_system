import { Request, Response } from "express";
import { getUserByEmail } from "../services/user.service";

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email)
    if(!user)
      return res.status(400).json({message: ""})
  } catch (error: any) {
    console.error("Error logging in: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}