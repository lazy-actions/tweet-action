import crypto from 'crypto';
import { v4 as uuid } from 'uuid';
import { camel2snake, rfc3986 } from './utils';

interface Query {
  [name: string]: any;
}

interface Entity {
  [name: string]: string;
}

export class OAuth {
  oauthConsumerKey: string;
  oauthToken: string;
  oauthNonce: string;
  oauthTimestamp: string;
  oauthSignature: string;
  oauthSignatureMethod: string = 'HMAC-SHA1';
  oauthVersion: string = '1.0';

  constructor(
    method: string,
    baseUrl: string,
    query: Query,
    oauthConsumerKey: string,
    oauthConsumerSecret: string,
    oauthToken: string,
    oauthTokenSecret: string,
    oauthNonce: string = '',
    oauthTimestamp: string = ''
  ) {
    this.oauthConsumerKey = oauthConsumerKey;
    this.oauthToken = oauthToken;
    this.oauthNonce = oauthNonce || uuid().replace(/-/, '');
    this.oauthTimestamp =
      oauthTimestamp || Math.floor(Date.now() / 1000).toString();
    this.oauthSignature = this.sign(
      method,
      baseUrl,
      query,
      oauthConsumerSecret,
      oauthTokenSecret
    );
  }

  generate(): string {
    return `OAuth ${this.concat(this.entity, '"', ', ')}`;
  }

  private get entity(): Entity {
    const entity: Entity = {};
    Object.entries(this).forEach(([k, v]) => (entity[k] = v));
    return entity;
  }

  private sign(
    method: string,
    url: string,
    query: Query,
    oauthConsumerSecret: string,
    oauthTokenSecret: string
  ): string {
    const params = this.concat({ ...this.entity, ...query }, '', '&');
    const base = [method.toUpperCase(), url, params].map(rfc3986).join('&');
    const key = [oauthConsumerSecret, oauthTokenSecret].map(rfc3986).join('&');

    return crypto.createHmac('sha1', key).update(base).digest('base64');
  }

  private concat(obj: object, wrap: string, sep: string): string {
    const params: string[] = [];
    Object.entries(obj)
      .sort()
      .forEach(([k, v]) =>
        params.push(`${camel2snake(k)}=${wrap}${rfc3986(v)}${wrap}`)
      );
    return params.join(sep);
  }
}
