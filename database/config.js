"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uri = `mongodb+srv://${config_1.default.DB_USER}:${config_1.default.DB_PASSWORD}@cluster0.xolvq.mongodb.net/dbCalendar?retryWrites=true&w=majority`;
        yield mongoose_1.default.connect(uri);
        console.log("DB Conectado satisfactoriamente");
    }
    catch (error) {
        console.error(error);
        throw new Error("Error al inicializar la base de datos");
    }
});
exports.dbConnection = dbConnection;
