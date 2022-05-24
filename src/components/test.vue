<template>
    <div>
        <p>{{ user.name }}</p>
        <button @click="updateName">change</button>
        <p>{{ getCount }}</p>
        <button @click="changeStore">change store</button>
    </div>
</template>

<script>
    import { reactive, ref, computed } from 'vue';
    import { useStore } from 'vuex'

    export default {
        name: "Test",
        setup() {

            const user = reactive({
                name: 'john'
            });
            const store = useStore()
            const getCount = computed(() => store.state.count)

            function updateName() {

                user.name = 'tom'
            };

            function changeStore() {

                store.commit('increment', 10)
            };

            return {
                user, updateName, getCount, changeStore
            }
        },

    }
</script>