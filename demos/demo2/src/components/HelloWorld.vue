<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Vue-Round-Slider</h3>
    <div class="box">
      <round-slider
        v-model="sliderValue"
      >
      </round-slider>
    </div>

    <h3>Text Element</h3>
    <div>{{sliderValue}}</div>

    <h3>Input Element</h3>
    <input v-model="sliderValue" />
  </div>
</template>

<script>
import RoundSlider from 'vue-round-slider';

export default {
  name: 'HelloWorld',
  components: {
    RoundSlider,
  },
  props: {
    msg: String
  },
  data() {
    return {
      sliderValue: 60
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.box {
  padding: 10px;
  display: inline-block;
}
</style>
