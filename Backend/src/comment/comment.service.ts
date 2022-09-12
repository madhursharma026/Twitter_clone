import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {

  constructor(@InjectRepository(Comment) private repo: Repository<Comment>) { }

  create(CommentDto: CreateCommentDto, userId, postId) {
    const postDetails = this.repo.create(CommentDto);
    postDetails.user = userId;
    postDetails.post = postId;
    return this.repo.save(postDetails);
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.find({
      where: { post: id },
      relations: ['user', 'post']
    });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
