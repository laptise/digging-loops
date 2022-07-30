import { User as Type } from '@entities';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User extends BaseEntity implements Type {
  @Field(() => String)
  @PrimaryColumn('varchar')
  email: string;
  @Field(() => String)
  @Column('varchar')
  name: string;
  @Field(() => String)
  @Column('varchar')
  password: string;
  @Field(() => String)
  @Column('varchar')
  displayName: string;
  @Field(() => Boolean)
  @Column({ type: 'int', default: 0 })
  isAdmin: number;
}
