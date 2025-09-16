<template>
<h1 class="header-format">{{text}}</h1>
</template>

<script>
    export default {
        name: 'Heading',

        props:{
            text:{
                type: String,
                required: true,
            }
        }
    }
</script>

<style scoped>
 .header-format{
    color: #d80751;
 }
</style>