import { generate } from '../src/oauth';

describe('OAuth tests', () => {
  test('Generate the value of authorization header', () => {
    const oauth = generate(
      'POST',
      'https://api.twitter.com/1.1/statuses/update.json',
      {
        include_entities: 'true',
        status: 'Hello Ladies + Gentlemen, a signed OAuth request!'
      },
      'xvz1evFS4wEEPTGEFPHBog',
      'kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw',
      '370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb',
      'LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE',
      'kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg',
      '1318622958'
    );
    expect(oauth).toBe(
      'OAuth oauth_consumer_key="xvz1evFS4wEEPTGEFPHBog", oauth_nonce="kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg", oauth_signature="hCtSmYh%2BiHYCEqBWrE7C7hYmtUk%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1318622958", oauth_token="370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb", oauth_version="1.0"'
    );
  });
});
