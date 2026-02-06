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
exports.signUp = exports.login = void 0;
const user_service_1 = require("./user.service");
const login = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.getUserByEmail)(email);
        return user;
    }
    catch (error) {
        console.error("Error in auth.service, loginUser: ", error.message);
    }
});
exports.login = login;
const signUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, user_service_1.addUser)(payload);
    }
    catch (error) {
        console.error("Error in auth.service, signUp: ", error.message);
    }
});
exports.signUp = signUp;
