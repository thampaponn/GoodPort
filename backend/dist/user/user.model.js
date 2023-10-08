"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const mongoose = require("mongoose");
var UserRole;
(function (UserRole) {
    UserRole["Advisor"] = "advisor";
    UserRole["Student"] = "student";
    UserRole["Visitor"] = "visitor";
})(UserRole || (UserRole = {}));
var UserSex;
(function (UserSex) {
    UserSex["Male"] = "male";
    UserSex["Female"] = "female";
    UserSex["Other"] = "other";
})(UserSex || (UserSex = {}));
exports.UserSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    sex: { type: String, enum: Object.values(UserSex), required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
    preflex: { type: String },
    email: { type: String },
    job: {
        professorId: { type: String },
        studentId: { type: String },
        title: { type: String },
    },
    image: {
        studentCard: { type: String },
        profileImage: { type: String },
    },
    information: {
        location: { type: String },
        companyNumber: { type: String },
        graduatedFrom: { type: String },
        university: { type: String },
    },
    createdAt: { type: Date, default: Date.now },
});
class User extends mongoose.Document {
}
exports.User = User;
//# sourceMappingURL=user.model.js.map