<template>
	<div class="container">
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

			watchEffect(() => {

				if(!state.data.length){
					currencyItems.value.forEach((e, i) => {
						
						state.data.push(e.name)
					});
				}
			})

			return {
				state, currencyItems, handleChange
			};
		},
	});
</script>