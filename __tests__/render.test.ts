import * as path from 'path';
import { Inputs } from '../src/inputs';
import { render } from '../src/render';

describe('render() tests', () => {
  const initEnv = process.env;
  const fixtureDir = path.join(__dirname, 'fixtures');
  const dataFilename = path.join(fixtureDir, 'data.json');
  const templateFilename = path.join(fixtureDir, 'template.ejs');

  beforeEach(() => {
    process.env = { ...initEnv };
    process.env['INPUT_TWITTER-TOKEN'] = 'test';
  });

  test('With data and template params', () => {
    process.env['INPUT_DATA'] = JSON.stringify({ name: 'lazy-actions' });
    process.env['INPUT_TEMPLATE'] = 'Hello <%= name %>';
    const inputs = new Inputs();
    expect(render(inputs.template as string, inputs.data as object)).toBe(
      'Hello lazy-actions'
    );
  });

  test('With data-filename and template-filename params', () => {
    process.env['INPUT_DATA-FILENAME'] = dataFilename;
    process.env['INPUT_TEMPLATE-FILENAME'] = templateFilename;
    const inputs = new Inputs();
    expect(render(inputs.template as string, inputs.data as object)).toBe(
      'Hello lazy-actions'
    );
  });
});
