import {
    AfterInsert,
    ManyToOne,
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Post } from 'src/posts/entities/post.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    commentData: string;

    @ManyToOne(() => Post, post => post.comments)
    post: Post;

    @ManyToOne(() => User, user => user.comments)
    user: User;

    @AfterInsert()
    logInsert() {
        console.log('Inserted Post with id', this.id);
    }
}
