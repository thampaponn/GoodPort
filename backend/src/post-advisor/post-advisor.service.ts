import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostAdvisor } from './post-advisor.model';

@Injectable()
export class PostAdvisorService {
    constructor(@InjectModel("PostAdvisor") private readonly userModel: Model<PostAdvisor>) {}


}
