import { Sample as IF } from '@entities';
import { Field } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Sample implements IF {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;
  @Column(() => String)
  @Field(() => String)
  name: string;
  @Column(() => String)
  @Field(() => String)
  url: string;
  @Column({ type: 'int', default: 0 })
  @Field(() => Boolean)
  isDisabled: boolean;
  @Column({ type: 'int', default: 0 })
  @Field(() => Boolean)
  playedCount: number;
  @Column({ type: 'int', default: 0 })
  @Field(() => Boolean)
  purchasedCount: number;
}
