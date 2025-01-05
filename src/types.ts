import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class IStatusResponse {
  @Field()
  success!: boolean;

  @Field()
  msg!: string;

  @Field()
  data!: string;
}
