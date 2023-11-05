import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Answer } from 'src/answer/entities/answer.entity'
import { Question } from 'src/questions/entities/question.entity'
import { User } from 'src/users/entities/user.entity'
import { Comment } from 'src/comments/entities/comment.entity'
import { Category } from 'src/category/entities/category.entity'
import { Tag } from 'src/tags/entities/tag.entity'

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [
                User,
                Question,
                Answer,
                Comment,
                Category,
                Tag
            ],
            synchronize: true,
        })
    ]
})
export class DatabaseModule {}