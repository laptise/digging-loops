import { Dictionary as IF } from '@entities';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Dictionary implements IF {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => Number)
  id: number;
  @Column('varchar')
  @Field(() => String)
  kor: string;
  @Column('varchar')
  @Field(() => String)
  eng: string;
  @Column('varchar')
  @Field(() => String)
  jpn: string;
}
