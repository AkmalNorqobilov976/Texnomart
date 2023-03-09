<template>
    <div class="input-component" :class="{'error': error}" :label="label">
        <input 
            type="text"
            class="input-component__input"
            :value="modelValue" 
            @input="modelUpdate($event)"
            v-bind="$attrs"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

    export default defineComponent({
        props: {
            label: {
                type: String,
                required: true
            },
            modelValue: {
                type: String,
                required: true
            },
            error: {
                type: Boolean,
                default: false
            }
        },
        emits: ['update:modelValue'],
        setup(props, { emit }) {
            const modelUpdate = (e: Event) => {
                emit('update:modelValue', (e.target as any).value)
            }

            return {
                modelUpdate
            }
        }
    })
</script>

<style lang="scss" scoped>
    .input-component {
        position: relative;
        border: .17rem solid $blue;
        color: $black;
        padding: 1rem;
        border-radius: .5rem;
        &::before {
            position: absolute;
            content: attr(label);
            background: white;
            padding: 0 .2rem;
            top: -.6rem;
            left: .5rem;
        }
        &__input {
            width: 100%;
            height: 100%;
            font-size: 1rem;
            color: inherit;
            border: none;
            outline: none;
            &::placeholder {
                color: inherit;
            }
        }

    }
    .error {
        border: .17rem solid $red;
        color: $red !important;
    }
    


</style>