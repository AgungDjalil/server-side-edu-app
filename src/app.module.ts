import { Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswerModule } from './answer/answer.module';
import { CommentsModule } from './comments/comments.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { VerifierModule } from './verifier/verifier.module';

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
    CommentsModule, 
    CategoryModule, VerifierModule
  ],
})
export class AppModule {}
