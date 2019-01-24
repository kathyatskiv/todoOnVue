<template>
  <div class="app">
    <todo/>
  </div>
</template>

<script>
import Todo from '@/components/Todo.vue'

export default {
  name: 'app',
  components: {
    Todo
  }
}
</script>

<style lang="scss">
  *{
    box-sizing: border-box;
  }

</style>
