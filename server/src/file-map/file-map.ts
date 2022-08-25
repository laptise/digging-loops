import { FileMap as Type } from '@entities';
import { Column, PrimaryColumn } from 'typeorm';
export class FileMap implements Type {
  @PrimaryColumn()
  id: number;
  @PrimaryColumn()
  type: number;
  @Column()
  url: string;
  @Column()
  ownerId: number;
  @Column()
  createdAt: number;
  @Column()
  updatedAt: number;
}
