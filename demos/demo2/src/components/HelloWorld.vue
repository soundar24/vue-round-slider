<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <h2>
      <a href="https://vue.roundsliderui.com/" target="_blank">
        Vue-Round-Slider [v{{version}}]
      </a>
    </h2>

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
  computed: {
    version() {
      return RoundSlider.version;
    }
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
