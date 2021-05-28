import * as path from 'path';
import { Inputs } from '../src/inputs';

describe('Inputs class tests', () => {
  const initEnv = process.env;
  const fixtureDir = path.join(__dirname, 'fixtures');
  const dataFilename = path.join(fixtureDir, 'data.json');
  const templateFilename = path.join(fixtureDir, 'template.ejs');

  beforeEach(() => {
    process.env = { ...initEnv };
    process.env['INPUT_TWITTER-TOKEN'] = 'test';
  });

  test('Not throw error with message param', () => {
    process.env['INPUT_MESSAGE'] = 'Have a nice day';
    expect(() => new Inputs()).not.toThrow();
  });

  test('Not throw error with data and template param', () => {
    process.env['INPUT_DATA'] = JSON.stringify({ name: 'lazy-actions' });
    process.env['INPUT_TEMPLATE'] = 'Hello <%= name %>';
    expect(() => new Inputs()).not.toThrow();
  });

  test('Not throw error with data-filename and template-filename param', () => {
    process.env['INPUT_DATA-FILENAME'] = dataFilename;
    process.env['INPUT_TEMPLATE-FILENAME'] = templateFilename;
    expect(() => new Inputs()).not.toThrow();
  });

  test('Throw error with twitter-token only', () => {
    expect(() => new Inputs()).toThrow('Insufficient the input parameters');
  });

  test('Throw error with data param without template param', () => {
    process.env['INPUT_DATA'] = JSON.stringify({ name: 'lazy-actions' });
    expect(() => new Inputs()).toThrow('Insufficient the input parameters');
  });

  test('Throw error with template param without data param', () => {
    process.env['INPUT_TEMPLATE'] = 'Hello <%= name %>';
    expect(() => new Inputs()).toThrow('Insufficient the input parameters');
  });

  test('Throw error with data-filename param without template param', () => {
    process.env['INPUT_DATA-FILENAME'] = dataFilename;
    expect(() => new Inputs()).toThrow('Insufficient the input parameters');
  });

  test('Throw error with template-filename param without data param', () => {
    process.env['INPUT_TEMPLATE-FILENAME'] = templateFilename;
    expect(() => new Inputs()).toThrow('Insufficient the input parameters');
  });
});
