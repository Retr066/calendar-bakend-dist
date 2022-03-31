"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EventShema = new mongoose_1.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    notes: {
        type: String,
        trim: true,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    bgcolor: {
        type: String,
        trim: true,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    versionKey: false,
});
exports.default = (0, mongoose_1.model)("Event", EventShema);
