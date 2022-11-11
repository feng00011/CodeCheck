<template>
  <div id="fatherBox">
    <div id="mask" v-if="showMask"></div>
    <!-- 遮盖层，接收ProfilePart传来的数据 -->
    <div id="code">
      <codemirror v-model="code" :options="cmOption" class="code" ref="myCm" />
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import dedent from "dedent";
import { codemirror } from "vue-codemirror";

// language
import "codemirror/mode/python/python.js";

// theme css
import "codemirror/theme/base16-light.css";

// require active-line.js
import "codemirror/addon/selection/active-line.js";

// closebrackets
import "codemirror/addon/edit/closebrackets.js";

// keyMap
import "codemirror/mode/clike/clike.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/comment/comment.js";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";
import "codemirror/keymap/emacs.js";

export default {
  name: "codemirror-example-python",
  title: "Mode: text/x-python & Theme: base16-light",
  components: {
    codemirror,
  },
  props: ["showMask"],
  data() {
    return {
      cmOption: {
        autoCloseBrackets: true,
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: "text/x-python",
        theme: "base16-light",
        keyMap: "emacs",
      },
      code: dedent`# input code here`,
    };
  },
  methods: {
    updateCode: _.debounce(function () {
      let res = { code: this.code };
      res = JSON.stringify(res);
      this.$store.dispatch("updateCode", res);
    }, 1000),
  },
  watch: {
    code: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.updateCode();
        });
      },
    },
  },
  mounted(){
    let that = this;
    that.clientHeight = `${document.documentElement.clientHeight}`;//获取浏览器可视区域高度
    // // 获取codemirror对象
    that.editor = this.$refs.myCm.codemirror;
    // // 设置codemirror高度
    that.editor.setSize('auto',this.clientHeight-45);
    
    // 监听屏幕
    window.onresize = function () {
      that.clientHeight = `${document.documentElement.clientHeight}`;
      // 设置代码区域高度
      that.editor.setSize('auto',parseFloat(that.clientHeight)-45);
    }

  
  }
};
</script>
<style lang="css" scoped>
.fatherBox {
  position: relative;
}
#mask {
  width: 50%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.6;
  background-color: black;
  position: absolute;
  z-index: 998;
}
#code {
  /* height: 800px; */
  background-color: fff;
}
</style>
