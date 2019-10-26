<template>
  <ul class="flex flex-col mt-3 w-full list-reset select-none">
    <ActiveItem lastTime="Mon" :user="user" v-for="user in users" :key="user.id" />
  </ul>
</template>

<script>
import ActiveItem from './ActiveItem.vue'
import gql from 'graphql-tag'

export default {
  data() {
    return {
      users: []
    }
  },
  apollo: {
    users: gql`
      query users {
        users {
          id
          name
          username
        }
      }
    `
  },
  components: {
    ActiveItem
  }
}
</script>

<style></style>
