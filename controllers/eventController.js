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
exports.deletedEvent = exports.updatedEvent = exports.createdEvent = exports.getEvents = void 0;
const Events_1 = __importDefault(require("../models/Events"));
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allEvents = yield Events_1.default.find().populate("user", "fullName");
    return res.status(200).json({
        ok: true,
        msg: "Se obtuvieron todos los eventos",
        allEvents,
    });
});
exports.getEvents = getEvents;
const createdEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = new Events_1.default(req.body);
    try {
        event.user = req.body.uid;
        const eventSave = yield event.save();
        console.log(eventSave.id);
        return res.status(201).json({
            ok: true,
            msg: "Evento creado satisfactoriamente",
            event: eventSave,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Algo salio mal al crear un evento",
        });
    }
});
exports.createdEvent = createdEvent;
const updatedEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.id;
    const uid = req.body.uid;
    try {
        const event = yield Events_1.default.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no disponible",
            });
        }
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tienes los permisos correspondiente",
            });
        }
        const newEvento = Object.assign(Object.assign({}, req.body), { user: uid });
        const eventUpdated = yield Events_1.default.findByIdAndUpdate(eventId, newEvento, { new: true });
        return res.status(200).json({
            ok: true,
            msg: "Se actualizo correctamente",
            event: eventUpdated,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error a actualizar el evento",
        });
    }
});
exports.updatedEvent = updatedEvent;
const deletedEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.id;
    const uid = req.body.uid;
    try {
        const event = yield Events_1.default.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no disponible",
            });
        }
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tienes los permisos correspondiente",
            });
        }
        yield Events_1.default.findByIdAndDelete(eventId);
        return res.status(200).json({
            ok: true,
            msg: "Se elimino el evento satisfactoriamente",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error al eliminar el evento",
        });
    }
});
exports.deletedEvent = deletedEvent;
