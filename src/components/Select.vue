<template>
    <select v-bind="$attrs" :value="modelValue" :placeholder="placeholder" @input="updateModel($event)">
        <option v-for="(option, i) in options" :key="i">
            {{ option }}
        </option>
    </select>
</template>

<script>
import { computed, defineComponent } from "vue";

    export default defineComponent({
        props: {
            modelValue: {
                type: String,
                default: ""
            },
            options: {
                type: Array,
                default: () => []
            }
        },
        emits: ['update:modelValue'],
        setup(props, { emit }) {
            const updateModel = (e) => {
                emit('update:modelValue', e.target.value)
            }

            const optionsComputed = computed(() => props.options)


            return {
                updateModel,
                optionsComputed
            }
        }
    })
</script>
<style lang="scss" scoped>
    select {
        // height: 2rem;
        background: transparent;
        padding: .2rem .5rem;
        display: inline-block;
        font-size: 1rem;
        border: black .1rem solid;
        border-radius: .2rem;
        outline: none;
        &:focus {
            border: .1rem solid rgb(16, 178, 247);
        }
    }
</style>