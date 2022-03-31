"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const validatorJWT = (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la peticion",
        });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.default.SECRET_JWT_SEED);
        req.body.uid = payload.uid;
        req.body.fullName = payload.fullName;
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({
            ok: false,
            msg: "Token no valido",
        });
    }
    next();
};
exports.validatorJWT = validatorJWT;
