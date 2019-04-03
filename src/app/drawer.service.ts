import { Injectable } from '@angular/core';
import {Line} from './Interfaces/line';
import {Size} from './Interfaces/size';
import {Point} from './Interfaces/point';
import {Polygram} from './Interfaces/polygram';
import {Connector} from './Interfaces/connector';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  constructor() {}

  draw(ctx: CanvasRenderingContext2D, polygram: Polygram, connector: Connector) {

    const lines = connector.connect(polygram);


    this.drawLines(ctx, lines);
  }

  private drawLines(ctx: CanvasRenderingContext2D, lines: Line[]) {


    const canvasSize: Size = this.getCanvasSize(ctx);
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

    ctx.strokeStyle = '#000';

    lines.forEach(line => {
      const reversed = {
        start: this.reverse(line.start, canvasSize),
        end: this.reverse(line.end, canvasSize),
      };
      ctx.beginPath();
      ctx.moveTo(reversed.start.x, reversed.start.y);
      ctx.lineTo(reversed.end.x, reversed.end.y);
      ctx.stroke();
    });
  }

  private reverse(point: Point, canvasSize: Size): Point {
    return {
      name: point.name,
      x: canvasSize.width - point.x,
      y: canvasSize.height - point.y
    };
  }

  private getCanvasSize(ctx: CanvasRenderingContext2D): Size {
    const {width, height} = ctx.canvas;
    return {width, height};
  }
}
