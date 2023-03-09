<template>
  <div id="app">
    <form @submit.prevent="onAddList">
      <div class="form-control" :class="{shake: listError}">
        <div class="form-input">
          <TextFiled class="input" :error="!!listError" label="List" placeholder="Add new list" v-model="list"/>
          <button>Add</button>
        </div>
        <p v-if="listError"> {{ listError }}</p>
      </div>
    </form>
    <transition-group tag="ul" name="list" class="list">
      <li class="list__item" v-for="(list, index) in todoListStore.lists" :key="list">
        <span>{{ list }}</span> <button @click="onRemoveList(index)">Remove</button>
      </li>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref } from 'vue';
import TextFiled from './components/TextFiled.vue';
import { useTodoListStore } from '@/store/todoListStore'
import { toast } from 'vue3-toastify'
export default defineComponent({
    setup() {
        const list = ref("");
        const listError = ref("");
        const todoListStore = useTodoListStore();
        // methods
        console.log(todoListStore);
        
        const onAddList = () => {
          try {
            if(!list.value.length) {
              throw new Error('List is required!')
            }
          todoListStore.addList(list.value)
          .then(() => {
            toast.success("list is added successfully!")
            list.value = "";
            listError.value = ""
          }).catch(error => {
            toast.error(error.message || 'Something went wrong!');
          })
        
          } catch (error) {
            listError.value = (error as Error).message
            toast.error((error as Error).message || 'Something went wrong!');
          }
        }

        const onRemoveList = (list: number) => {
          todoListStore.removeList(list)
          .then(() => {
              toast.success('List is deleted successfully!');
          }).catch(error => {
            toast.error(error.message || 'List is not deleted!');
          })
        }

        onUnmounted(() => {
            localStorage.setItem('todo-list', todoListStore.lists.join(','));
        })

        return {
            list,
            listError,
            todoListStore,

            // methods 
            onAddList,
            onRemoveList
        };
    },
    components: { TextFiled }
})
</script>

<style lang="scss" scoped>
#app {
  width: 100rem;
  margin: auto;
  margin-top: 60px;
}

form {
  width: 100%;
}
.form-control {
  margin: auto;
  width: 100%;
  .form-input {
    gap: .5rem;
    display: flex;
    justify-content: center;

    .input {
      flex: 1 1 auto;
    }


  }
  p {
    text-align: left;
    color: $red;
    margin-top: .1rem;
  }
  button {
    border: .17rem solid $green;
    color: $green;
    padding: 0 1rem;
    font-size: 1rem;
    font-weight: 600;
    background: rgba($color: $green, $alpha: .1);
    border-radius: .5rem;
    outline: none;
  }
}

.list {
  margin: auto;
  margin-top: 1rem;@mixin paper-elevated {
    box-shadow: 0px 3px 1px -2px rgba(19, 17, 32, 0.2), 0px 2px 2px rgba(19, 17, 32, 0.14), 0px 1px 5px rgba(19, 17, 32, 0.12);
    border-radius: .6rem;
}
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: .3rem;
  &__item {
    @include paper-elevated;
    padding: .4rem .8rem;
    border-radius: .5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      flex: 1 1 auto;
      text-align: left;
      font-size: 1rem;
    }

    button {
      outline: none;
      border: rgb(167, 219, 90) .1rem solid;
      font-size: 1rem;
      background: transparent;
      color: rgb(167, 219, 90);
      border-radius: .5rem;
      padding: .5rem .9rem;
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}


.shake {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
