<template>
  <div
    class="flex flex-wrap items-start content-start border-r border-gray-400 h-full"
    style="width: 400px"
  >
    <!-- head -->
    <div class="head h-16 w-full items-center flex px-3">
      <avater
        size="sm"
        classNames="ml-2"
        tabindex="0"
        :name="$store.getters['auth/authUser'].name"
      />
      <h1 class="font-bold text-3xl -mt-2 ml-3">{{ shwoRecent ? 'nuxanger' : 'active' }}</h1>
      <div class="relative ml-auto">
        <icon-btn @click="showNewChatDropdown = !showNewChatDropdown" icon="plus" />
        <dropdown
          v-if="showNewChatDropdown"
          :dropdown="newChatDropdownOptions"
          @option-click="handleDropdownClick"
          styleProps="top: 3rem; left: -5px"
        />
      </div>
      <icon-btn @click="shwoRecent = !shwoRecent" class="ml-3" title="Active Users" icon="zap" />
      <div class="relative ml-3">
        <icon-btn
          @click="showSettingDropdown = !showSettingDropdown"
          icon="menu"
          title="Toggle Recents"
        />
        <dropdown
          v-if="showSettingDropdown"
          :dropdown="settingDropdownOptions"
          @option-click="handleDropdownClick"
          styleProps="top: 3rem; left: -5px"
        />
      </div>
    </div>

    <new-chat-dialog v-if="true" @onStartNewGroupChat="startNewGroupChat" class="mx-3 relative" />

    <!-- search -->
    <recent-search class="mx-3" />

    <!-- recent -->
    <!-- <ul class="flex flex-col mt-3 w-full list-reset select-none">
      <recent-item></recent-item>
    </ul> -->
    <RecentItemList v-if="shwoRecent" />
    <!-- active -->
    <ActiveUserList v-else />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RecentItemList from './RecentItemList.vue'
import ActiveUserList from './ActiveUserList.vue'
import RecentSearchVue from './RecentSearch.vue'
import IconBtnVue from '../ui-elements/IconBtn.vue'
import AvaterVue from '../ui-elements/Avater.vue'
import DropdownVue from '../ui-elements/Dropdown.vue'
import RecentItemVue from './RecentItem.vue'
import NewChatDialogVue from './NewChatDialog.vue'

import { START_GROUP_CHAT_MUTATION, CHAT_SUBSCRIPTION } from '@/gql'

export default {
  data() {
    return {
      showNewChatDialog: false,
      showSettingDropdown: false,
      settingDropdownOptions: [
        {
          title: 'Settings',
          options: ['Secret', 'Logout']
        }
      ],
      showNewChatDropdown: false,
      newChatDropdownOptions: [
        {
          title: 'New',
          options: ['New DM', 'New Group', 'New ChatRoom']
        }
      ],
      shwoRecent: true,
      me:
        'https://lh3.googleusercontent.com/-DoXIeeE3Xdg/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcqk8rkbQb4n-Bd-9lUetaYfj_97g/photo.jpg?sz=46'
    }
  },
  methods: {
    ...mapActions({
      signOut: 'auth/signOut',
      updateChatListOnStore: 'chat/updateChatList'
    }),
    handleDropdownClick(dropdownOption) {
      console.log('clicked', dropdownOption)
      this.showDropdown = false
      switch (dropdownOption) {
        case 'logout':
          this.signOut()
          break

        case 'secret':
          this.$router.push('/secret')
          break

        default:
          break
      }
    },
    toggleNewChatDialog() {
      this.showNewChatDialog = !this.showNewChatDialog
    },
    async startNewGroupChat({ name, id }) {
      this.toggleNewChatDialog()
      try {
        const { data } = await this.$apollo.mutate({
          // Query
          mutation: START_GROUP_CHAT_MUTATION,
          variables: {
            title: name,
            userIds: [id]
          }
        })
      } catch (err) {
        console.log('err in startNewGroupChat', { err })
      }
    }
  },
  apollo: {
    // Subscriptions
    $subscribe: {
      // When a tag is added
      chat: {
        query: CHAT_SUBSCRIPTION,
        variables() {
          return {
            currentUserId: this.$store.getters['auth/authUser'].id
          }
        },
        result({ data }) {
          if (data.chat) {
            this.updateChatListOnStore(data.chat)
          }
        }
      }
    }
  },
  components: {
    RecentItemList,
    ActiveUserList,
    recentSearch: RecentSearchVue,
    iconBtn: IconBtnVue,
    avater: AvaterVue,
    dropdown: DropdownVue,
    recentItem: RecentItemVue,
    newChatDialog: NewChatDialogVue
  }
}
</script>

<style scoped lang="scss">
.sidebar-enter-active,
.sidebar-leave-active {
  transition: margin 0.4s ease-in-out;
}
.sidebar-enter,
.sidebar-leave-to {
  margin-left: -400px;
}
</style>
