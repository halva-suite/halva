import { MochaOptions } from "mocha";

export class HalvaTestConfig {
    public testingFiles: string[];
    public mocha: MochaOptions;
    public bail: boolean;
    public network: {test: {ws: string, mnemonic: string}};
    public colors?: any;
}