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
  oauthNonce = uuid().replace(/-/, ''),
  oauthTimestamp = Math.floor(Date.now() / 1000).toString(),
  oauthSignatureMethod = 'HMAC-SHA1',
  oauthVersion = '1.0'
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
  return Object.entries(obj)
    .sort()
    .map(([k, v]) => `${camel2snake(k)}=${wrap}${rfc3986(v)}${wrap}`)
    .join(sep);
}
