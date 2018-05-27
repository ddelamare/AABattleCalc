Vue.component('number-stepper', {
    template: `
    <div>
        <button class="btn btn-sm col-xs-2" v-on:click="internalValue -= 1">-</button>
            <span class="col-xs-8">
                <input class="form-control" type="text" v-model="internalValue"/>
            </span>
        <button class="btn btn-sm col-xs-2" v-on:click="internalValue += 1">+</button>
    </div>`,
    props: ['value','id','update'],
    data: function () {
        return {
            internalValue:  0
        }
    },
    created: function () {
        this.internalValue = this.value;
    },
    watch: {
        internalValue: {
            handler: function (oldVal, newVal) {
            if (this.update)
                    this.update(this.id, this.internalValue);
            this.internalValue = parseInt(this.internalValue);
            }
        }
    }
});