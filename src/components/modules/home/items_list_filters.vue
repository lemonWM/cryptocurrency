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
        v-model:value="state.filter"
        style="width: 200px"
        @focus="focus"
        @change="handleFilter"
      >
				<a-select-option value="filter1">By price</a-select-option>
				<a-select-option value="filter2">By market cap</a-select-option>
				<a-select-option value="filter3">Volume in  24hr</a-select-option>
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
				data: [],
				filter: 'Filter by'
			})

			const store = useStore()
     		const currencyItems = computed(() => store.state.currencyList)

			const handleChange = () => {
				
				store.commit('updateSearchFilter', state.value)
			}

			const showAll = () => {
				
				state.value = 'Select one'
				state.filter = 'Filter by'
				store.commit('updateResetFilter', true)
				store.commit('updateSearchFilter', 'Select one')
				store.commit('updateFilterBy', 'Filter by')
			}

			const handleFilter = () => {

				store.commit('updateFilterBy', state.filter)
			}

			watchEffect(() => {

				if(!state.data.length){
					currencyItems.value.forEach((e, i) => {
						
						state.data.push(e.name)
					});
				}
			})

			return {
				state, currencyItems, handleChange, showAll, handleFilter
			};
		},
	});
</script>