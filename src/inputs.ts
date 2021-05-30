import * as core from '@actions/core';
import { loadFromFile } from './utils';

export class Inputs {
  readonly message: string;
  readonly oauthConsumerKey: string;
  readonly oauthConsumerSecret: string;
  readonly oauthToken: string;
  readonly oauthTokenSecret: string;
  data: object | undefined;
  template: string | undefined;

  constructor() {
    this.oauthConsumerKey = core.getInput('oauth_consumer_key', {
      required: true
    });
    this.oauthConsumerSecret = core.getInput('oauth_consumer_secret', {
      required: true
    });
    this.oauthToken = core.getInput('oauth_token', { required: true });
    this.oauthTokenSecret = core.getInput('oauth_token_secret', {
      required: true
    });
    this.message = core.getInput('message');

    if (!this.message) {
      const data = this.getValue('data', 'data_filename');
      this.data = data ? JSON.parse(data) : '';
      this.template = this.getValue('template', 'template_filename');

      if (!this.data || !this.template) {
        throw new Error('Insufficient the input parameters');
      }

      if (typeof this.data !== 'object') {
        throw new Error('`data` should be key-value type');
      }
    }
  }

  private getValue(v1: string, v2: string): string {
    let value = core.getInput(v1);
    if (!value) {
      const filename = core.getInput(v2);
      value = filename ? loadFromFile(filename) : '';
    }
    return value;
  }
}
