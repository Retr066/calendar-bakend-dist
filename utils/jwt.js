"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const generarJWT = (uid, fullName) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, fullName };
        jsonwebtoken_1.default.sign(payload, config_1.default.SECRET_JWT_SEED, {
            expiresIn: "2h",
        }, (err, token) => {
            if (err) {
                console.error(err);
                reject("No se pudo generar el token");
            }
            resolve(token);
        });
    });
};
exports.generarJWT = generarJWT;
