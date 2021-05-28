import fetch from 'node-fetch';

export async function tweet(message: string, token: string): Promise<void> {
  const url = 'https://api.twitter.com/1.1/statuses/update.json';
  const options = {
    method: 'POST',
    body: JSON.stringify({ status: message }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  const res = await fetch(url, options);

  if (!res.ok) {
    try {
      const resBody = await res.json();
      throw new Error(`Failed to post a tweet: ${resBody.text}`);
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new Error(`Failed to post a tweet: ${res.statusText}`);
      } else {
        throw err;
      }
    }
  }
}
