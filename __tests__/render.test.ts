import * as path from 'path';
import { Inputs } from '../src/inputs';
import { render } from '../src/render';

describe('render() tests', () => {
  const initEnv = process.env;
  const fixtureDir = path.join(__dirname, 'fixtures');
  const dataFilename = path.join(fixtureDir, 'data.json');
  const templateFilename = path.join(fixtureDir, 'template.ejs');

  beforeEach(() => {
    process.env = {
      INPUT_OAUTH_CONSUMER_KEY: 'test',
      INPUT_OAUTH_CONSUMER_SECRET: 'test',
      INPUT_OAUTH_TOKEN: 'test',
      INPUT_OAUTH_TOKEN_SECRET: 'test',
      ...initEnv
    };
  });

  test('With data and template params', () => {
    process.env['INPUT_DATA'] = JSON.stringify({ name: 'lazy-actions' });
    process.env['INPUT_TEMPLATE'] = 'Hello <%= name %>';
    const inputs = new Inputs();
    expect(render(inputs.template as string, inputs.data as object)).toBe(
      'Hello lazy-actions'
    );
  });

  test('With data_filename and template_filename params', () => {
    process.env['INPUT_DATA_FILENAME'] = dataFilename;
    process.env['INPUT_TEMPLATE_FILENAME'] = templateFilename;
    const inputs = new Inputs();
    expect(render(inputs.template as string, inputs.data as object)).toBe(
      'Hello lazy-actions'
    );
  });
});
