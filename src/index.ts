import tourStep from "./tour-step";
import { App } from "vue";
import { RouteLocationRaw, Router } from "vue-router";
import { Tour, TourOptions } from "shepherd.js";

interface tourMap {
  [key: string]: TourOptions
}

interface Options {
  router?: Router
  tourMap: tourMap
}

export type VueShepherdTour = Tour & {
  routerPush: (route: RouteLocationRaw, cb: (() => void)) => void
}

export default {
  install(app: App, options) {
    const { router, tourMap } = options
    Object.entries(tourMap).forEach(([key, options]) => {
      const shepherdTour = new Tour(options);
      if (typeof router !== "undefined") {
        Object.defineProperty(shepherdTour, "routerPush", {
          enumerable: false,
          configurable: false,
          writable: false,
          value: (route, cb) => {
            router.push(route).then(cb);
          },
        });
      }
      app.config.globalProperties[key] = shepherdTour as VueShepherdTour;
      app.provide(key, shepherdTour as VueShepherdTour)
    })
    app.directive("tour-step", tourStep);
  },
};
