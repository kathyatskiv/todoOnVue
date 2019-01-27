<template>
    <form class="form"  @submit.prevent="submit">
        <label class="matter-textfield-standard form__label">
            <input class="form__input" type="date" v-model="date" placeholder=" " required/>
            <span class="form__placeholder">Go to day</span>
        </label>   
        <button class="form__btn"  @submit.prevent="submit">
            <i class="material-icons form__icon">search</i>
        </button> 
        
    </form>
</template>

<script>
export default {
    data:()=>({
        date: ''
    }),
    methods:{
        submit(){
            const year = this.date[0] + this.date[1] + this.date[2] + this.date[3];
            const month = this.date[5] + this.date[6];
            const day = this.date[8] + this.date[9];
            const date = new Date(year, month-1, day);
            this.$emit("goToDay", date)
        }

    }

}
</script>

<style lang="scss" scoped>
    .form{
        display: flex;
        align-items: flex-end;
    }

    .form__input, .form__input:hover{
        background: transparent;
    }

    .form__btn{
        background: transparent;
        border: none;
        color: #2196F3;
    }

</style>
