import Mocha from 'mocha';
import { HalvaTestConfig } from './Config/HalvaTestConfig';

/**
 * export class TestRunner
 * 
 */
export class TestRunner{
    

    public Run() {
    }
    
}


export const CreateMocha = (config: HalvaTestConfig): Mocha => {
    const mochaConfig = config.mocha || {};
 // Propagate --bail option to mocha
    mochaConfig.bail = config.bail;

    // If the command line overrides color usage, use that.
    if (config.colors != null) { mochaConfig.useColors = config.colors; }
    // Default to true if configuration isn't set anywhere.
    if (mochaConfig.useColors == null) {
     mochaConfig.useColors = true;
    }

    const mocha = new Mocha(mochaConfig);

    return mocha;
}