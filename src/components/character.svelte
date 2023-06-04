<script>
        import { character } from '../stores.js';

        let char

        character.subscribe(value => {
            char = value
        })

</script>
<p>character: {char.description}</p>