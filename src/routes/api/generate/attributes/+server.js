import { error } from '@sveltejs/kit';
import { chat } from '../../../../stores.js'
import { get } from 'svelte/store'

import { OPENAI_API_KEY } from '$env/static/private'

import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);  

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {"role": "system", "content": "You are a helpful json generator. You return only valid json objects."},
          {"role": "user", "content": "Return a json object with the keys health, strength and mana. Do not include any explanations or notes, only provide a  RFC8259 compliant JSON response."}
        ]
    });
    let text = response.data.choices[0].message.content

    console.log(text)
    return new Response(String(text));
}

export async function POST({ request }) {
  console.log("RECEIVED")
  const prompt = await request.json()
  console.log(prompt)
  const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: prompt
  });
  let text = response.data.choices[0].message.content
  return new Response(String(text));
}