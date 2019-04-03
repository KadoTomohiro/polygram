import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MathUtils} from '../math-utils';
import {MulchAngleConnector} from '../Models/mulch-angle-connector';
import {Polygram} from '../Models/polygram';
import {DrawerService} from '../drawer.service';
import {Size} from '../Interfaces/size';

@Component({
  selector: 'pg-polygram',
  templateUrl: './polygram.component.html',
  styleUrls: ['./polygram.component.css']
})
export class PolygramComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;
  ctx: CanvasRenderingContext2D;
  afterInit = false;


  private defaultVertex = 3;
  vertex: FormControl;
  patterns: number[];
  connectPattern: FormControl;
  maximumPattern: number;
  pattern: FormControl;
  distances: number[];

  constructor(private fb: FormBuilder, private drawer: DrawerService) {


  }

  ngOnInit() {

    this.patterns = MathUtils.getDivisors(this.defaultVertex);
    this.maximumPattern = 2 ** 1 - 1;
    this.distances = [1];

    this.vertex = this.fb.control(this.defaultVertex, [Validators.required, Validators.min(3)]);
    this.connectPattern = this.fb.control(this.patterns[0], [Validators.required]);
    this.pattern = this.fb.control(0);

    this.vertex.valueChanges
      .subscribe((value: number) => {
        this.patterns = MathUtils.getDivisors(value);
        this.connectPattern.setValue(this.patterns[0]);
      });

    this.connectPattern.valueChanges
      .subscribe((value: number) => {
        this.pattern.setValue(0);
        this.maximumPattern = (this.vertex.value - 1) ** this.connectPattern.value - 1;
      });

    this.pattern.valueChanges
      .subscribe((value: number) => {
        this.draw();
      });
  }

  ngAfterViewInit(): void {
    const canvasNe: HTMLCanvasElement = this.canvas.nativeElement;
    this.ctx = canvasNe.getContext('2d');
    this.draw();

    this.afterInit = true;
  }

  private draw() {
    const canvasSize = this.getCanvasSize(this.ctx);
    const center = this.getCanvasCenter(canvasSize);
    const radius = this.getRadius(canvasSize);

    const polygram = new Polygram(this.vertex.value, center, radius);
    this.distances = MathUtils.baseConvert(this.pattern.value, this.vertex.value - 1, this.connectPattern.value)
      .map(n => n + 1);
    const connector = new MulchAngleConnector(this.distances);

    this.drawer.draw(this.ctx, polygram, connector);
  }

  private getCanvasCenter(canvasSize: Size) {
    return {
      x: (canvasSize.width / 2),
      y: (canvasSize.height / 2)
    };
  }

  private getCanvasSize(ctx: CanvasRenderingContext2D) {
    return {
      width: ctx.canvas.width,
      height: ctx.canvas.height
    };
  }

  private getRadius(canvasSize: Size) {
    const radiusRate = 0.475;
    return canvasSize.width < canvasSize.height ? canvasSize.width * radiusRate : canvasSize.height * radiusRate;
  }
}
