import {Point} from './point';
import {Name} from './name';

export interface Line extends Name {
  start: Point;
  end: Point;
}

// export interface NamedLine extends Line, Name {}
