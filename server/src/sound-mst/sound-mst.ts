import { SoundMst as IF } from '@entities';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class SoundMst implements IF {
  @PrimaryGeneratedColumn()
  @Field(() => String)
  id: number;
  @Column('varchar')
  @Column(() => String)
  name: string;
}
