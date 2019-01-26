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
@import "./assets/materials.css";
  *{
    box-sizing: border-box;
  }

  .app{
    display: flex;
    justify-content: center;
  }

</style>
