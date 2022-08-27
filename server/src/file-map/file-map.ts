import { FileMap as Type } from '@entities';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';
@ObjectType()
@Entity()
export class FileMap implements Type {
  @PrimaryColumn()
  @Field(() => Number)
  id: number;
  @PrimaryColumn()
  @Field(() => Number)
  type: number;
  @Column()
  @Field(() => String, { nullable: true })
  url: string;
  @Column()
  @Field(() => String)
  name: string;
  @Column()
  @Field(() => String)
  ownerId: string;
  @Column()
  @Field(() => Date)
  createdAt: Date;
  @Column()
  @Field(() => Date)
  updatedAt: Date;
}
