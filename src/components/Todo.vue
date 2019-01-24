<template>
  <div class="todo">
    <h1 :class="{today: this.change == 0}">{{ day }}</h1>
    <todo-form @save="save" @updItem="updateItem" :change="change" :edit="edit" :value.sync="value"/>
    <todo-list v-if="currentTodos.length > 0" @delFrom="deleteFromBase" @edItem="editItem" @chekItem="chekItem" :currentTodos="currentTodos"/>
    <p v-else class="message">No task for this day</p>
    <div class="btn--container">
      <button class="previous" @click="change--; complete(); dayTasks(); whatDay(); ">Previous day</button>
      <button class="next" @click="change++; complete(); dayTasks(); whatDay();">Next day</button>
    </div>
  </div>
</template>

<script>
import TodoForm from './TodoForm.vue';
import TodoList from './TodoList.vue';
import { db } from '@/main';

const now = new Date();
const day = now.getDate();
const month = now.getMonth();

export default {
  name: 'Todo',
  components: {
    TodoForm,
    TodoList
  },
  data: () =>({
      todos: [],
      value: "",
      currentTodos: [],
      change: 0,
      day: '',
      edit: ''
    }),
  firestore () {
    return {
      todos: db.collection('todos').orderBy('time')
    }
  },
  watch: {
    todos(newValue, oldValue) {
      this.complete();
      this.dayTasks();
      this.whatDay();
    }
  },
  methods:{
    async dayTasks(){
      this.currentTodos = [];
      this.todos.forEach(el => {
        const timestamp = el['time'].seconds * 1000;
        const a = new Date(timestamp);
        a.setDate(a.getDate() - this.change);
        if(a.getMonth() === month && a.getDate() === day){
          const currentEl = {
            task: el.task,
            time: el.time,
            isComplete: el.isComplete,
            realTime: a.getHours() + ":" + a.getMinutes(),
            id: el.id,
            isActive: el.isActive
          }
          if(a.getMinutes() < 10){
            currentEl.realTime = a.getHours() + ":0" + a.getMinutes()
          }
          this.currentTodos.push(currentEl);
        }
      })
    },
    whatDay(){
      let a =  new Date();
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      a.setDate(a.getDate() + this.change);
      this.day = months[a.getMonth()] + " " + a.getDate() + " " + a.getFullYear();
    },
    save(todo){
      db.collection('todos').add(todo);
    },
    deleteFromBase(todo){
      db.collection('todos').doc(todo.id).delete();
    },
    editItem(el){
      this.value = el.task;
      this.edit = el.id;
    },
    updateItem(el){
      this.value = '';
      db.collection('todos').doc(el.id).update({task: el.task, time: { nanoseconds: 0, seconds: Math.floor( el.time / 1000) } } );
      this.dayTasks();
    },
    complete(){
      this.todos.forEach(el => {
        if(el.time.seconds < now.getTime()/1000){
          el.isComplete = true;
        }
      });
    },
    chekItem(todo){
      console.log(this.todos);
      const t = {
        ...todo,
        isActive: !todo.isActive
      };
      db.collection('todos').doc(t.id).update({isActive: t.isActive});
    }
  }
}
</script>

<style scoped lang="scss">
  .todo{
    height: 100vh;
  }

  .message{
   height: 70vh;
   text-align: center;
  }

  .today{
    color: green;
  }

  .btn--container{
    display: flex;
    justify-content: space-between;
    width: 95%;
    position: fixed;
    bottom: 15px;
  }

</style>
