import * as fs from 'fs';
import * as path from 'path';

export const currentDir = process.env.GITHUB_WORKSPACE || '';

export function loadFromFile(filename: string): string {
  const filepath = path.join(currentDir, filename);

  if (!fs.statSync(filepath).isFile()) {
    throw new Error(`Could not find ${filename}`);
  }

  return fs.readFileSync(filepath, { encoding: 'utf8' });
}
