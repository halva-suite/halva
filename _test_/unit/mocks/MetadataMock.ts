import { resolve } from 'path';
import { readFileSync } from 'fs';

export class MetadataMock {
  private pathMeta: string;
  public asV12: any;
  constructor(path: string) {
    this.pathMeta = path;
    this.asV12 = JSON.parse(readFileSync(resolve(this.pathMeta)).toString());
  }
}
