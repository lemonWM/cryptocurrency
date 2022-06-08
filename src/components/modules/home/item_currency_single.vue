<template>
    <div class="single-currency-wrapper">
        <div class="single-currency-wrapper__header container">
            <a-card title="" style="">
                <p>{{ state.currency.name }} <span>{{ state.currency.symbol }}</span></p>
                <p><span>Current price: </span>{{ state.currency.priceUsd }} <span>USD</span></p>
            </a-card>
        </div>
        <div class="single-currency-wrapper__bar container">
            <a-radio-group v-model:value="state.period" @change="selectPeriod">
                <a-radio-button value="y" loading>Years</a-radio-button>
                <a-radio-button value="d">Days</a-radio-button>
                <a-radio-button value="h">Hours</a-radio-button>
            </a-radio-group>
        </div>
        <div class="single-currency-wrapper__details">

            <div v-if="state.period == 'y'" class="canva_1">
                <canvas id="myChart" width="80vw" height="300"></canvas>
            </div>
            <div v-else-if="state.period == 'd'" class="canva_2">
                <canvas id="myChart2" width="80vw" height="300"></canvas>
            </div>
            <div v-else-if="state.period == 'h'" class="canva_3">
                <canvas id="myChart3" width="80vw" height="300"></canvas>
            </div>

        </div>
    </div>

</template>

<script>
    import { reactive, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import axios from 'axios'
    import Chart from 'chart.js/auto';
    import zoomPlugin from 'chartjs-plugin-zoom'


    Chart.register(zoomPlugin)

    export default {
        name: 'currency-single',

        setup() {
            const route = useRoute()
            
            const state = reactive({
                period: 'y',
                currency: {},
                currencyDetails: [],
                currencyValues: [],
                currencyDates: []
            })
            const currencySingle = route.params.id
            
            let myChart = null

            const selectPeriod = function(){
                
                if(state.period == 'y'){

                    getCurrentDetailsY()
                }
                else if(state.period == 'd') {
                    
                    getCurrentDetailsD()
                }
                else {
                    getCurrentDetailsH()
                }

            }

            const getCurrent = function(){

                axios.get(`https://api.coincap.io/v2/assets/${currencySingle}`)
                .then(response => {  
                    
                    state.currency = response.data.data
                    state.currency.priceUsd = parseFloat( state.currency.priceUsd ).toFixed(3)
                })
                .catch(e => {
                    console.log(e);
                })
            }

            const getCurrentDetailsY = function(){
                
                axios.get(`https://api.coincap.io/v2/assets/${currencySingle}/history?interval=d1`)
                .then(response => {  
                    
                    let arr = []

                    arr = response.data.data

                    state.currencyDetails = arr

                    chartData('myChart');
                })
                .catch(e => {
                    console.log(e);
                })
            };

            const getCurrentDetailsD = function(){

                axios.get(`https://api.coincap.io/v2/assets/${currencySingle}/history?interval=h1`)
                .then(response => {  
                    
                    let arr = []

                    arr = response.data.data

                    state.currencyDetails = arr

                    chartData('myChart2');
                })
                .catch(e => {
                    console.log(e);
                })
            }
            const getCurrentDetailsH = function(){

                axios.get(`https://api.coincap.io/v2/assets/${currencySingle}/history?interval=m1`)
                .then(response => {  
                    
                    let arr = []

                    arr = response.data.data

                    state.currencyDetails = arr

                    chartData('myChart3');
                })
                .catch(e => {
                    console.log(e);
                })
            }

            const chartData = function(chart) {

                state.currencyValues = []
                state.currencyDates = []

                state.currencyDetails.forEach((x, i) => {
                    let value = parseInt(x.priceUsd),
                        miliseconds = x.time,
                        dateObj = new Date(miliseconds),
                        month = dateObj.getUTCMonth() + 1,
                        day = dateObj.getUTCDate(),
                        year = dateObj.getUTCFullYear(),
                        fullDate = year + "/" + month + "/" + day;

                    state.currencyValues.push(value)
                    state.currencyDates.push(fullDate)                    
                });
         
                if (myChart != null) {
                    myChart.destroy()
                }
                const ctx = document.getElementById(`${chart}`);

                myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: state.currencyDates,
                    datasets: [{
                        label: '',
                        data: state.currencyValues,
                        backgroundColor: ['rgba(25, 31, 56,1)'],
                        borderColor: ['rgba(25, 31, 56,1)'],
                        borderWidth: 2,
                        tension: .5
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false
                        },
                        x: {
                            beginAtZero: true
                        },
                    },
                    plugins: {
                        zoom: {
                            zoom: {
                                wheel: {
                                    enabled: true,
                                },
                                pinch: {
                                    enabled: true
                                },
                                mode: 'xy',
                                },
                            animation: {
                                duration: 1000,
                                easing: 'easeOutCubic'
                            },
                            limits: {
                                x: {min: 0,  minRange: 50},
                                y: {min: 0,  minRange: 50}
                            },
                        }
                    },
                    layout: {
                        padding: 0
                    }
                }
            });
        } 
            
        onMounted(() => {
                
            getCurrent();
            getCurrentDetailsY();
            
        });

        return {
            state, selectPeriod
        }
    }
} 
</script>