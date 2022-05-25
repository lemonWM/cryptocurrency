<template>

    <div class="currency-list container">
        <a-card title="Card Title">

            <a-card-grid v-for="item in getCount" :key="item.id" style="width: 33.3333%; text-align: center">
                
                <div class="currency-item">
                    <div class="currency-item__header d-flex d-row">
                        <p>{{ item.name }}</p>
                        <router-link :to="{name: 'Crypto-single',  params: {id: item.id}}">Details</router-link>
                    </div>
                    <div class="currency-item__details d-flex d-col">
                        <p>{{ item.symbol }}</p>
                        <p>{{ item.priceUsd }} <span>USD</span></p>
                    </div>
                </div>

            </a-card-grid>
        
        </a-card>
    </div>

</template>

<script>
    import { computed, onMounted } from 'vue'
    import { useStore } from 'vuex'
    import axios from 'axios'
  

    export default {
        name: "Test",
        setup() {

            const store = useStore()
            const getCount = computed(() => store.state.currencyList)
          

            function changeStore(data) {

                store.commit('updateList', data)
            };

            onMounted(() => {
                
                axios.get('https://api.coincap.io/v2/assets')
                .then(response => {  
                    
                    changeStore(response.data.data)

                    // dodać filtrowanie po store.currencyList
                })
                .catch(e => {
                    console.log(e);
                })
            });


            return {
                getCount, changeStore
            }
        },

    }
</script>