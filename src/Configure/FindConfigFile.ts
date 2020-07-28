import { existsSync } from 'fs';
import { join } from 'path';

export function getConfigureModule(filename: string): string {
  const configPath = join(process.cwd(), filename);

  if (!existsSync(configPath)) {
    throw new Error(`Could not find suitable configuration file.`);
  }

  return configPath;
}
