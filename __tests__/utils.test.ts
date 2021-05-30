import path from 'path';
import * as utils from '../src/utils';

describe('loadFromFile() tests', () => {
  test('Load existing file', () => {
    const result = utils.loadFromFile(
      path.join(__dirname, 'fixtures/template.ejs')
    );
    expect(result).toBe('Hello <%= name %>');
  });

  test('Could not find file', () => {
    const nonExistingFile = '?????';
    expect(() => utils.loadFromFile(nonExistingFile)).toThrow(
      `Could not find ${nonExistingFile}`
    );
  });

  test('THe specified file is actually directory', () => {
    expect(() => utils.loadFromFile(__dirname)).toThrow(
      `${__dirname} is not a file`
    );
  });
});

describe('camel2snake() tests', () => {
  test('Convert camel case to snake case', () => {
    expect(utils.camel2snake('helloWorld')).toBe('hello_world');
    expect(utils.camel2snake('hello_world')).toBe('hello_world');
    expect(utils.camel2snake('tweetActionDevelopedByLazy-actions')).toBe(
      'tweet_action_developed_by_lazy-actions'
    );
  });
});

describe('rfc3986() tests', () => {
  test('Encode', () => {
    expect(utils.rfc3986('Hello Ladies + Gentlemen')).toBe(
      'Hello%20Ladies%20%2B%20Gentlemen'
    );
  });
});
