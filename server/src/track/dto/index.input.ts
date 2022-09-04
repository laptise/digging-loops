import { IsNotEmpty } from 'class-validator';
import { AddNewTrackPayload as PayloadIF } from '@dtos';

export class NewTrackInput implements PayloadIF {
  @IsNotEmpty()
  trackName: string;
  @IsNotEmpty()
  thumbnailName: string;
  @IsNotEmpty()
  keyChord: string;
  @IsNotEmpty()
  title: string;
}
