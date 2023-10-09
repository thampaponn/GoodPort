"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(user) {
        const { password, username } = user, result = __rest(user, ["password", "username"]);
        const existingUser = await this.userModel.findOne({ username });
        if (existingUser) {
            throw new Error('Username already exists');
        }
        const hashPassword = await bcrypt.hashSync(password, 10);
        const createdUser = new this.userModel(Object.assign({ password: hashPassword, username }, result));
        return createdUser.save();
    }
    async getAllUsers() {
        return await this.userModel.find().exec();
    }
    async getUserById(id) {
        return await this.userModel.findById(id);
    }
    async delUserById(id) {
        return await this.userModel.deleteOne({ _id: Object(id) });
    }
    async updateUser(id, updatedData) {
        const user = await this.userModel.findByIdAndUpdate(id, updatedData, {
            new: true,
        });
        return user;
    }
    async searchUsers(query) {
        const users = await this.userModel.find({ fname: { $regex: `.*${query}.*` } }).exec();
        return users;
    }
    async findOne(username) {
        return this.userModel.findOne({ username }).exec();
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map