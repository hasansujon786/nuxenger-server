<template>
  <div
    class="flex flex-wrap items-start content-start border-r border-gray-400 h-full"
    style="width: 400px"
  >
    <!-- head -->
    <div class="head h-16 w-full items-center flex px-3">
      <avater
        size="sm"
        :name="$store.getters['auth/authUser'].name"
        classNames="ml-2"
        tabindex="0"
        title="Hasan Mahmud"
      />
      <h1 class="font-bold text-3xl -mt-2 ml-3">{{ shwoRecent ? 'nuxanger' : 'active' }}</h1>

      <icon-btn @click="startNewChat" class="ml-auto" icon="plus"></icon-btn>
      <icon-btn @click="shwoRecent = !shwoRecent" class="ml-3" title="Active Users" icon="zap" />
      <div class="relative ml-3">
        <icon-btn @click="showDropdown = !showDropdown" icon="menu" title="Toggle Recents" />
        <dropdown
          :dropdown="dropdown"
          v-if="showDropdown"
          @option-click="handleDropdownClick"
          styleProps="top: 3rem; left: -5px"
        />
      </div>
    </div>

    <!-- search -->
    <recent-search class="mx-3" />

    <!-- recent -->
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

export default {
  data() {
    return {
      dropdown: [
        {
          title: 'Settings',
          options: ['logout']
        }
      ],
      shwoRecent: true,
      showDropdown: false,
      me:
        'https://lh3.googleusercontent.com/-DoXIeeE3Xdg/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcqk8rkbQb4n-Bd-9lUetaYfj_97g/photo.jpg?sz=46'
    }
  },
  methods: {
    ...mapActions({
      signOut: 'auth/signOut'
    }),
    handleDropdownClick(dropdownOption) {
      console.log('clicked', dropdownOption)
      this.showDropdown = false
      switch (dropdownOption) {
        case 'logout':
          this.signOut()
          break

        case value:
          break

        default:
          break
      }
    },
    startNewChat() {
      console.log('clicked')
    }
  },
  components: {
    RecentItemList,
    recentSearch: RecentSearchVue,
    iconBtn: IconBtnVue,
    avater: AvaterVue,
    dropdown: DropdownVue,
    ActiveUserList
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
