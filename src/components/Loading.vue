<template>
  <v-overlay color="grey lighten-3" opacity="0.85" z-index="1000">
    <v-progress-circular
      size="80"
      indeterminate
      color="grey darken-2"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: 'Loading',
};
</script>

<style scoped>
.loading {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
}
.loading span {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 10px;
  background: #64b5f6;
  margin: 4px;
  animation: dots 0.6s cubic-bezier(0.6, 0.1, 1, 0.4) infinite alternate;
}
.loading span:nth-child(1) {
  animation-delay: 0.1s;
}
.loading span:nth-child(2) {
  animation-delay: 0.2s;
}
.loading span:nth-child(3) {
  animation-delay: 0.3s;
}
.loading span:nth-child(4) {
  animation-delay: 0.4s;
}

@keyframes dots {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, 30px, 0);
  }
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 1.3s;
}
.fade-leave-active {
  transition: opacity 1.3s;
}
.fade-leave-to {
  opacity: 0;
}
</style>
