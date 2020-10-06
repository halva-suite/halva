import { resolve, join } from 'path';
import { spawn, exec } from 'child_process';
import { createWriteStream, unlink, stat } from 'fs';
import { HalvaSpecModifier, balanceMiddleware } from '@halva-suite/halva-spec-builder';
import { keyloggerMiddleware } from '@halva-suite/halva-spec-builder/dist/middlewares/KeyloggerMiddleware';

import { HalvaTestConfig } from '../TestRunner';

const SPEC_FILE_NAME = 'halvaSpec.json';
const SUBSTRATE_TAG = 'v2.0.0';

export const Start = async (
  pathSubstrate: string,
  config: HalvaTestConfig,
) => {
  if (await getCurrentBranch() !== SUBSTRATE_TAG) {
    await spawnProcess('git', ['checkout', SUBSTRATE_TAG]);
  }

  await spawnProcess('./scripts/init.sh');
  await spawnProcess('cargo', ['build']);
  
  try {
    await checkFile(pathSubstrate);
  } catch (err) {
    console.error(err.message);
    return;
  }

  await buildSpec(pathSubstrate);

  (
    await HalvaSpecModifier.init(
      join(process.cwd(), SPEC_FILE_NAME),
      '1152921504606847000',
      10
    )
      .setMnemonic(config.mnemonic)
      .apply(balanceMiddleware)
      .apply(keyloggerMiddleware)
      .run()
  ).output(join(process.cwd(), SPEC_FILE_NAME));

  await spawnProcess(
    resolve(pathSubstrate),
    [
      `--chain=./${SPEC_FILE_NAME}`,
      '--validator',
      '--alice',
      '--tmp',
    ], false,
  );
};

async function checkFile(path: string) {
  return new Promise((resolve, reject) => {
    stat(path, (err, stats) => {
      if (err) {
        return reject(err);
      }

      return resolve(stats);
    });
  });
}

async function getCurrentBranch() {
  return new Promise((resolve, reject) => {
    exec('git rev-parse --abbrev-ref HEAD', (err, stdout) => {
      if (err) {
        reject(err);
        return;
      }
  
      resolve(stdout.trim());
    });
  });
}

async function removeSpec(specPath: string) {
  return new Promise((resolve, reject) => {
    unlink(specPath, async (err) => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
}

async function buildSpec(pathSubstrate: string) {
  const specPath = join(process.cwd(), SPEC_FILE_NAME);

  try {
    await checkFile(specPath);
    await removeSpec(specPath);
  } catch (e) {}

  let spec = createWriteStream(specPath);

  await spawnProcess(
    pathSubstrate,
    ['build-spec', '--dev'], true,
    (chunk) => spec.write(chunk.toString()),
    undefined, undefined,
    spec.close,
  );
}

function spawnProcess(
  command: string,
  args?: string[],
  silent: boolean = false,
  onStdoudData?: (chunk: any) => void,
  onStderrData?: (chunk: any) => void,
  onErr?: (err: any) => void,
  onClose?: () => void
) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args);

    proc.stdout.on('data', function (chunk) {
      if (!silent) console.log(chunk.toString());
      if (onStdoudData) onStdoudData(chunk);
    });

    proc.stderr.on('data', function(chunk) {
      if (!silent) console.log(chunk.toString());
      if (onStderrData) onStderrData(chunk);
    });

    proc.on('error', err => {
      if (onErr) onErr(err);
      reject(err);
    });

    proc.on('close', () => {
      if (onErr) onClose();
      resolve();
    });
  });
}
