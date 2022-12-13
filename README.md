# vue3-directive-shepherd

This is a Vue3 wrapper for the [Shepherd](https://github.com/shipshapecode/shepherd) using Vue directives

## Installation

`npm install vue3-directive-shepherd`

## Usage

Add plugin

```javascript
import { createApp } from 'vue';
import Vue3DirectiveShepherd from 'vue3-directive-shepherd';
import 'shepherd.js/dist/css/shepherd.css';
import router from "./router";

const options = {
  router,
  tourMap: {
    myCustomTour: {
      useModalOverlay: true,
    }
  }
}

const app = Vue.createApp({})
app.use(router)
app.use(Vue3DirectiveShepherd, options)
app.mount('#app')
```

### Init Options
|key|description|options|
|:---|---|---|
| `router` | Instance of VueRouter | Router |
| `tourMap` | Map of tours. Key is a name of tour. Value is [Tour options](https://shepherdjs.dev/docs/Tour.html) | key:&nbsp;String, value:&nbsp;Shepherd.Tour.TourOptions |

Use directives ```v-tour:[stepNumber]="directiveOptions"```

```vue
<template>
  <div>
    <some-component
      v-tour-step:1="{
        tour: myCustomTour,
        options: {
          attachTo: { on: 'bottom' },
          text: 'Test',
          buttons: [
            {
              text: 'Next',
              action: myCustomTour.next,
            },
          ],
        }
      }"
    >
        First Step
    </some-component>
    <some-component
      v-tour-step:2="{
        tour: myCustomTour,
        options: {
          attachTo: { on: 'top' },
          text: 'Test2',
          buttons: [
            {
              text: 'Stop',
              action: myCustomTour.cancel,
            },
          ],
        }
      }"
    >
        Second Step
    </some-component>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    mounted(){
      this.myCustomTour.start();
    }
  });
</script>
```

### Directive Options
|key|description|options|
|:---|---|---|
| `tour` | Instance of Shepherd Tour. Available as a global property in VueComponent | Shepherd.Tour |
| `options` | [Step options](https://shepherdjs.dev/docs/Step.html) | Step.StepOptions |

**Note:** In options attachTo.element is not required as it is filled in inside the directive

## routerPush
A new ***routerPush*** method has been added to Tour. It can be used when moving between routes
```vue
<some-component
  v-tour-step:3="{
    tour: myCustomTour,
    options: {
      attachTo: { on: 'bottom' },
      text: 'Test2',
      beforeShowPromise,
      buttons: [
        {
          text: 'Next',
          action: () => {
            myCustomTour.routerPush({name: 'myNextRoute'}, myCustomTour.next)
          },
       },
    ],
  }
  }"
/>
```
### routerPush Options
|key|description|options|
|:---|---|---|
| `route` | route location | RouteLocationRaw |
| `cb` | The function that will be called at the end of the routing | () = void |

## Demo

[Codesanbox example](https://codesandbox.io/s/focused-hofstadter-v6uicy)
