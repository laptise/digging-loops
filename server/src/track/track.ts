import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Track as IF } from '@entities';

@ObjectType()
@Entity()
export class Track extends BaseEntity implements IF {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;
  @Column()
  @Field(() => String)
  ownerId: string;
  @Column('varchar')
  @Field(() => String)
  title: string;
  @Column('bigint')
  @Field(() => Number)
  fileMapId: number;
  @Column({ type: 'int', default: 0 })
  @Field(() => Boolean)
  isDisabled: boolean;
  @Column({ type: 'int', default: 0 })
  @Field(() => Number)
  playedCount: number;
  @Column({ type: 'int', default: 0 })
  @Field(() => Number)
  purchasedCount: number;
  @Column('bigint')
  @Field(() => Number)
  thumbnailFileMapId: number;
  @Column({ type: 'varchar' })
  @Field(() => String, { nullable: true })
  keyChord: string;
  @Column({ type: 'int' })
  @Field(() => Number, { nullable: true })
  bars: number;
  @Column({ type: 'int' })
  @Field(() => Number, { nullable: true })
  duration: number;
  @Column({ type: 'int' })
  @Field(() => Number, { nullable: true })
  bpm: number;
}
