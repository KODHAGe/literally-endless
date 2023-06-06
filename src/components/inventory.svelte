<script>
    import { chat } from '../stores.js';
    import { promptFormatter, generateContent } from '../helpers/contentGeneration.js';
    
    let current,
        msg

    chat.subscribe(value => {
        msg = value
        current = value.messages[value.messages.length - 1]
    })

    function parseInventory(current) {
        if(current.role == "assistant") {
            let json = JSON.parse(current.content)
            console.log(json.player_inventory)
            return json.player_inventory
        } else {
            return 'Looking through inventory'
        }
    }

    async function use(object) {
        msg.messages.push(promptFormatter("You use " + object))
        await generateContent(msg.messages, chat, msg)
    }

$: inventory = parseInventory(current)

</script>
{#each Object.entries(inventory) as [key, value]}
    {#if Array.isArray(value)}
    {#each value as val}
        <button on:click={() => use(val)}>{val}</button>
    {/each}
    {:else}
        <p><span>{key}</span>:<span>{value}</span></p>
    {/if}
{/each}