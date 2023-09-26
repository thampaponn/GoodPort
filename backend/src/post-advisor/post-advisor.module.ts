import { Module } from "@nestjs/common";
import { PostAdvisorService } from "./post-advisor.service";
import { PostAdvisorController } from "./post-advisor.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { PostAdvisorSchema } from "./post-advisor.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "PostAdvisor", schema: PostAdvisorSchema },
    ]),
  ],
  providers: [PostAdvisorService],
  controllers: [PostAdvisorController],
})
export class PostAdvisorModule {}
