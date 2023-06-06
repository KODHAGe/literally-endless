import { error } from '@sveltejs/kit';
import { chat } from '../../../../stores.js'
import { get } from 'svelte/store'

import { OPENAI_API_KEY } from '$env/static/private'

import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);  

/** @type {import('./$types.js').RequestHandler} */

export async function POST({ request }) {
  console.log("RECEIVED")
  const prompt = await request.json()
  const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: prompt
  });
  let text = response.data.choices[0].message.content
  return new Response(String(text));
}