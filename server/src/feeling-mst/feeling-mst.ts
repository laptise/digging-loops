import { FeelingMst as IF } from '@entities';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class FeelingMst implements IF {
  @PrimaryGeneratedColumn()
  @Field(() => String)
  id: number;
  @Column('varchar')
  @Column(() => String)
  name: string;
}
