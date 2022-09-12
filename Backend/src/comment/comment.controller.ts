import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post('add_comment/userId=:userId/postId=:postId')
  async createPost(@Body() body: CreateCommentDto, @Param('userId') userId: string, @Param('postId') postId: string) {
    const Post = this.commentService.create(body, userId, +postId);
    return Post;
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get('/post_detail/:id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
