<template>
    <div class="datatable">
        <table class="datatable__table">
            <thead class="datatable__table__head">
                <tr>
                    <th v-for="(header, i) in headers" :key="i">
                        {{ header['label'] || header['field'] }}
                    </th>
                </tr>
                <tr v-if="filter">
                    <th v-for="(header, i) in headers" :key="i">
                        <slot :name="`filter-${header['field']}`"></slot>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, di) in data" :key="di">
                    <td v-for="(header, i) in headers" :key="i">
                        <slot :name="header['field'] || header['label']" :data="{row}">
                            {{ row[header['field']] }}
                        </slot>
                    </td>
                </tr>
                <tr v-if="!data.length">
                    <td :colspan="headers.length">
                        No Data!!!
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { defineComponent } from "vue";

    export default defineComponent({
        props: {
            headers: {
                type: Array,
                default: () => []
            },
           data: {
            type: Array,
            default: () => []
           },
           filter: {
            type: Boolean,
            default: false
           }
        }
    })
</script>

<style lang="scss" scoped>
    .datatable {
        display: block;
        text-align: center;
        &__table {
            width: 100%;
            border-radius: .2rem;
            border: .1rem solid black;
            // border-collapse: collapse;
            th, td {
                border: .1rem solid black;
                border-radius: .2rem;
                padding: .3rem;
                width: max-content;
            }
        }
    }
</style>