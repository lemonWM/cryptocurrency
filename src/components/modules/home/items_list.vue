<template>

    <div v-if="state.loaded" class="preloader-home d-flex">
        <a-spin></a-spin>
    </div>

    <div v-else class="currency-list container">

        <div v-if="!state.filtered" class="currency-list-wrapper">
            <a-card title="All currencies list">

                <a-card-grid v-for="item in state.currencyItems" :key="item.id" style="width: 50%; text-align: center">
                    
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
        <div v-else-if="state.filtered">
            
            <a-card title="Selected currency">

                <a-card-grid  style="width: 100%; text-align: center">
                    
                    <div class="currency-item">
                        <div class="currency-item__header d-flex d-row">
                            <p>{{ state.filteredItem.name }}</p>
                            <router-link :to="{name: 'Crypto-single',  params: {id: state.filteredItem.id}}">Details</router-link>
                        </div>
                        <div class="currency-item__details d-flex d-col">
                            <p>{{ state.filteredItem.symbol }}</p>
                            <p>{{ state.filteredItem.priceUsd }} <span>USD</span></p>
                        </div>
                    </div>

                </a-card-grid>
            
            </a-card>
        </div>
    </div>

</template>

<script>
    import { computed, onMounted, reactive, watchEffect } from 'vue'
    import { useStore } from 'vuex'
    import axios from 'axios'


    export default {
        name: "List-currencies",
        setup() {

            const store = useStore()
            const currencyFilter = computed(() => store.state.currencyFilter)
            const resetFilter = computed(() => store.state.resetFilter)

            const state = reactive({
                loaded: true,
                currencyItems: [],
                filtered: false,
                filteredItem: {}
            })

            function changeStore(data) {

                store.commit('updateList', data)

                state.currencyItems = data
            };

            onMounted(() => {
                
                axios.get('https://api.coincap.io/v2/assets')
                .then(response => {  
                    
                    let arr = response.data.data

                    arr.forEach((e, i) => {
    
                        e.priceUsd = parseFloat( e.priceUsd ).toFixed(3)
                    });

                    console.log(arr);

                    changeStore(arr)
                    state.loaded = false
                })
                .catch(e => {
                    console.log(e);
                })
            });

            watchEffect(() => {

                if(currencyFilter.value) {

                    state.currencyItems.forEach((e) => {

                        if(e.name.toUpperCase() == currencyFilter.value.toUpperCase()){

                            state.filteredItem = e
                            state.filtered = true
                        }
                    });
                };

                if(resetFilter.value == true) {

                    state.filtered = false
                    state.filteredItem = {}
                    store.commit('updateResetFilter', false)
                }
            })

            return {
                changeStore, state
            }
        },

    }
</script>