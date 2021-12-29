<template>
  <div class="main">
    <div class="show">
      <router-view replace/>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
}

.dark_mode {
  background-color: #000000;
  color: white;
}

.show {
  margin: 0 auto;
}
</style>
