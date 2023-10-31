import { Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswerModule } from './answer/answer.module';
import { CommentsModule } from './comments/comments.module';
import { DatabaseModule } from './database/database.module';

@Module({
  providers: [
    {
      provide: 'APP_PIPE',
      useClass: ValidationPipe
    }
  ],
  imports: [
    DatabaseModule,
    UsersModule, 
    AuthModule, 
    QuestionsModule, 
    AnswerModule, 
    CommentsModule
  ],
})
export class AppModule {}
