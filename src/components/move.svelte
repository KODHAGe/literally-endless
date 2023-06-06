<script>
    import { chat } from '../stores.js';
    import { promptFormatter, generateContent } from '../helpers/contentGeneration.js';
    import { get } from 'svelte/store'

    let msg = get(chat).messages

    async function move(direction) {
        msg.messages.push(promptFormatter("You move toward " + direction))
        await generateContent(msg.messages, chat, msg)
    }

    chat.subscribe(value => {
        msg = value
    })

</script>
<button on:click={() => move('north')}>North</button>
<button on:click={() => move('west')}>West</button>
<button on:click={() => move('east')}>East</button>
<button on:click={() => move('south')}>South</button>