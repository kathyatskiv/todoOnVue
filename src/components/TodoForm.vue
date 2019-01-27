<template>
    <div class="form--container">
        <form class="form " @submit.prevent="submit">
            <input class="form__task" type="text"  placeholder="Please add task ..." :value="value" @input="updateValue" required>
            <input class="form__time" type="time" :value="time" @input="updateTime" required>
            <button class="form__btn">
                <i class="material-icons">send</i>
            </button>
        </form>
    </div>
</template>

<script>

export default {
    props: ["value", "change", "edit", "time"],
    methods: {
        submit(){
            if(this.edit.length > 0){
                this.editItem(this.edit);
            }
            else{
                this.send();
            }

        },
        updateValue(ev) {
            const value = ev.target.value;
            this.$emit("update:value", value);
        },
        updateTime(ev) {
            const time = ev.target.value;
            this.$emit("update:time", time);
        },
        setTime(time){
            const day = Date.now();
            const a = new Date(day);
            a.setHours(parseInt(time[0] + time[1]));
            a.setMinutes(parseInt(time[3] + time[4]));
            a.setDate(a.getDate() + this.change);
            return a;
        },
        send(){
            const day = Date.now();
            const taskTime = this.setTime(this.time).getTime();
            const body ={
                task: this.value,
                time: { seconds: Math.floor(taskTime / 1000), "nanoseconds": 0 },
                isComplete: day > taskTime,
                isActive: false,
                isEdit: false
            };
            this.$emit("save", body);
        },
        editItem(id){
            const body = {
                id: id,
                task: this.value,
                time: this.setTime(this.time)
            }
            this.$emit("updItem", body);
        }
    }
}
</script>

<style lang="scss" scoped>
    .form{
        display: flex;
        align-items: center;
        border: 1px solid #e5e5e5;
        border-radius: 5px;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .form__task{
        flex: 1 0;
    }

    .form__task, .form__time{
        height: 30px;
        padding: 0 0 0 2px;
        font-size: 14px;
        border: none;
    }

    .form__task{
        margin-left: 10px;
    }

    .form__btn{
        height: 30px;
        padding-top: 0px;
        padding-bottom: 0px;
        border: none;
        background: transparent;
        display: flex;
        align-items: center;
        color: blue;
    }
</style>
