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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateResetToken = exports.findResetToken = exports.createResetToken = void 0;
const prisma_service_1 = require("./prisma.service");
const crypto_1 = __importDefault(require("crypto"));
const createResetToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = crypto_1.default.randomBytes(16).toString("hex");
        return yield prisma_service_1.prisma.resetToken.create({
            data: {
                token,
                userId,
                expiresIn: new Date(Date.now() + 5 * 60 * 1000),
            },
        });
    }
    catch (error) {
        console.error("Error creating reset token: ", error.message);
    }
});
exports.createResetToken = createResetToken;
const findResetToken = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_service_1.prisma.resetToken.findFirst({
            where: Object.assign(Object.assign({}, filter), { valid: true, expiresIn: { gt: new Date() } }),
        });
    }
    catch (error) {
        console.error("Error finding reset token: ", error.message);
    }
});
exports.findResetToken = findResetToken;
const invalidateResetToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_service_1.prisma.resetToken.update({
            where: {
                id,
            },
            data: {
                valid: false,
            },
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.invalidateResetToken = invalidateResetToken;
