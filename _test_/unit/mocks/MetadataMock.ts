import { resolve } from "path";
import { readFileSync } from "fs";

export class MetadataMock {

  private pathMeta: string;
  public asV11: any;
  constructor(path: string) {
    this.pathMeta = path;
    this.asV11 = JSON.parse(readFileSync(resolve(this.pathMeta)).toString());
  }

}
