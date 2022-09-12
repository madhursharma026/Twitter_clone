import { IsString } from 'class-validator';

export class CreatePostDto {
  
  @IsString()
  postData: string;

  @IsString()
  userId: string;
}
