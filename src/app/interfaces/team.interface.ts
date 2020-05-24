import { Player, Countries } from './player.interface';

export interface Team {
  $key?: string;
  name: string;
  country: Countries;
  players: Player[];
}
