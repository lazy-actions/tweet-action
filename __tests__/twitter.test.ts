import nock from 'nock';
import { tweet } from '../src/twitter';

describe('Tweet tests', () => {
  const message = 'Hello World';
  const baseUrl = 'https://api.twitter.com';
  const path = '/1.1/statuses/update.json';

  test('Succeed request', async () => {
    nock(baseUrl)
      .post(path)
      .query({ include_entities: 'true', status: message })
      .reply(200);

    try {
      await tweet(message, 'a', 'b', 'c', 'd');
    } catch (err) {
      expect(err).toBe(undefined);
    }
  });

  test('Fail request', async () => {
    const errorResponse = {
      errors: [{ message: 'Sorry, that page does not exist', code: 34 }]
    };
    nock(baseUrl)
      .post(path)
      .query({ include_entities: 'true', status: message })
      .reply(404, errorResponse);

    try {
      await tweet(message, 'a', 'b', 'c', 'd');
    } catch (err) {
      expect(err.message).toMatch(
        `Failed to post a tweet: ${JSON.stringify(errorResponse.errors)}`
      );
    }
  });
});
