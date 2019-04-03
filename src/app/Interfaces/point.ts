import {Name} from './name';

export interface Point extends Name {
  x: number;
  y: number;
}

export interface NamedPoint extends Point, Name {}
