<template>
    <div class="single-currency-wrapper">
        <a-card title="" style="">
            <p>{{ state.currency.name }} <span>{{ state.currency.symbol }}</span></p>
        </a-card>
    </div>
</template>

<script>
    import { reactive, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import axios from 'axios'

    export default {
        props: ['id', 'name'],
        name: 'currency-single',

        setup() {
            const route = useRoute()
            
            const state = reactive({
                currency: {}
            })
            const currencySingle = route.params.id
            
            onMounted(() => {
                
                axios.get(`https://api.coincap.io/v2/assets/${currencySingle}`)
                .then(response => {  
                    
                    state.currency = response.data.data

                })
                .catch(e => {
                    console.log(e);
                })
            });

            return {
                state
            }
        }

    }

</script>