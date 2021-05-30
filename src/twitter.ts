import fetch from 'node-fetch';
import { OAuth } from './oauth';
import { rfc3986 } from './utils';

export async function tweet(
  message: string,
  oauthConsumerKey: string,
  oauthConsumerSecret: string,
  oauthToken: string,
  oauthTokenSecret: string
): Promise<void> {
  const url = 'https://api.twitter.com/1.1/statuses/update.json';
  const method = 'POST';
  const query = { include_entities: 'true', status: message };
  const oauth = new OAuth(
    method,
    url,
    query,
    oauthConsumerKey,
    oauthConsumerSecret,
    oauthToken,
    oauthTokenSecret
  );

  const res = await fetch(`${stringifyUrlWithQs(url, query)}`, {
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: oauth.generate()
    }
  });

  if (!res.ok) {
    try {
      const resBody = await res.json();
      throw new Error(
        `Failed to post a tweet: ${JSON.stringify(resBody.errors)}`
      );
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new Error(`Failed to post a tweet: ${res.statusText}`);
      } else {
        throw err;
      }
    }
  }
}

function stringifyUrlWithQs(url: string, query: { [name: string]: string }) {
  const queryStrings: string[] = [];
  Object.entries(query).forEach((x) =>
    queryStrings.push(x.map(rfc3986).join('='))
  );
  return `${url}?${queryStrings.join('&')}`;
}
