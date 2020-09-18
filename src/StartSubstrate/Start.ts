import { spawn } from 'child_process';
import { resolve, join } from 'path';
import { createWriteStream, readFileSync } from 'fs';
import {
  HalvaSpecModifier,
  SessionMiddleware
} from '@halva-suite/halva-spec-builder';
import { HalvaTestConfig } from '../TestRunner';

export const StartMain = async (
  pathSubstrate: string,
  config: HalvaTestConfig
) => {
  await GenerateSpec(resolve(pathSubstrate)).catch(err => {
    console.log(err);
  });
  const spec = await HalvaSpecModifier.init(
    join(process.cwd(), 'customSpec.json'),
    1000000000000000000000,
    10
  )
    .setMnemonic(config.mnemonic)
    .apply(SessionMiddleware)
    .run();
  spec.output(join(process.cwd(), 'customSpec.json'));
  FixSpec(join(process.cwd(), 'customSpec.json'));
  console.log('Start node');
  await StartNode(
    resolve(pathSubstrate),
    join(process.cwd(), 'customSpec.json')
  );
  console.log('Launched;');
};

export const StartNode = (pathSubstrate: string, pathSpec: string) => {
  return new Promise(function(reject) {
    let args = ['--chain=' + pathSpec, '--tmp', '--ws-port=9944'];
    let proc = spawn(pathSubstrate, args);
    proc.stdout.on('data', function(chunk) {
      let message = chunk.toString();
      console.log(message);
    });
    proc.stderr.on('data', function(chunk) {
      let message = chunk.toString();
      console.error(message);
    });
    proc.on('error', err => {
      console.log('Start node error ' + err);
      reject(err);
    });
    proc.on('close', () => {
      resolve();
    });
  });
};

export const FixSpec = (specPath: string) => {
  let spec = readFileSync(resolve(specPath)).toString();
  let specWrite = createWriteStream(specPath);
  specWrite.write(spec.split('1e+21').join('1000000000000000000000'));
};

export const GenerateSpec = async (pathSubstrate: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log('Generate Spec');
    let args = ['build-spec', '--chain=local', '--disable-default-bootnode'];
    let proc = spawn(pathSubstrate, args);
    let spec = createWriteStream(join(process.cwd(), 'customSpec.json'));
    proc.stdout.on('data', function(chunk) {
      let message = chunk.toString();
      spec.write(message);
    });
    proc.stderr.on('data', function(chunk) {
      let message = chunk.toString();
      console.error(message);
    });
    proc.on('error', err => {
      console.log('Generate error ' + err);
      reject(err);
    });
    proc.on('close', () => {
      spec.close();
      resolve();
    });
  });
};
