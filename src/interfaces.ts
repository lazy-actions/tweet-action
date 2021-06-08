export interface RequestQuery {
  [name: string]: any;
}

export interface OAuthSignatureSource {
  oauthConsumerKey: string;
  oauthToken: string;
  oauthNonce: string;
  oauthTimestamp: string;
  oauthSignatureMethod: string;
  oauthVersion: string;
}

export interface OAuthSecret {
  oauthConsumerSecret: string;
  oauthTokenSecret: string;
}

export interface OAuthRequest {
  method: string;
  baseUrl: string;
  query: RequestQuery;
}
