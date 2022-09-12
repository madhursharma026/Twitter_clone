import { IsString } from 'class-validator';

export class CreateCommentDto {
  
  @IsString()
  commentData: string;

  @IsString()
  postId: string;
}
