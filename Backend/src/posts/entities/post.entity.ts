import {
    AfterInsert,
    ManyToOne,
    Entity,
    Column,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    postData: string;

    @ManyToOne(() => User, (user) => user.posts)
    user: User


    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];

    @AfterInsert()
    logInsert() {
        console.log('Inserted Post with id', this.id);
    }
}
