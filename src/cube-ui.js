import Vue from 'vue'

// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import {
  /* eslint-disable no-unused-vars */
  Button,
  Slide
} from 'cube-ui'

Vue.use(Button)
Vue.use(Slide)
