<template>
  <div class="popup w-full absolute top-0">
    <div class="popup__title">new group</div>
    <div class="popup__body relative">
      <form>
        <ui-input
          v-model="search"
          classNames="firstInput rounded-full bg-gray-100 border"
          type="search"
          required
          placeholder="Group name"
        />
        <div class="mt-3">
          <ui-input
            @focus="toggleContactList"
            @blur="toggleContactList"
            v-model="search"
            classNames=" rounded-full bg-gray-100 border"
            type="search"
            required
            placeholder="To :"
          />
          <!-- Contact List -->
          <ul class="mt-1 absolute w-full text-black popup" v-show="!true">
            <li
              @click="pushAUser(user)"
              v-for="user in filteredUsers"
              :user="user"
              :key="user.id"
              class="theme-list rounded-lg flex flex-no-wrap items-center cursor-pointer px-2 py-2"
            >
              <avater size="xs" classNames="mr-3" :name="user.name" img="" />
              <div class="flex flex-1 justify-between">
                <h2 class="text-sm">{{ user.name }}</h2>
              </div>
            </li>
          </ul>
        </div>
        <ui-button classNames="w-full mt-3 bg-gray-300 text-gray-500">Create</ui-button>
      </form>
    </div>
  </div>
</template>

<script>
import AvaterVue from '@/components/base/Avater.vue'
import InputVue from '../base/Input.vue'
import ButtonVue from '@/components/base/Button.vue'
import ActiveItem from './ActiveItem.vue'
import SelectVue from '@/components/base/Select.vue'
import gql from 'graphql-tag'

export default {
  data() {
    return {
      search: '',
      showContactList: false,
      users: [],
      newCha: {
        title: '',
        userNames: '',
        usersIds: []
      }
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
    // document.querySelector('.firstInput').focus()
  },
  methods: {
    pushAUser(user) {
      // this.newChat.usersIds.push(user)
      console.log('focked')
      // console.log(user)
      // this.$emit('onStartNewGroupChat', user)
    },
    toggleContactList(e) {
      console.log(e)
      this.showContactList = !this.showContactList
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
    uiInput: InputVue,
    uiButton: ButtonVue,
    uiSelect: SelectVue
  }
}
</script>

<style></style>
