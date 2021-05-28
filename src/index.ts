import * as core from '@actions/core';
import { Inputs } from './inputs';
import { render } from './render';
import { tweet } from './twitter';

async function run(): Promise<void> {
  const inputs = new Inputs();

  if (!inputs.message) {
    inputs.message = render(inputs.template as string, inputs.data as ejs.Data);
  }

  await tweet(inputs.message, inputs.twitterToken);
}

run().catch((err) => core.setFailed(err.message));
