<script>
    import { chat, room } from '../stores.js';

    let currentRoom,
        previousRoom,
        img

    chat.subscribe(value => {
        currentRoom = value.messages[value.messages.length - 1]
    })

    room.subscribe(value => {
        previousRoom = value.img_prompt
    })

    async function roomImage(currentRoom) {
        let currentJson = JSON.parse(currentRoom.content)
        if(currentRoom.role == "assistant" && currentJson.room_image_prompt && currentJson.room_image_prompt != previousRoom) {
            const response = await fetch('/api/generate/images', {
                method: 'POST',
                body: JSON.stringify(currentJson.room_image_prompt + " as video game cgi graphics in the style of the game Myst and Riven")
            });
            let url = await response.json();
            img = url
            room.set({img_prompt: currentJson.room_image_prompt})
            return url
        } else {
            return 'foo'
        }
    }

    function desc(currentRoom) {
        if(currentRoom.role == "assistant") {
            let json = JSON.parse(currentRoom.content)
            return json.room_description
        } else {
            return 'Loading ...'
        }
    }

    $: img = roomImage(currentRoom)
    $: description = desc(currentRoom)

</script>
<p>{description}</p>
<img src={img} alt=""/>