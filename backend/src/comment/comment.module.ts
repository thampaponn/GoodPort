import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './comment.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Comment", schema: CommentSchema }]),
      ],
})
export class CommentModule {}
