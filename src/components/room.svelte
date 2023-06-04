<script>
    import { chat } from '../stores.js';

    let current_room
    let img = ""

    chat.subscribe(value => {
        current_room = value.messages[value.messages.length - 1]
    })

    async function roomImage(current_room) {
        if(current_room.role == "assistant" && JSON.parse(current_room.content).room_image_prompt) {
            const response = await fetch('/api/generate/images', {
                method: 'POST',
                body: JSON.stringify(JSON.parse(current_room.content).room_image_prompt)
            });
            let url = await response.json();
            console.log(url)
            img = url
            return url
        } else {
            return 'foo'
        }
    }

    function desc(current_room) {
        if(current_room.role == "assistant") {
            let json = JSON.parse(current_room.content)
            return json.room_description
        } else {
            return 'Loading ...'
        }
    }

    $: img = roomImage(current_room)
    $: description = desc(current_room)

</script>
<p>{description}</p>
<img src={img} alt=""/>