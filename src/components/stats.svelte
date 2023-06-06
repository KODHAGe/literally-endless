<script>
    import { chat } from '../stores.js';
    let current
    chat.subscribe(value => {
        current = value.messages[value.messages.length - 1]
    })

    function parseAttributes(current) {
        if(current.role == "assistant") {
            console.log(current)
            let json = JSON.parse(current.content)
            console.log(json.player_attributes)
            return json.player_attributes
        } else {
            return 'unknown attrs'
        }
    }
    $: attr = parseAttributes(current)

</script>
{#each Object.entries(attr) as [key, value]}
  <p>{key}:{value}</p>
{/each}