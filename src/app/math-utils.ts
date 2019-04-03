import {Point} from './Interfaces/point';
import {Line} from './Interfaces/line';

export class MathUtils {
  static fullAngle = Math.PI * 2;

  static rotation(originalPoint: Point, angle: number, center: Point = {x: 0, y: 0}): Point {

    const radiusX = originalPoint.x - center.x;
    const radiusY = originalPoint.y - center.y;

    return {
      x: radiusX * Math.cos(angle) - radiusY * Math.sin(angle) + center.x,
      y: radiusX * Math.sin(angle) - radiusY * Math.cos(angle) + center.y,
    };
  }

  static translationalMotion(originalPoint: Point, movement: Point): Point {
    return {
      x: originalPoint.x + movement.x,
      y: originalPoint.y + movement.y
    };
  }

  static getMidPoint(line: Line): Point {
    return {
      x: (line.start.x + line.end.x) / 2,
      y: (line.start.y + line.end.y) / 2,
    };
  }

  static getLength(line: Line): number {
    const {start, end} = line;
    return ((start.x - end.x) ** 2 + (start.y - end.y) ** 2) ** 0.5;
  }

  static getNextIndex(currentIndex: number, arrayLength: number, distance = 1) {
    return (currentIndex + distance) % arrayLength;
  }

  static getDivisors(num: number): number[] {
    const divisors = new Set<number>();
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        divisors.add(i);
      }
    }
    return Array.from(divisors).sort((a, b) => a - b);
  }

  static range(from, to, step = 1): number[] {
    const list = [];
    while (from < to) {
      list.push(from);
      from += step;
    }
    return list;
  }

  static baseConvert(num: number, base: number, length?: number): number[] {
    let quotient = num;
    let converted: number[] = [];
    while (quotient > 0) {
      console.log(quotient);
      converted.unshift(quotient % base);
      quotient = Math.floor(quotient / base);
    }

    if (length && converted.length < length) {
      const filler: number[] = Array<number>(length -　converted.length);
      filler.fill(0);
      converted = filler.concat(converted);
    }

    return converted;
  }
}
