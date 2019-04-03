import {Polygram} from './polygram';
import {Line} from './line';

export interface Connector {
  connect: (polygram: Polygram) => Line[];
}
