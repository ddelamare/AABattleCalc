Vue.component('number-stepper', {
    template: `
    <div>
        <button class="btn btn-sm col-xs-2" v-on:click="value -= 1">-</button>
            <span class="col-xs-8">
                <input class="form-control" type="text" v-model="value"/>
            </span>
        <button class="btn btn-sm col-xs-2" v-on:click="value += 1">+</button>
    </div>`,
    props: ['value']
});