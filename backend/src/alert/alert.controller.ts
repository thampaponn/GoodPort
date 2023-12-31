import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { Alert } from "./alert.model";
import { AlertService } from "./alert.service";

@Controller("alert")
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post()
  async createAlert(@Body() alertData: Alert): Promise<Alert> {
    return this.alertService.createAlert(alertData);
  }

  @Get(":id")
  async getAlertById(@Param("id") id: string): Promise<Alert | null> {
    return this.alertService.getAlertById(id);
  }

  @Get("byPostId/:postId")
  async getAlertByPostId(@Param("postId") postId: string): Promise<Alert[]> {
    return this.alertService.getAlertByPostId(postId);
  }

  @Get("byadvisorId/:advisorId")
  async getAlertByadvisorId(@Param("advisorId") advisorId: string): Promise<Alert[]> {
    return this.alertService.getAlertByUserId(advisorId);
  }


  @Post('updateDetailToAccepted/:advisorId/:postId')
  async updateAlertDetailToAccepted(
    @Param('advisorId') advisorId: string,
    @Param('postId') postId: string,
  ) {
    try {
      const updatedAlert = await this.alertService.updateAlertDetailToAccepted(
        advisorId,
        postId,
      );
      return { message: 'Alert ได้รับการอัปเดตเป็น "accepted" แล้ว', updatedAlert };
    } catch (error) {
      return { message: 'ไม่สามารถอัปเดตรายละเอียด Alert ได้', error };
    }
  }

  @Get("byUserIdConfirm/:userId")
  async getAlertByUserIdComfirm(@Param("userId") userId: string): Promise<Alert[]> {
    return this.alertService.getAlertByUserIdComfirm(userId);
  }

  @Delete(":id")
  async deleteAlertById(@Param("id") id: string): Promise<{ message: string }> {
    const result = await this.alertService.delAlertById(id);
    if (result.deletedCount === 1) {
      return { message: "Alert deleted successfully" };
    }
    throw new NotFoundException("Alert not found");
  }

  @Put(":id")
  async updateAlert(
    @Param("id") id: string,
    @Body() updatedData: Partial<Alert>
  ): Promise<Alert | null> {
    return this.alertService.updateAlert(id, updatedData);
  }

  @Get()
  async getAll(){
    return this.alertService.getAll();
  }
}
