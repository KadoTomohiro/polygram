import { MathUtils } from '../math-utils';
import {NamedPoint, Point} from '../Interfaces/point';
import {Line} from '../Interfaces/line';
import { Polygram as IPolygram} from '../Interfaces/polygram';


export class Polygram implements IPolygram {
  vertexes: NamedPoint[];
  public center: NamedPoint;

  constructor(public vertexNumber: number, center: Point, public radius: number) {
    const {x, y} = center;
    this.center = {x, y, name: 'center'};

    this.vertexes = this.getVertexes();
  }

  pi() {
    const circumference = this.vertexes.map((p, i, a) => {
      return {start: p, end: a[MathUtils.getNextIndex(i, a.length)]};
    }).reduce((p: number, c: Line) => {
      return p + MathUtils.getLength(c);
    }, 0);
    return circumference / (this.radius * 2);
  }

  private getVertexes() {

    const vertexes: NamedPoint[] = [];
    const originPoint = this.getVertexOrigin();

    for (let i = 0; i < this.vertexNumber; i++) {
      const {x, y} = MathUtils.rotation(originPoint, this.getAngle(i), this.center);
      const vertex = {name: `${i}`, x, y};
      vertexes.push(vertex);
    }
    return vertexes;
  }

  private getAngle(i: number) {
    return MathUtils.fullAngle / this.vertexNumber * i;
  }

  private getVertexOrigin(): Point {
    return MathUtils.translationalMotion(this.center, {x: 0, y: -this.radius});
  }


}
