<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

// 헤더 메뉴 목록
const menuList = [{
    label: '더미 메뉴1',
    value: '',
  }, {
    label: '더미 메뉴2',
    value: '',
  }
]
</script>

<template>
  <header class="header-wrapper ">
    <div class="header-row flex items-center justify-between px-3 py-2">
      <div class="to-home flex items-center gap-3 cursor-pointer select-none">
        <div class="profile-frame w-6 h-6 rounded-full">
          <a href="/">
            <img 
              class="crow-profile w-6 h-6" 
              src="../assets/Dream_Background.jpg" />
          </a>
        </div>
      </div>
      <NavigationMenu class="menu-list flex items-center gap-4">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/"
              class="menu cursor-pointer select-none text-stone-200 no-underline" 
              :class="navigationMenuTriggerStyle()"
              v-for="menu of menuList" 
              :key="menu.label">
              {{ menu.label }}
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <DarkMode />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
    <div class="header-row slot">
      <slot></slot>
    </div>
  </header>
</template>

<style scoped>

header {
  z-index: 10;
  width: 100%;
  box-sizing: border-box;
}
.header-row {
  border-bottom: 1px solid rgba(84, 84, 84, 1);
}
.profile-frame {
  overflow: hidden;
  transition: 0.2s;
}
.crow-profile {
  object-fit: cover;
  object-position: 50% 0%;
  transition: 0.2s;
}
.header-row.slot {
  display: none;
}
@media screen and (max-width: $media-toc) {
  .header-row.slot {
    display: block;
  }
}


</style>