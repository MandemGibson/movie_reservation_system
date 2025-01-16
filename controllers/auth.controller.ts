import { Request, Response } from "express";
import { getUserByEmail } from "../services/user.service";
import { login, signUp } from "../services/auth.service";
import { hashPassword, validatePassword } from "../utils/password";

export const loginHandler = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const user = await login(email);
    if (!user) return res.status(401).json({ message: "Invalid email" });

    const isPasswordCorrect = await validatePassword(password, user.password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid password" });

    // await generateToken(user.id, res, false);

    res.status(200).json({ message: "Login successful", data: user });
  } catch (error: any) {
    console.error("Error logging in: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const signupHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password)
      return res
        .status(400)
        .json({ message: "All fields are required" });

    const existingUser = await getUserByEmail(email)

    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await hashPassword(password);
    const user = await signUp({ ...req.body, password: hashedPassword });

    res.status(201).json({ message: "Sign up successful", data: user });
  } catch (error: any) {
    console.error("Error logging in: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const logoutHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successful" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};