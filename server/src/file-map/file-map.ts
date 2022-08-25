import { FileMap as Type } from '@entities';
import { PrimaryColumn } from 'typeorm';
export class FileMap implements Type {
  id: number;
  fileType: number;
  ownerId: number;
  createdAt: number;
  updatedAt: number;
}
