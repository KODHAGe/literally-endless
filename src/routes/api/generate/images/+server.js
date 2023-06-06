import { error, json } from '@sveltejs/kit';

import { OPENAI_API_KEY } from '$env/static/private'

import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/** @type {import('./$types').RequestHandler} */

export async function POST({ request }) {
  const prompt = await request.json()
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "256x256",
  });
  let url = response.data.data[0].url

  return json(url);
}