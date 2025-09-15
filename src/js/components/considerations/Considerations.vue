<template>
    <pre>{{Considerations}}</pre>
</template>

<script>
import Considerations from '../../../../Considerations.txt?raw'

export default {
    name: 'Considerations',

    data(){
        return {
            Considerations,
        }
    }
}
</script>