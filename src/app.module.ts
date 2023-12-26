import { Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswerModule } from './answer/answer.module';
import { CommentsModule } from './comments/comments.module';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { VerifierModule } from './verifier/verifier.module';
import { TagsModule } from './tags/tags.module';
import { ReportsModule } from './reports/reports.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guard/auth.guard';
import { RolesGuard } from './guards/role.guard';
import { PaginationPipe } from './pipes/pagination.pipe';

@Module({
  providers: [
    {
      provide: 'APP_PIPE',
      useClass: ValidationPipe
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    DatabaseModule,
    UsersModule, 
    AuthModule, 
    QuestionsModule, 
    AnswerModule, 
    CommentsModule, 
    CategoryModule, 
    VerifierModule, 
    TagsModule, 
    ReportsModule
  ],
})
export class AppModule {}
