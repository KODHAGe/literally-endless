<script>
    import { chat, room, character } from '../stores.js';

    import Stats from '../components/stats.svelte'
    import Room from '../components/room.svelte'
    import Character from '../components/character.svelte'

    import { get } from 'svelte/store'
    import { onMount, setContext } from 'svelte'
    let msg = get(chat).messages

    function promptFormatter(prompt) {
        return {"role": "user", "content": prompt}
    }

    async function generateContent(data) {
        const response = await fetch('/api/generate/attributes', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        msg.messages.push({"role": "assistant", "content": await response.text()})
        console.log("msg 3")
        console.log(msg.messages)
        chat.set({
            messages: msg.messages
        })
    }

    async function charEdit() {
        const response = await fetch('/api/generate/attributes', {
            method: 'GET'
        });

        let total = await response.json();
        console.log(total)
        return total
    }
    async function move(direction) {
        msg.messages.push(promptFormatter("You move toward " + direction))
        await generateContent(msg.messages)
    }

    async function initDungeon() {
        msg.messages.push(promptFormatter("You enter a mysterious realm"))
        await generateContent(msg.messages)
    }

    async function examine(object) {
        msg.messages.push(promptFormatter("You examine " + object))
        await generateContent(msg.messages)
    }

    async function use() {
        msg.messages.push(promptFormatter("You use " + object))
        await generateContent(msg.messages)
    }

    //onMount(charEdit)
    onMount(initDungeon)
    chat.subscribe(value => {
        msg = value
    })
</script>

<h1>Literally endless</h1>
{#each Object.entries(msg.messages) as [text]}
  <p>{text}</p>
{/each}
<button on:click={() => move('north')}>North</button>
<button on:click={() => move('west')}>West</button>
<button on:click={() => move('east')}>East</button>
<button on:click={() => move('south')}>South</button>
<button on:click={() => examine()}>Examine</button>
<button on:click={() => fight()}>Fight</button>
<Stats></Stats>
<Character></Character>
<Room></Room>