import { HalvaTestConfig } from "./Config/HalvaTestConfig"
import { HalvaRunTests } from "./Test"
import { resolve } from 'path';

export const execFile = async (filePath: string, config: HalvaTestConfig) => {
  await HalvaRunTests(config, true);
  try {
   require(resolve(filePath));
  }
  catch (error) {
    console.error('When executing a custom file, an exception was thrown \n ' + error);
  }
}
