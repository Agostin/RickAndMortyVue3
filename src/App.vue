<template>
  <router-view/>
</template>

<style lang="scss">
@import './assets';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $black;
  height: 100vh;
  background: white;

  .modal.show {
    background: rgba(0,0,0,.4);
  }

  * {
    font-family: -apple-system,'BlinkMacSystemFont','Segoe UI','Roboto','Helvetica','Arial',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';
  }
}
</style>
