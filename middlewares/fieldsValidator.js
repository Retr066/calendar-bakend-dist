"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldsValidator = void 0;
const express_validator_1 = require("express-validator");
const fieldsValidator = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: true,
            errors: errors.mapped(),
        });
    }
    next();
};
exports.fieldsValidator = fieldsValidator;
