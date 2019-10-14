<template>
  <div
    class="flex flex-wrap items-start content-start border-r border-gray-400 h-full"
    style="width: 400px"
  >
    <!-- head -->
    <div class="head h-16 w-full items-center flex px-3">
      <div class="relative">
        <icon-btn @click="showDropdown = !showDropdown" icon="menu" title="Toggle Recents" />
        <dropdown
          :dropdown="dropdown"
          v-if="showDropdown"
          @option-click="handleDropdownClick"
          styleProps="top: 3rem; left: -5px"
        />
      </div>

      <h1 class="font-bold text-3xl -mt-2 ml-3">{{ shwoRecent ? 'nuxanger' : 'active' }}</h1>

      <icon-btn @click="shwoRecent = !shwoRecent" class="ml-auto" title="Active Users" icon="zap" />
      <avater size="sm" :img="me" classNames="ml-2" tabindex="0" title="Hasan Mahmud" />
    </div>

    <!-- search -->
    <recent-search class="mx-3" />

    <!-- recent -->
    <ul v-if="shwoRecent" class="flex flex-col mt-3 w-full list-reset select-none">
      <recent-item class="active" />
      <recent-item />
      <recent-item />
      <recent-item />
      <recent-item />
      <recent-item />
      <recent-item />
    </ul>
    <!-- active -->
    <ul v-else class="flex flex-col mt-3 w-full list-reset select-none">
      <active-item />
      <active-item />
      <active-item />
      <active-item />
      <active-item />
    </ul>
  </div>
</template>

<script>
import RecentItemVue from './RecentItem.vue'
import RecentSearchVue from './RecentSearch.vue'
import ActiveItemVue from './ActiveItem.vue'
import IconBtnVue from '../ui-elements/IconBtn.vue'
import AvaterVue from '../ui-elements/Avater.vue'
import DropdownVue from '../ui-elements/Dropdown.vue'
export default {
  data() {
    return {
      dropdown: [
        {
          title: 'Settings',
          options: ['hasan', 'sujon', 'kuddus', 'logout']
        }
      ],
      shwoRecent: true,
      showDropdown: false,
      me:
        'https://lh3.googleusercontent.com/-DoXIeeE3Xdg/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcqk8rkbQb4n-Bd-9lUetaYfj_97g/photo.jpg?sz=46'
    }
  },
  methods: {
    handleDropdownClick(dropdownOption) {
      console.log('clicked', dropdownOption)
      this.showDropdown = false
      if(dropdownOption === 'logout') {
        this.logout()
      }
    },
    logout() {
      this.$router.push('/')
    }
  },
  components: {
    recentItem: RecentItemVue,
    recentSearch: RecentSearchVue,
    activeItem: ActiveItemVue,
    iconBtn: IconBtnVue,
    avater: AvaterVue,
    dropdown: DropdownVue
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
