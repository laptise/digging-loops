import { IsNotEmpty } from 'class-validator';

export class NewTrackInput {
  @IsNotEmpty()
  trackName: string;
}
