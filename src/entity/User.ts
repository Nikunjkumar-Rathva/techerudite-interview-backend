import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@InputType()
export class ICreateUser {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  isCustomer: boolean;

  @Field()
  isAdmin: boolean;
}

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ default: false })
  isCustomer: boolean;

  @Field()
  @Column({ default: false })
  isAdmin: boolean;

  @Field()
  @Column({ default: false })
  isConfirmed: boolean;
}
