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
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const express_validator_1 = require("express-validator");
const fieldsValidator_1 = require("../middlewares/fieldsValidator");
const User_1 = __importDefault(require("../models/User"));
const validator_jwt_1 = require("../middlewares/validator-jwt");
const router = (0, express_1.Router)();
//rutas para auth con el path de host + api/auth
router.post("/new", [
    (0, express_validator_1.check)("fullName")
        .not()
        .isEmpty()
        .isString()
        .withMessage("El nombre completo es obligatorio")
        .isLength({ min: 3, max: 100 })
        .withMessage("El nombre debe ser mayor de 3 caracteres y menor a 100")
        .matches(/^[a-zA-Z]+(\s*[a-zA-Z]*)*[a-zA-Z]+$/)
        .withMessage("El nombre tiene que ser letras no números"),
    (0, express_validator_1.check)("email")
        .isEmail()
        .withMessage("Es email es obligatorio")
        .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        const emailCheck = yield User_1.default.findOne({ email });
        if (emailCheck)
            return Promise.reject();
    }))
        .withMessage("Email ya se encuentra en uso"),
    (0, express_validator_1.check)("password", "El password debe ser mayor a 6 caracteres y máximo de 100").isLength({ min: 6, max: 100 }),
    (0, express_validator_1.check)("verifyPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("La confirmación de la contraseña no coincide con la contraseña");
        }
        return true;
    }),
    fieldsValidator_1.fieldsValidator,
], authController_1.createUser);
router.post("/", [
    (0, express_validator_1.check)("email", "Es email es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "El password debe ser mayor a 6 caracteres").isLength({ min: 6 }),
    fieldsValidator_1.fieldsValidator,
], authController_1.Login);
router.get("/renew", validator_jwt_1.validatorJWT, authController_1.renovateToken);
exports.default = router;
