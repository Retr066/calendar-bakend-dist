"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const event_1 = __importDefault(require("./routes/event"));
const config_1 = __importDefault(require("./config"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const config_2 = require("./database/config");
const app = (0, express_1.default)();
(0, config_2.dbConnection)();
app.use(express_1.default.static("public"));
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api/auth", auth_1.default);
app.use("/api/events", event_1.default);
app.listen(config_1.default.PORT, () => {
    console.log(`Express corriendo en el puerto ${config_1.default.PORT}`);
});
