<template>
  <div class="w-full mx-3 relative">
    <div class="absolute bg-white w-full z-50 mt-0 drop-shadow rounded p-2">
      <ui-input
        v-model="search"
        classNames="newChatDlgInput my-1 rounded-full bg-gray-200 border"
        type="search"
        required
        placeholder="To :"
      />
      <div class="mt-2 text-black">
        <li
          @click="emitStartNewChat(user)"
          v-for="user in filteredUsers"
          :user="user"
          :key="user.id"
          class="theme-list rounded-lg flex flex-no-wrap items-center cursor-pointer px-3 py-2"
        >
          <avater size="xs" classNames="mr-3" :name="user.name" img="" />
          <div class="flex flex-1 justify-between">
            <h2 class="text-sm">{{ user.name }}</h2>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import AvaterVue from '@/components/ui-elements/Avater.vue'
import InputVue from '../ui-elements/Input.vue'
import ActiveItem from './ActiveItem.vue'
import gql from 'graphql-tag'

export default {
  data() {
    return {
      search: '',
      users: []
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(
        user => user.name.includes(this.search) || user.username.includes(this.search)
      )
    }
  },

  mounted() {
    document.querySelector('.newChatDlgInput').focus()
  },
  methods: {
    emitStartNewChat(user) {
      this.$emit('onStartNewChat', user)
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
    ActiveItem,
    avater: AvaterVue,
    uiInput: InputVue
  }
}
</script>

<style></style>
