import * as core from '@actions/core';
import { Inputs } from './inputs';
import { render } from './render';
import { tweet } from './twitter';

async function run(): Promise<void> {
  const inputs = new Inputs();
  let message = inputs.message;

  if (!message) {
    message = render(inputs.template as string, inputs.data as ejs.Data);
    core.debug(`Rendered message: ${message}`);
  }

  await tweet(
    message,
    inputs.oauthConsumerKey,
    inputs.oauthConsumerSecret,
    inputs.oauthToken,
    inputs.oauthTokenSecret
  );
  core.info('Tweet success!!');
}

run().catch((err) => core.setFailed(err.message));
