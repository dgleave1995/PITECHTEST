<template>
<h1 class="test">{{text}}</h1>
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
 .test{
    color: #d80751;
 }
</style>