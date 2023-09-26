"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./user/user.module");
const post_module_1 = require("./post/post.module");
const alert_module_1 = require("./alert/alert.module");
const comment_controller_1 = require("./comment/comment.controller");
const comment_service_1 = require("./comment/comment.service");
const comment_module_1 = require("./comment/comment.module");
const post_advisor_module_1 = require("./post-advisor/post-advisor.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
            mongoose_1.MongooseModule.forRoot(process.env.DB_URI),
            user_module_1.UserModule,
            post_module_1.PostModule,
            alert_module_1.AlertModule,
            comment_module_1.CommentModule,
            post_advisor_module_1.PostAdvisorModule,
        ],
        controllers: [app_controller_1.AppController, comment_controller_1.CommentController],
        providers: [app_service_1.AppService, comment_service_1.CommentService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map