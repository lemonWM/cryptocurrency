<template>
	<div class="currency-navigation container">
        <a-button @click="showAll" type="default" shape="round" :size="size">Show all</a-button>

		<a-select
		    v-model:value="state.value"
			show-search
			placeholder="input search text"
			style="width: 200px"
			:default-active-first-option="true"
			:show-arrow="true"
			:filter-option="true"
			:not-found-content="null"
			:options="state.data.map(item => ({ value: item }))"
			@search="handleSearch"
			@change="handleChange"
		></a-select>

        <a-select
            ref="select"
            v-model:value="value1"
            style="width: 200px"
            @focus="focus"
            @change="handleChange"
            >
        <a-select-option value="jack">Top 15 by price</a-select-option>
        <a-select-option value="lucy">Filter by market cap</a-select-option>
        <a-select-option value="Yiminghe">Volume in  24hr</a-select-option>
        </a-select>
	</div>

</template>

<script>
	import { reactive, computed, watchEffect } from 'vue'	
    import { useStore } from 'vuex'
	
	export default ({
		name: 'currenciesFilters',

		setup() {
			
			const state = reactive({
				value: 'Select one',
				data: []
			})

			const store = useStore()
            const currencyItems = computed(() => store.state.currencyList)

			const handleChange = () => {
				
				store.commit('updateSearchFilter', state.value)
			}

            const showAll = () => {

                store.commit('updateResetFilter', true)
            }

			watchEffect(() => {

				if(!state.data.length){
					currencyItems.value.forEach((e, i) => {
						
						state.data.push(e.name)
					});
				}
			})

			return {
				state, currencyItems, handleChange, showAll
			};
		},
	});
</script>