import { writable } from 'svelte/store';

export const character = writable({
    description: ''
});

export const room = writable({
    img_prompt:''
});

export const chat = writable({
    messages: [
        {"role": "system", "content": "You are a character in a Myst-like game, controlled by player actions. Return a short description yourself, of the place you are in and the actions of the player, a prompt for dall-e to generate an image of the room and lists of player attributes, inventory and possible interactions in json format in the following format {yourself, room_description, room_image_prompt, player_attributes, player_inventory, possible_interactions}. Do not include any explanations or notes, only provide a RFC8259 compliant JSON response. None of the fields should be empty."}
    ]
});