<template>
    <div class="list--container">
        <ul class="list">
            <li class="list__item" v-for="(todo, key) in currentTodos" :key="key" :class="itemClass(todo)">
                <input class="list__isComplete" type="checkbox" @change="onChange(todo)" :checked="todo.isActive" >
                <span class="list__task" :class="{cross: todo.isActive}">{{ todo.task }}</span>
                <span class="list__time">{{ todo.realTime }}</span>
                <button class="matter-button-contained list__btn delete" @click="deleteItem(todo)">
                    <i class="material-icons">delete</i>
                </button>
                <button class="matter-button-contained list__btn edit" :class="{disactive: todo.isActive}" @click="editItem(todo)" :disabled="todo.isComplete">
                    <i class="material-icons">create</i>
                </button>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    props: [ "currentTodos", "edit"],
    methods: {
        deleteItem(el){
            this.$emit("delFrom", el);
        },
        editItem(el){
            if(!el.isActive){
                this.$emit("edItem", el);
            }
        },
        onChange(el){
            this.$emit("chekItem", el);
        },
        itemClass(el){
            return {
                active: el.isComplete, 
                isEdit: el.id === this.edit 
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .list--container{
        width: 100%;
    }

    .list{
        margin: 0;
        padding: 0;
        list-style: none;
    }
    
    .list__item{
        display: flex;
        align-items: center;
        padding: 0 10px;
        border-radius: 5px;
        margin-top: 10px; 
        width: 100%;
        height: 50px;

        &.active{
            opacity: .5;

            .edit{
                cursor: not-allowed;
            }

            .delete{
                color: rgba(var(--matter-onsurface-rgb, 0, 0, 0), 0.38);
                background-color: rgba(var(--matter-onsurface-rgb, 0, 0, 0), 0.12);
                box-shadow: none;
            }
        }

        &.isEdit{
            background: rgba($color: yellow, $alpha: .3)
        }
    }

    .list__isComplete{
        appearance: none;
        width: 20px;
        height: 20px;
        margin-right: 5px;
        border: 2px solid lightskyblue;
        border-radius: 25%;
        background: transparent;
        box-shadow: none;
        transition: background .1s linear;

        &:checked{
            background: lightskyblue;
        }
    }
    
    .list__task{
        display: inline-block;
        margin-right: auto;
        position: relative;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-weight: 100;
        font-size: 18px;
        
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
            top: 55%;
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
        background:rgba($color:  green, $alpha: .7);

        &.disactive{
            cursor: not-allowed;
        }
    }

    .delete{
        background: rgba($color:  red, $alpha: .7);
    }

</style>
