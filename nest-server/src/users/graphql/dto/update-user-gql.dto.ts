import { PartialType, OmitType } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import * as GraphQLTypes from 'src/graphql/graphql-types';

export class UpdateUserGqlDto extends GraphQLTypes.UpdateUserInput {

  @Allow()
  username?: string;
}