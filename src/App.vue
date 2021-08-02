<template>
  <v-app>
    <div class="main">
      <router-view />
    </div>
  </v-app>
</template>

<script>
/* eslint-disable */
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat|Oswald|Roboto|Kanit');
* {
  font-family: 'Montserrat', Oswald, Roboto, sans-serif;
}

.main {
  display: flex;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(155, 180, 178, 1) 100%
  );
  height: 100%;
  align-items: center;
}
.v-data-table-header-mobile {
  display: none;
}
.v-data-table tbody tr:hover:not(.v-data-table__expanded__content) {
  background: rgba(155, 180, 178, 0.3) !important;
}
.v-btn__content {
  font-size: 0.7rem;
  font-weight: normal;
}
</style>
