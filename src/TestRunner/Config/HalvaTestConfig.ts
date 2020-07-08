import {readdirSync} from 'fs';
import { MochaOptions } from "mocha";
import {join} from 'path';
import { getConfigureModule } from '../../Configure/FindConfigFile';
export class HalvaTestConfig {
    public testingFiles: string[];
    public mocha: MochaOptions;
    public bail: boolean;
    public network: {test: {ws: string, mnemonic: string}};
    public colors?: boolean;
    constructor(filesPath: string, mocha?: MochaOptions, network?: string, bail = false, colors = false) {
        this.testingFiles = readdirSync(filesPath).map(file => join(filesPath, file));
        this.mocha = mocha || {};
        this.bail = bail;
        this.network = require(network == null ?  getConfigureModule('halva.js') : network).networks;
        this.colors = colors;
    }
}