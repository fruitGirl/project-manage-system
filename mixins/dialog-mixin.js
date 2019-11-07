const dialogMixin = {
  props: {
    show: {
      type: Boolean,
      default: false,
      require: true
    }
  },
  data() {
    return {
      isVisible: false
    };
  },
  watch: {
    show(val) {
      this.isVisible = val;
    },
    isVisible(val) {
      this.$emit('update:show', val);
    }
  },
  methods: {
    closeDialog() {
      this.isVisible = false;
    }
  }
};

export default dialogMixin;
