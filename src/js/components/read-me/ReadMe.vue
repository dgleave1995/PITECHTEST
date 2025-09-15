<template>
    <pre class="text-format"> {{README}}</pre>
</template>

<script>
import README from '../../../../README.txt?raw'

export default {
    name: 'ReadeMe',

    data(){
        return {
            README,
        }
    }
}
</script>

<style scoped>
    .text-format{
        text-align: left;
    }
</style>