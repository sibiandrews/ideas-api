import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthGuard } from '../shared/auth.guard';
import { CommentDTO } from './comment.dto';
import { CommentService } from './comment.service';

@Resolver()
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  @Query()
  async comment(@Args('id') id: string) {
    return await this.commentService.show(id);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async createComment(
    @Args('idea') ideaId: string,
    @Args('comment') comment: string,
    @Context('user') user: any,
  ) {
    const data: CommentDTO = { comment };
    const { id: userId } = user;
    return await this.commentService.create(ideaId, userId, data);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async deleteComment(@Args('id') id: string, @Context('user') user: any) {
    const { id: userId } = user;
    return await this.commentService.delete(id, userId);
  }
}
