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
exports.deleteUser = exports.updatePassword = exports.updateUser = exports.getUserById = exports.getUserByEmail = exports.getAllUsers = exports.addUser = void 0;
const prisma_service_1 = require("./prisma.service");
const addUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_service_1.prisma.user.create({
            data: payload,
        });
    }
    catch (error) {
        console.error("Error adding a user: ", error.message);
    }
});
exports.addUser = addUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_service_1.prisma.user.findMany();
    }
    catch (error) {
        console.error("Error getting all users: ", error.message);
    }
});
exports.getAllUsers = getAllUsers;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_service_1.prisma.user.findUnique({
            where: {
                email
            }
        });
    }
    catch (error) {
        console.error("Error getting user by email: ", error.message);
    }
});
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_service_1.prisma.user.findUnique({
            where: {
                id
            }
        });
    }
    catch (error) {
        console.error("Error getting user by id: ", error.message);
    }
});
exports.getUserById = getUserById;
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_service_1.prisma.user.update({
            where: {
                id
            },
            data: payload
        });
    }
    catch (error) {
        console.error("Error updating user: ", error.message);
    }
});
exports.updateUser = updateUser;
const updatePassword = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_service_1.prisma.user.update({
            where: { id },
            data: { password },
        });
    }
    catch (error) {
        console.error("Error updating user's password: ", error);
    }
});
exports.updatePassword = updatePassword;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_service_1.prisma.user.delete({
            where: {
                id
            }
        });
    }
    catch (error) {
        console.error("Error deleting user: ", error.message);
    }
});
exports.deleteUser = deleteUser;
