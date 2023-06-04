<script>
        import { chat } from '../stores.js';
        let current
        chat.subscribe(value => {
            current = value.messages[value.messages.length - 1]
        })

        function parseAttributes() {
        if(current.role == "assistant") {
            let json = JSON.parse(current.content)
            return json.player_attributes
        } else {
            return 'unknown attrs'
        }
        }
/*
        "player_attributes": {
        "health": 100,
        "hunger": 0,
        "thirst": 0,
        "sanity": 100
    },*/
    $: attr = parseAttributes(current)

</script>
<p>{JSON.stringify(attr)}</p>