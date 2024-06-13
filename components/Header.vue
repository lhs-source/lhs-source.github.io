<script setup lang="ts">
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
  <header class="header-wrapper">
    <div class="header-row">
      <div class="to-home">
        <div class="profile-frame">
          <img class="crow-profile" src="../assets/Dream_Background.jpg" />
        </div>
        <span>내가 만든 블로그~</span>
      </div>
      <div class="menu-list">
        <div class="menu" v-for="menu of menuList" :key="menu.label">
          {{ menu.label }}
        </div>
      </div>
    </div>
    <div class="header-row slot">
      <slot></slot>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import '/src/pages/post.scss';
// variables 임시
$color-text-lighter: rgba(255, 255, 255, .92);
$color-text-normal: rgba(255, 255, 255, .87);
$color-text-darker: rgba(235, 235, 235, .6);

$vue-color-green: #42b883;
$vue-color-blue: #35495e;

header {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: #242424;
}
.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 2px dotted rgba(84, 84, 84, 1);
  &.mobile {

  }
}
// 블로그 제목 + 메인으로 이동하기
.to-home {
  display: flex;
  align-items: center;
  column-gap: 12px;
  cursor: pointer;
  user-select: none;

  .profile-frame {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    transition: 0.2s;

    .crow-profile {
      width: 32px;
      height: 32px;
      object-fit: cover;
      object-position: 50% 0%;
      transition: 0.2s;
    }
  }

  span {
    font-weight: 700;
  }

  &:hover {
    .profile-frame {
      scale: 1.2;

      .crow-profile {
        scale: 1.1;
      }
    }
  }
}

.menu-list {
  display: flex;
  align-items: center;
  column-gap: 16px;
  .menu {
    cursor: pointer;
    user-select: none;
    transition: color 0.3s;
    &:hover {
      color: $vue-color-green;
    }
  }
}

// 960이하에서 slot 항목이 나타난다.
.header-row.slot {
  display: none;
}
@media screen and (max-width: $media-toc) {
  .header-row.slot {
    display: block;
  }
}


</style>