<template>
  <div />
</template>

<script>
import $ from 'jquery';
import 'round-slider';

export default {
  name: 'RoundSlider',

  props: {
    // Basic props (frequently used)
    min: {
      type: [String, Number],
      default: 0
    },
    max: {
      type: [String, Number],
      default: 100
    },
    step: {
      type: [String, Number],
      default: 1
    },
    value: {
      type: [String, Number],
      default: null
    },
    radius: {
      type: [String, Number],
      default: 105
    },
    width: {
      type: [String, Number],
      default: 20
    },
    lineCap: {
      type: String,
      default: "butt",
      validator(cap) {
        return validateProp('lineCap', cap);
      },
    },
    startAngle: {
      type: [String, Number],
      default: 0
    },
    endAngle: {
      type: [String, Number],
      default: "+360"
    },

    // UI appearance related props
    borderWidth: {
      type: [String, Number],
      default: 0
    },
    borderColor: {
      type: String,
      default: "inherit"
    },
    pathColor: {
      type: String,
      default: "#EEE"
    },
    rangeColor: {
      type: String,
      default: "#69F"
    },
    tooltipColor: {
      type: String,
      default: "inherit"
    },

    // Behaviour related props
    sliderType: {
      type: String,
      default: "min-range",
      validator(type) {
        return validateProp('sliderType', type);
      },
    },
    circleShape: {
      type: String,
      default: "full",
      validator(shape) {
        return validateProp('circleShape', shape);
      },
    },
    animation: {
      type: [String, Boolean],
      default: true
    },
    readOnly: {
      type: [String, Boolean],
      default: false
    },
    disabled: {
      type: [String, Boolean],
      default: false
    },

    // Miscellaneous
    handleSize: {
      type: [String, Number],
      default: "+0"
    },
    handleShape: {
      type: String,
      default: "round",
      validator(shape) {
        return validateProp('handleShape', shape);
      },
    },
    showTooltip: {
      type: [String, Boolean],
      default: true
    },
    editableTooltip: {
      type: [String, Boolean],
      default: true
    },
    keyboardAction: {
      type: [String, Boolean],
      default: true
    },
    mouseScrollAction: {
      type: [String, Boolean],
      default: false
    },

    // Usecase related props
    startValue: {
      type: [String, Number],
      default: null
    },

    // Events
    create: {
      type: Function,
      default: null,
    },
    beforeValueChange: {
      type: Function,
      default: null,
    },
    change: {
      type: Function,
      default: null,
    },
    update: {
      type: Function,
      default: null,
    },
    valueChange: {
      type: Function,
      default: null,
    },
    tooltipFormat: {
      type: Function,
      default: null,
    }
  },

  computed: {
    control() {
      return $(this.$el);
    },

    instance() {
      return this.control.data('roundSlider');
    },

    allProps() {
      if (this.$props) {
        return this.$props;
      }
      // for the vue lower versions
      const keys = Object.keys(this.$options.props);
      const props = keys.reduce((propsObj, key) => {
        const obj = {};
        obj[key] = this[key];
        return Object.assign(propsObj, obj);
      }, {});
      return props;
    }
  },

  mounted() {
    // below are the default props to overwrite from base roundSlider
    const defaultProps = {
      svgMode: true
    };
    // merge the actual props witht the default props then initialize the component
    const options = Object.assign(defaultProps, this.allProps);

    this.control
      .roundSlider(options)
      .on("update", ({ value }) => {
        this.$emit('input', value);
      });

    // all the props from round-slider will support the one-way data binding
    // so, watch all the props for the changes to reflect in the component
    this.watchProps();
  },

  destroyed() {
    this.control.roundSlider("destroy");
  },

  methods: {
    watchProps() {
      // whenever the prop changed, update the prop with the base 'roundSlider' component
      const props = Object.keys(this.allProps);
      props.forEach((prop) => {
        this.$watch(prop, value => {
          this.updateProp(prop, value);
        });
      }, this);
    },

    updateProp(prop, value) {
      this.instance.option(prop, value);
    },
  }
  
}

// the possible values for the string type props
// #: later this can be imported from the base roundSlider
const possibleValues = {
  lineCap: ['butt', 'round', 'square', 'none'],
  sliderType: ['min-range', 'range', 'default'],
  circleShape: [
    "full", "pie", "half-top", "half-bottom", "half-left", "half-right",
    "quarter-top-left", "quarter-top-right", "quarter-bottom-right", "quarter-bottom-left"
  ],
  handleShape: ["round", "square", "dot"]
}

const validateProp = (prop, value) => {
  const allValues = possibleValues[prop];
  if (allValues.indexOf(value) === -1) {
    const msg = `custom validator check failed for prop "${prop}" with value "${value}"`;
    const info = `\n\n---> The possible values are \n\t\t* ${allValues.join('\n\t\t* ')}\n\n`;
    console.error(("[Vue warn]: Invalid prop: " + msg + info));
  }
  return true;
}
</script>

<style src='../node_modules/round-slider/dist/roundslider.min.css'></style>

<style>
  /* some UI customization of roundSlider for Vue */
  /* #: later this can be applied for base component also */

  .rs-handle {
    background-color: #f3f3f3;
    box-shadow: 0px 0px 4px 0px #000;
  }

  .rs-tooltip-text {
    font-size: 26px;
    font-weight: 500;
    font-family: Avenir, Tahoma, Verdana , sans-serif;
  }

  .rs-animation .rs-transition {
    transition: all 0.5s ease-in-out 0s;
  }

  .rs-tooltip.rs-hover, .rs-tooltip.rs-edit:hover {
    border: 1px solid #cacaca;
  }
</style>
