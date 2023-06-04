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
  console.log("imgprompt")
  console.log(prompt)
  const response = await openai.createImage({
    prompt: prompt.description+ " as video game cgi graphics in the style of the game Myst and Riven",
    n: 1,
    size: "512x512",
  });
  let url = response.data.data[0].url

  return json(url);
}