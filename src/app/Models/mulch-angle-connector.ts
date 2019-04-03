import {Polygram} from './polygram';
import {Line} from '../Interfaces/line';
import {Connector} from '../Interfaces/connector';

export class MulchAngleConnector implements Connector {
  private readonly LINE_NAME_SPLITTER = '-';

  constructor(private distances: number[]) {}

  connect(polygram: Polygram): Line[] {
    const rawLinens = polygram.vertexes.map((vt, i, vts) => {
      const distance = this.distances[i % this.distances.length];
      const start = vt;
      const end = vts[(i + distance) % vts.length];
      const name = this.getLineName(start.name, end.name);
      return {name, start, end};
    });
    return this.reduceLine(rawLinens);
  }
  reduceLine(lines: Line[]): Line[] {
    const redusedLines = new Map<string, Line>();

    lines.forEach(line => {
      redusedLines.set(line.name.split(this.LINE_NAME_SPLITTER).sort().join(this.LINE_NAME_SPLITTER), line);
    });
    return Array.from(redusedLines.values());
  }

  getLineName(startName: string, endName: string) {
    return [startName, endName].join(this.LINE_NAME_SPLITTER);
  }

}
