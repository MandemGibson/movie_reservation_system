"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordHandler = exports.verifyOtpHandler = exports.forgotPasswordHandler = exports.logoutHandler = exports.signupHandler = exports.loginHandler = void 0;
const user_service_1 = require("../services/user.service");
const auth_service_1 = require("../services/auth.service");
const password_1 = require("../utils/password");
const token_1 = require("../utils/token");
const otp_service_1 = require("../services/otp.service");
const resetToken_service_1 = require("../services/resetToken.service");
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password)
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        const user = yield (0, auth_service_1.login)(email);
        if (!user)
            return res.status(401).json({ message: "Invalid email" });
        const isPasswordCorrect = yield (0, password_1.validatePassword)(password, user.password);
        if (!isPasswordCorrect)
            return res.status(401).json({ message: "Invalid password" });
        yield (0, token_1.generateToken)(user.id, res, false);
        res.status(200).json({ message: "Login successful", data: user });
    }
    catch (error) {
        console.error("Error logging in: ", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.loginHandler = loginHandler;
const signupHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password)
            return res
                .status(400)
                .json({ message: "All fields are required" });
        const existingUser = yield (0, user_service_1.getUserByEmail)(email);
        if (existingUser)
            return res.status(400).json({ message: "Email already exists" });
        const hashedPassword = yield (0, password_1.hashPassword)(password);
        const user = yield (0, auth_service_1.signUp)(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
        res.status(201).json({ message: "Sign up successful", data: user });
    }
    catch (error) {
        console.error("Error logging in: ", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.signupHandler = signupHandler;
const logoutHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.logoutHandler = logoutHandler;
const forgotPasswordHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({ message: "Provide email" });
        const user = yield (0, user_service_1.getUserByEmail)(email);
        if (!user)
            return res
                .status(404)
                .json({ message: "No user associated with provided email" });
        const otp = yield (0, otp_service_1.createOtp)(user.id);
        res.status(200).json({ message: `OTP sent to ${email}` });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.forgotPasswordHandler = forgotPasswordHandler;
const verifyOtpHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp } = req.body;
        if (!otp)
            return res.status(400).json({ message: "Provide OTP" });
        const foundOtp = yield (0, otp_service_1.findOtp)(otp);
        if (!foundOtp)
            return res.status(404).json({ message: "Invalid OTP" });
        let resetToken = yield (0, resetToken_service_1.findResetToken)({ userId: foundOtp.userId });
        if (!resetToken)
            resetToken = yield (0, resetToken_service_1.createResetToken)(foundOtp.userId);
        yield (0, otp_service_1.invalidateOtp)(foundOtp.id);
        res
            .status(200)
            .json({ message: "OTP verified successfully", data: resetToken === null || resetToken === void 0 ? void 0 : resetToken.token });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.verifyOtpHandler = verifyOtpHandler;
const resetPasswordHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, newPassword, confirmPassword } = req.body;
        if (!token || !newPassword || !confirmPassword)
            return res.status(400).json({ message: "All fields are required" });
        const resetToken = yield (0, resetToken_service_1.findResetToken)({ token });
        if (!resetToken)
            return res.status(404).json({ message: "Invalid reset token" });
        if (confirmPassword !== newPassword)
            return res.status(400).json({ message: "Passwords do not match" });
        const hashedPassword = yield (0, password_1.hashPassword)(newPassword);
        const user = yield (0, user_service_1.updatePassword)(resetToken.userId, hashedPassword);
        yield (0, resetToken_service_1.invalidateResetToken)(resetToken.id);
        if (!user)
            return res.status(404).json({ message: "Record to update not found" });
        res.status(200).json({ message: "Password reset successful" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.resetPasswordHandler = resetPasswordHandler;
