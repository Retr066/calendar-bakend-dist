"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    PORT: process.env.PORT || 5000,
    DB_USER: process.env.DB_USER || "retr0",
    DB_PASSWORD: process.env.DB_PASSWORD || "test",
    SECRET_JWT_SEED: process.env.SECRET_JWT_SEED || "Retr0_es_el_puto_amo@_6661456",
};
