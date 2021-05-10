<template>
  <div id="app">
    <section class="container is-fullhd"> 
    <router-view/>
    </section>
  </div>
</template>

<style lang="scss">
.has-cursor-pointer {
  cursor: pointer;
}
.has-text-breaked {
  word-break: break-all;
}
.is-clickable {
  cursor: pointer;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.weather-image{
  height: 150px;
    width: 170px;
}
.margin-o-auto {
  margin: 0 auto;
}
.temperature{
      display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-pack: center;
    justify-content: center;
}
.temperature-value {
  font-size: 5em;
}

.temperature-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.temperature-scale {
  font-size: 1em;
  font-weight: bold;
}
.temperature-high img {
  vertical-align: middle;
}

.mperature-low img {
  vertical-align: middle;
}
</style>
