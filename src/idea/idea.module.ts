import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IdeaEntity } from './idea.entity';
import { IdeaService } from './idea.service';
import { IdeaController } from './idea.controller';
import { UserEntity } from '../user/user.entity';
import { IdeaResolver } from './idea.resolver';
import { CommentEntity } from '../comment/comment.entity';
import { CommentService } from '../comment/comment.service';
import { AppGateway } from '../app.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaEntity, UserEntity, CommentEntity])],
  controllers: [IdeaController],
  providers: [IdeaService, IdeaResolver, CommentService, AppGateway],
})
export class IdeaModule {}
