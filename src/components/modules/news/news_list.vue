<template>
  
    <div v-if="state.loaded" class="preloader-home d-flex">
        <a-spin></a-spin>
    </div>
    <div v-else class="news-items-wrapper">
      <a-collapse v-for="item in state.news" :key="item.slug" class="item-news">
        <a-collapse-panel key="1" :header=" item.title ">
          <div class="item-news-details">
            <div class="item-news-details__rate">
              <a-row>
                {{ item.source.title }}
              </a-row>
              <a-row>
                <a-statistic title="Likes" :value="item.votes.liked" style="margin-right: 50px">
                  <template #suffix>
                    <like-outlined />
                  </template>
                </a-statistic>
                <a-statistic title="Comments" :value="item.votes.comments" style="margin-right: 50px">
                  <template #suffix>
                    <like-outlined />
                  </template>
                </a-statistic>
                <div class="item-news-details__more">
                  <button>
                    <a :href="item.url">read</a>
                  </button>
                </div>
              </a-row>
            </div>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </div>
</template>

<script>
    import { reactive, onMounted } from 'vue'
    import axios from 'axios'

    export default {
        name: 'news',

        setup() {
            
            const state = reactive({
                news: [],
                loaded: true
            })
            
            const getNews = () =>{

                const hash = import.meta.env.VITE_APP_CR_HASH

                axios.get(`https://cryptopanic.com/api/v1/posts/?auth_token=${hash}&kind=news`)
                .then(response => {  
                    
                    let data = response.data.results

                    state.loaded = false

                    console.log(response.data.results);

                    state.news = data
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