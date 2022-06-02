<template>
    <div>
        {{ state.news }}
    </div>
</template>

<script>
    import { reactive, onMounted } from 'vue'
    import axios from 'axios'

    export default {
        name: 'news',

        setup() {
            
            const state = reactive({
                news: []
            })
            
            const getNews = () =>{

                console.log(import.meta.env.VITE_APP_CR_HASH)

                const hash = import.meta.env.VITE_APP_CR_HASH

                axios.get(`https://cryptopanic.com/api/v1/posts/?auth_token=${hash}&kind=news`)
                .then(response => {  
                    
                    console.log(response.data);

                    //state.news = response
                })
                .catch(e => {
                    console.log(e);
                })
            }


            onMounted(() => {
                
                getNews() 
            })

            return {
                state
            }
        }
    } 
</script>