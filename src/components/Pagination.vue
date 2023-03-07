<script>
  import { defineComponent, ref } from "vue";
  export default defineComponent({
    props: {
        total: {
            type: Number,
            default: 12
        },
        perPage: {
            type: Number,
            default: 12
        },
        maxPagesShown: {
            type: Number,
            default: 5
        }

    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const currentPage = ref(1);
        const onClickHandler = (page) => {
          emit('update:modelValue', page);
        };

        return {
            currentPage,
            onClickHandler
        }
    }
  })
</script>

<template>
  <vue-awesome-paginate
    :total-items="total"
    :items-per-page="perPage"
    :max-pages-shown="maxPagesShown"
    v-model="currentPage"
    :on-click="onClickHandler"
  />
</template>

<style>
  .pagination-container {
    display: flex;
    column-gap: 10px;
  }
  .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
  }
  .paginate-buttons:hover {
    background-color: #d8d8d8;
  }
  .active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
  }
  .active-page:hover {
    background-color: #2988c8;
  }
</style>