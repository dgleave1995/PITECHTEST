<template>
    <!-- Displays text from ReadME.txt -->
    <pre class="text-file text-format"> {{README}}</pre>
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