import { Module } from "@nestjs/common";
import { AlertService } from "./alert.service";
import { AlertController } from "./alert.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { AlertSchema } from "./alert.model";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Alert", schema: AlertSchema }]),
  ],
  providers: [AlertService],
  controllers: [AlertController],
})
export class AlertModule {}
