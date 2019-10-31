<template>
  <div class="popup w-full">
    <div class="popup__title">new group</div>
    <div class="popup__body py-2">
      <form @submit.prevent="handleSubmit">
        <div class="flex">
          <base-input
            required
            type="text"
            id="firstInput"
            @focus="showContactList = false"
            placeholder="Group name "
            v-model="title"
            class="rounded-full bg-gray-100 border"
          />
          <ui-button class="ml-2">Create</ui-button>
        </div>
        <div class="mt-4 relative">
          <base-input
            type="text"
            placeholder="To :"
            v-model="search"
            @focus="showContactList = true"
            class="rounded-full bg-gray-100 border"
            tabindex="0"
          />
          <!-- @blur="toggleContactList" -->
          <!-- Contact List -->
          <ul class="mt-1 absolute w-full text-black popup" v-show="showContactList">
            <li
              v-for="user in selectedUsers"
              :user="user"
              :key="user.id"
              class="theme-list flex flex-no-wrap items-center cursor-pointer px-3 py-2"
            >
              <div @click="user.selected = false" class="flex flex-1">
                <avater size="xs" classNames="mr-3" :name="user.name" img="" />
                <h2 class="text-sm">{{ user.name }}</h2>
              </div>

              <base-select classNames="">
                <input v-model="user.selected" type="checkbox" />
              </base-select>
            </li>

            <hr class="my-4 border-gray-300" v-show="selectedUsers.length" />
            <!-- ------------------------------------------------- -->
            <li
              v-for="user in filteredUsers"
              :user="user"
              :key="user.id"
              class="theme-list flex flex-no-wrap items-center cursor-pointer px-3 py-2"
            >
              <div @click="user.selected = true" class="flex flex-1">
                <avater size="xs" classNames="mr-3" :name="user.name" img="" />
                <h2 class="text-sm">{{ user.name }}</h2>
              </div>

              <base-select classNames="">
                <input v-model="user.selected" type="checkbox" />
              </base-select>
            </li>
          </ul>
        </div>
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
      title: '',
      search: '',
      showContactList: false,
      users: []
    }
  },
  computed: {
    selectedUsers() {
      return this.users.filter(user => user.selected)
    },
    notSelected() {
      return this.users.filter(user => !user.selected)
    },
    filteredUsers() {
      return this.notSelected.filter(
        user => user.name.includes(this.search) || user.username.includes(this.search)
      )
    }
  },

  mounted() {
    document.getElementById('firstInput').focus()
  },
  methods: {
    toggleContactList() {
      this.showContactList = !this.showContactList
    },
    handleSubmit() {
      if (this.title && this.selectedUsers.length) {
        const userIds = this.selectedUsers.map(user => {
          // unselect the user
          user.selected = false
          return user.id
        })
        this.$emit('submit', { title: this.title, userIds })
      } else {
        console.log('input is empty')
      }
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
    baseInput: InputVue,
    uiButton: ButtonVue,
    baseSelect: SelectVue
  }
}
</script>

<style></style>
