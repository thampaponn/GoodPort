import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Alert } from "./alert.model";

@Injectable()
export class AlertService {
  constructor(
    @InjectModel("Alert")
    private readonly alertModel: Model<Alert>
  ) {}
  async createAlert(Alert: Alert): Promise<Alert> {
    const createAleart = new this.alertModel(Alert);
    return createAleart.save();
  }

  async getAlertById(id: string) {
    return await this.alertModel.findById(id);
  }

  async getAlertByPostId(postId: string): Promise<Alert[]> {
    return this.alertModel.find({ postId }).exec();
  }

  async getAlertByUserId(userId: string): Promise<Alert[]> {
    return this.alertModel.find({ "owner.userId": userId }).exec();
  }

  async delAlertById(id: string) {
    return await this.alertModel.deleteOne({ _id: Object(id) });
  }

  async updateAlert(
    id: string,
    updatedData: Partial<Alert>
  ): Promise<Alert | null> {
    const user = await this.alertModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return user;
  }

  async getAll(){
    return await this.alertModel.find().exec();
  }
}
