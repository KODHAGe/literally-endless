<script>
    /* ~~ data ~~ */
    import { chat } from '../stores.js';

    /* ~~ generic functions ~~ */
    import { promptFormatter, generateContent } from '../helpers/contentGeneration.js';

    /* ~~ svelte parts ~~ */
    import { get } from 'svelte/store'
    import { onMount } from 'svelte'

    /* ~~ components ~~ */
    import Stats from '../components/stats.svelte'
    import Room from '../components/room.svelte'
    import Character from '../components/character.svelte'
    import Interactions from '../components/interactions.svelte';
    import Inventory from '../components/inventory.svelte';
    import Move from '../components/move.svelte';

    let msg = get(chat).messages

    async function charEdit() {
        const response = await fetch('/api/generate/attributes', {
            method: 'GET'
        });

        let total = await response.json();
        console.log(total)
        return total
    }

    async function initDungeon() {
        msg.messages.push(promptFormatter("You enter a mysterious realm"))
        await generateContent(msg.messages, chat, msg)
    }

    //onMount(charEdit)
    onMount(initDungeon)
    chat.subscribe(value => {
        msg = value
    })

</script>

<h1>Literally endless</h1>
<Stats></Stats>
<Character></Character>
<Room></Room>
<Interactions></Interactions>
<Inventory></Inventory>
<Move></Move>