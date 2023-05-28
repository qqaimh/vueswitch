<template>
  <div id="app">
     <!---
    <div v-switch="validateUrl" class="validateUrl">
      <p v-case="'validating'">Checking Url...</p>
      <p v-case="'validated'">Valid</p>
      <p v-default>Default</p>
    </div>

    <input type="radio" id="validating" value="validating" v-model="validateUrl">
    <label for="validating">Validating</label><br>

    <input type="radio" id="validated" value="validated" v-model="validateUrl">
    <label for="validated">Validated</label><br>

    <input type="radio" id="''" value="''" v-model="validateUrl">
    <label for="''">Default</label>

    <hr>
--->
   
    <div v-switch-show="size">
      <h1 v-case-show="['large', 'he']">Large</h1>
      <h2 v-case-show="['medium','she']">Medium</h2>
      <h3 v-case-show="['small']">Small</h3>
      <h3 v-default-show>default</h3>
    </div>


    <input type="radio" id="small" value="small" v-model="size">
    <label for="small">Small</label><br>

    <input type="radio" id="medium" value="medium" v-model="size">
    <label for="medium">Medium</label><br>

    <input type="radio" id="large" value="large" v-model="size">
    <label for="large">Large</label>

    <input type="radio" id="he" value="he" v-model="size">
    <label for="he">he</label>

    <input type="radio" id="she" value="she" v-model="size">
    <label for="she">she</label>

    <input type="radio" id="it" value="it" v-model="size">
    <label for="it">it</label>


    <div v-switch="size">
      <h1 v-case="['large', 'he']">Large</h1>
      <h2 v-case="['medium','she']">Medium</h2>
      <h3 v-case="['small']">Small</h3>
      <h3 v-default>default</h3>
    </div>
    
    <hr>

    <h4>Installation:</h4>
    <pre>
      <code>
        Install:
        npm install v-switch-case
      </code>
    </pre>

    <h4>Use (global):</h4>
    <pre>
      <code>

        HTML:
        &lt;div v-switch="size"&gt;
          &lt;h1 v-case="'large'"&gt;Large Heading&lt;h1&gt;
          &lt;h2 v-case="'medium'"&gt;Medium Heading&lt;h2&gt;
          &lt;h4 v-case="'small'"&gt;Small Heading&lt;h3&gt;
          &lt;h4 v-default&gt;Small Heading&lt;h3&gt;
        &lt;/div&gt;

        Vue:
        &lt;script&gt;
          import Vue from 'vue'
          import VSwitch from 'v-switch-case'

          Vue.use(VSwitch)

          export default {
            data() {
              return {
                size: 'medium'
              }
            }
          }
        &lt;/script&gt;

      </code>
    </pre>

    <h4>Use (individual directives):</h4>
    <pre>
      <code>

        HTML:
        &lt;div v-switch="size"&gt;
          &lt;h1 v-case="'large'"&gt;Large Heading&lt;h1&gt;
          &lt;h2 v-case="'medium'"&gt;Medium Heading&lt;h2&gt;
          &lt;h4 v-case="'small'"&gt;Small Heading&lt;h3&gt;
          &lt;h4 v-default&gt;Small Heading&lt;h3&gt;
        &lt;/div&gt;

        Vue:
        &lt;script&gt;
          import { vSwitch, vCase, vDefault } from 'v-switch-case'

          export default {
            directives: {
              'switch': vSwitch,
              'case': vCase,
              'default': vDefault
            },

            data() {
              return {
                size: 'medium'
              }
            }
          }
        &lt;/script&gt;

      </code>
    </pre>

  </div>
</template>

<script>
import Vue from 'vue'
import VSwitchShow from './v-switch-show'
import VSwitch from './v-switch'
import MyIf from './v-if'

Vue.use(VSwitchShow)
Vue.use(VSwitch)
Vue.use(MyIf)
export default {
  name: 'app',

  data() {
    return {
      validateUrl: 'validating',
      size: 'medium'
    }
  }
}
</script>

<style scoped>
.block {
  position: absolute;
  border: 1px solid black;
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.demo-outer {
  margin: 5px;
  height: 200px;
  border: 1px dashed black;
}
</style>
