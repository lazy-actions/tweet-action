import crypto from 'crypto';
import { v4 as uuid } from 'uuid';
import { camel2snake, rfc3986 } from './utils';
import {
  RequestQuery,
  OAuthRequest,
  OAuthSignatureSource,
  OAuthSecret
} from './interfaces';

export function generate(
  method: string,
  baseUrl: string,
  query: RequestQuery,
  oauthConsumerKey: string,
  oauthConsumerSecret: string,
  oauthToken: string,
  oauthTokenSecret: string,
  oauthNonce: string = uuid().replace(/-/, ''),
  oauthTimestamp: string = Math.floor(Date.now() / 1000).toString(),
  oauthSignatureMethod: string = 'HMAC-SHA1',
  oauthVersion: string = '1.0'
): string {
  const req = { method, baseUrl, query };
  const source = {
    oauthConsumerKey,
    oauthToken,
    oauthNonce,
    oauthTimestamp,
    oauthSignatureMethod,
    oauthVersion
  };
  const secret = { oauthConsumerSecret, oauthTokenSecret };
  const oauthSignature = sign(req, source, secret);
  const entity = { ...source, oauthSignature };
  return `OAuth ${concat(entity, '"', ', ')}`;
}

function sign(
  req: OAuthRequest,
  source: OAuthSignatureSource,
  secret: OAuthSecret
): string {
  const params = concat({ ...source, ...req.query }, '', '&');
  const base = [req.method.toUpperCase(), req.baseUrl, params]
    .map(rfc3986)
    .join('&');
  const key = Object.values(secret).map(rfc3986).join('&');
  return crypto.createHmac('sha1', key).update(base).digest('base64');
}

function concat(
  obj: { [name: string]: string },
  wrap: string,
  sep: string
): string {
  const params: string[] = [];
  Object.entries(obj)
    .sort()
    .forEach(([k, v]) =>
      params.push(`${camel2snake(k)}=${wrap}${rfc3986(v)}${wrap}`)
    );
  return params.join(sep);
}
