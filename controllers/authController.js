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
exports.renovateToken = exports.Login = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../utils/jwt");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        const user = new User_1.default(req.body);
        const salt = bcryptjs_1.default.genSaltSync();
        user.password = bcryptjs_1.default.hashSync(password, salt);
        yield user.save();
        const token = yield (0, jwt_1.generarJWT)(user.id, user.fullName);
        res.status(201).json({
            ok: true,
            msg: "Usuario creado correctamente",
            uid: user.id,
            fullName: user.fullName,
            token,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Algo salio mal",
        });
    }
});
exports.createUser = createUser;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        console.log(user === null || user === void 0 ? void 0 : user.id);
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe con ese email",
            });
        }
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Password Incorrecto",
            });
        }
        const token = yield (0, jwt_1.generarJWT)(user.id, user.fullName);
        res.status(200).json({
            ok: true,
            msg: "Logueado Satisfactoriamente",
            uid: user.id,
            fullName: user.fullName,
            token,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Algo salio mal",
        });
    }
});
exports.Login = Login;
const renovateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.body.uid;
    const fullName = req.body.fullName;
    const token = yield (0, jwt_1.generarJWT)(uid, fullName);
    res.json({
        ok: true,
        msg: "token renovado",
        token,
    });
});
exports.renovateToken = renovateToken;
