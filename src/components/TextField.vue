<template>
    <input v-bind="$attrs" :value="modelValue" @input="updateModel($event)">
</template>

<script>
import { defineComponent } from "vue";

    export default defineComponent({
        props: {
            modelValue: {}
        },
        emits: ['update:modelValue'],
        setup(props, { emit }) {
            const updateModel = (e) => {
                emit('update:modelValue', e.target.value)
            }

            return {
                updateModel
            }
        }
    })
</script>
<style lang="scss" scoped>
    input {

        width: 90%;
        height: 1.6rem;
        padding: .2rem .5rem;
        font-size: 1rem;
        border: black .1rem solid;
        border-radius: .2rem;
        outline: none;
        &:focus {
            border: .1rem solid rgb(16, 178, 247);
        }
    }
</style>