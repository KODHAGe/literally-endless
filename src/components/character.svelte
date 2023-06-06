<script>
    import { chat, character} from '../stores.js';
    let current,
        previous

    chat.subscribe(value => {
        current = value.messages[value.messages.length - 1]
    })

    character.subscribe(value => {
        previous = value
    })

    function parseCharacter(current) {
        if(current.role == "assistant") {
            let json = JSON.parse(current.content)
            return json.yourself
        } else {
            return 'unknown attrs'
        }
    }

    async function characterImage(current) {
        let currentJson = JSON.parse(current.content)
        if(current.role == "assistant" && currentJson.yourself && currentJson.yourself != previous) {
            const response = await fetch('/api/generate/images', {
                method: 'POST',
                body: JSON.stringify(currentJson.yourself + " low resolution CGI humanoid avatar with black background")
            });
            let url = await response.json();
            img = url
            character.set({description: currentJson.yourself})
            return url
        } else {
            return 'foo'
        }
    }

    $: char = parseCharacter(current)
    $: img = characterImage(current)

</script>
<div><p>Player</p><p>{char}</p><img src={img} alt=""/></div>