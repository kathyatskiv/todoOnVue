<template>
  <div class="todo">
    <h1 :class="{today: this.change == 0}" class="currentDay">{{ day }}</h1>
    <todo-form @save="save" @updItem="updateItem" :change="change" :edit="edit" :value.sync="value" :time.sync="timeValue"/>
    <todo-list v-if="currentTodos.length > 0" @delFrom="deleteFromBase" @edItem="editItem" @chekItem="chekItem" :currentTodos="currentTodos" :edit="edit"/>
    <p v-else class="message">No task for this day</p>
    <div class="btn--container">
      <button class="matter-button-outlined previous" @click="change--; complete(); dayTasks(); whatDay(); ">Previous day</button>
      <day-founder @goToDay="goToDay"/>
      <button class="matter-button-outlined next" @click="change++; complete(); dayTasks(); whatDay();">Next day</button>
    </div>
  </div>
</template>

<script>
import TodoForm from './TodoForm.vue';
import TodoList from './TodoList.vue';
import DayFounder from './DayFounder.vue';
import { db } from '@/main';

const now = new Date();
const day = now.getDate();
const month = now.getMonth();

export default {
  name: 'Todo',
  components: {
    TodoForm,
    TodoList,
    DayFounder
  },
  data: () =>({
      todos: [],
      value: "",
      timeValue: "",
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
            isComplete: el.isComplete,
            realTime: a.getHours() + ":" + a.getMinutes(),
            id: el.id,
            isActive: el.isActive,
            isEdit: el.isEdit
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
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      a.setDate(a.getDate() + this.change);
      this.day = days[a.getDay()]+ ", " + months[a.getMonth()] + " " + a.getDate() + " " + a.getFullYear();
    },
    save(todo){
      this.value = '';
      this.time = '';
      db.collection('todos').add(todo);
    },
    deleteFromBase(todo){
      db.collection('todos').doc(todo.id).delete();
    },
    editItem(el){
      this.value = el.task;
      this.edit = el.id;
      this.timeValue = el.time;
    },
    updateItem(el){
      this.value = '';
      this.time = '';
      this.edit = '';
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
      const t = {
        ...todo,
        isActive: !todo.isActive
      };
      db.collection('todos').doc(t.id).update({isActive: t.isActive});
    },
    goToDay(date){
      const seconds = date.getTime()/1000;
      const now = new Date();
      const secondsNow = Math.floor(now.getTime()/1000);
      const change = Math.floor((secondsNow - seconds)/3600/24);
      this.change = -change;
      this.dayTasks();
      this.whatDay();
      this.complete();
    }
  }
}
</script>

<style scoped lang="scss">
  .todo{
    height: 100vh;
    width: 350px;
    margin: 0;

    @media screen and (min-width: 768px) {
      width: 550px;
    }

    @media screen and (min-width: 992px) {
      width: 750px;
    }
  }

  .message{
   height: 70vh;
   text-align: center;
  }

  .currentDay{
    font-family: 'Raleway', sans-serif;
    text-align: center;
  }

  .today{
    color: green;
  }

  .btn--container{
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 350px;
    position: fixed;
    bottom: 15px;

    @media screen and (min-width: 768px) {
      width: 550px;
    }

    @media screen and (min-width: 992px) {
      width: 750px;
    }

  }

</style>
