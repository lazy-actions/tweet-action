import * as fs from 'fs';
import * as path from 'path';

export const currentDir = process.env.GITHUB_WORKSPACE || '';

export function loadFromFile(filename: string): string {
  const filepath = path.isAbsolute(filename)
    ? filename
    : path.join(currentDir, filename);

  if (!fs.existsSync(filepath)) {
    throw new Error(`Could not find ${filename}`);
  }

  if (!fs.statSync(filepath).isFile()) {
    throw new Error(`${filename} is not a file`);
  }

  return fs.readFileSync(filepath, { encoding: 'utf8' });
}

export function camel2snake(target: string): string {
  return target.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
}

export function rfc3986(target: string) {
  return encodeURIComponent(target).replace(
    /[!'()*]/g,
    (x) => `%${x.charCodeAt(0).toString(16).toUpperCase()}`
  );
}
