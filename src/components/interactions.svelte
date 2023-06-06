<script>
    import { chat } from '../stores.js';
    import { promptFormatter, generateContent } from '../helpers/contentGeneration.js';
    
    let current,
        msg

    chat.subscribe(value => {
        msg = value
        current = value.messages[value.messages.length - 1]
    })

    function parseInteractions(current) {
        if(current.role == "assistant") {
            let json = JSON.parse(current.content)
            console.log(json.possible_interactions)
            return json.possible_interactions
        } else {
            return 'nothing interactable'
        }
    }

    async function interact(name) {
        msg.messages.push(promptFormatter("You " + name))
        await generateContent(msg.messages, chat, msg)
    }

$: interactions = parseInteractions(current)

</script>
{#if Array.isArray(interactions)}
    {#each Object.entries(interactions) as [key, value]}
        {#if typeof value == 'object'}
            {#each Object.entries(value) as [key, val]}
                <button on:click={() => interact(key +" "+val)}>{val}</button>
            {/each}
        {:else}
            <button on:click={() => interact(key +" "+value)}>{value}</button>
        {/if}
    {/each}
{:else}
    {#each Object.entries(interactions) as [key, value]}
        <span>{key}</span>
        {#if Array.isArray(value)}
        {#each value as val}
            <button on:click={() => interact(key +" "+val)}>{val}</button>
        {/each}
        {:else}
            <p><span>{key}</span><button on:click={() => interact(key +" "+value)}>{value}</button></p>
        {/if}
    {/each}
{/if}