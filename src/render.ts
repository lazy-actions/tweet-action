import * as ejs from 'ejs';
import { currentDir } from './utils';

export function render(template: string, data: object): string {
  return ejs.render(template, data, { root: currentDir });
}
