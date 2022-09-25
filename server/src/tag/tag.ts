import { Tag as Type } from '@entities';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Tag implements Type {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Number)
  id: number;

  @Column({ type: 'varchar' })
  @Field(() => String)
  name: string;
}
