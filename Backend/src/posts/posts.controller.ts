import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post('add_posts/userId=:id')
  async createPost(@Body() body: CreatePostDto, @Param('id') id: string) {
    const Post = this.postsService.create(body, +id);
    return Post;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  // @Post("/my_posts")
  // async findAllPostOfSingleUser(@Body() body: CreatePostDto) {
  //   const MyPosts = await this.postsService.findAllPostOfSingleUser(body.userId);
  //   return MyPosts;
  // }

  @Get("/user_profile/:id")
  findAllPostOfSingleUser(@Param('id') id: string) {
    return this.postsService.findAllPostOfSingleUser(+id);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }
}


