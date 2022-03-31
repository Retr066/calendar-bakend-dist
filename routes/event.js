"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const eventController_1 = require("../controllers/eventController");
const fieldsValidator_1 = require("../middlewares/fieldsValidator");
const validator_jwt_1 = require("../middlewares/validator-jwt");
const isDate_1 = require("../utils/isDate");
const router = (0, express_1.Router)();
router.use(validator_jwt_1.validatorJWT);
router.get("/", eventController_1.getEvents);
router.post("/", [
    (0, express_validator_1.check)("title", "El titulo es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("notes", "Las notas son obligatorias").not().isEmpty(),
    (0, express_validator_1.check)("start", "La fecha de inicio es obligatorio").not().isEmpty().custom(isDate_1.isDate),
    (0, express_validator_1.check)("end", "La fecha de final es obligatorio").not().isEmpty().custom(isDate_1.isDate),
    fieldsValidator_1.fieldsValidator,
], eventController_1.createdEvent);
router.put("/:id", [
    (0, express_validator_1.check)("title", "El titulo es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("notes", "Las notas son obligatorias").not().isEmpty(),
    (0, express_validator_1.check)("start", "La fecha de inicio es obligatorio").not().isEmpty().custom(isDate_1.isDate),
    (0, express_validator_1.check)("end", "La fecha de final es obligatorio").not().isEmpty().custom(isDate_1.isDate),
    fieldsValidator_1.fieldsValidator,
], eventController_1.updatedEvent);
router.delete("/:id", eventController_1.deletedEvent);
exports.default = router;
