<template>
    <div class="list--container">
        <ul class="list">
            <li class="list__item" v-for="(todo, key) in currentTodos" :key="key" :class="{ active: todo.isComplete }">
                <input class="list__isComplete" type="checkbox" @change="onChange(todo)" :value="todo.isActive">
                <h3 class="list__task" :class="{cross: todo.isActive}" >{{ todo.task }}</h3>
                <span class="list__time">{{ todo.realTime }}</span>
                <button class="list__btn delete" @click="deleteItem(todo)">
                    <i class="material-icons">delete_sweep</i>
                </button>
                <button class="list__btn edit" @click="editItem(todo)">
                    <i class="material-icons">create</i>
                </button>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    data: () => ({ 
    }),
    props: [ "currentTodos"],
    methods: {
        deleteItem(el){
            this.$emit("delFrom", el);
        },
        editItem(el){
            this.$emit("edItem", el);
        },
        onChange(el){
            this.$emit("chekItem", el);
        }
    }
}
</script>

<style lang="scss" scoped>
    .list--container{
        width: 350px;
    }

    .list{
        margin: 0;
        padding: 0;
        list-style: none;
        width: 350px;
    }
    
    .list__item{
        display: flex;
        align-items: center;
        padding: 0 10px;
        border-radius: 5px;
        margin-top: 5px; 

        &.active{
            opacity: .5;
            cursor: not-allowed;
        }
    }

    .list__isComplete{
        width: 15px;
        height: 15px;
        margin-right: 5px;
        border: 1px solid black;
        background: transparent;   
    }
    
    .list__task{
        display: inline-block;
        margin-right: auto;
        position: relative;
        
        &::after{
            content: '';
            width: 0;
            transition: width .3s ease-in-out;
        }

        &.cross::after{
            content: '';
            width: 100%;
            height: 1px;
            position: absolute;
            top: 50%;
            left: 0;
            background: black;
        }
    }

    .list__btn{
        margin-left: 10px;
        border: none;
        color: #fff;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 35px;
        width: 35px;

    }

    .edit{
        background: green;
    }

    .delete{
        background: red;
    }

</style>
