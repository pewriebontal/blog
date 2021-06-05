/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-86690dcc9481b4c6e39c.js"
  },
  {
    "url": "styles.22aa8ee0c2e6efe836b5.css"
  },
  {
    "url": "styles-e9d24b1846c7d6eb9685.js"
  },
  {
    "url": "framework-acd7498685eeb36e39da.js"
  },
  {
    "url": "532a2f07-d3e7966caebc443855d3.js"
  },
  {
    "url": "app-987f31b95e7ee279cd9e.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "5bcd8ced82c0411c5f971d328d93c376"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-a95b272f8c25b9a8a758.js"
  },
  {
    "url": "polyfill-ab316bb0c4672ce2b4db.js"
  },
  {
    "url": "cfc86df3-70787a6ec6fec8018aa6.js"
  },
  {
    "url": "22df2c6f0e0b02f286186edbe62a3193fb639611-55510039bd3a1cd271c5.js"
  },
  {
    "url": "f7f859cd4bf156c2acc6f46f65ba39cb35d4c0a9-7eaa59b9206699c832c7.js"
  },
  {
    "url": "5adfd937054d18aa90c3653907d1d43da6549296-bc50838dcf99e46772bb.js"
  },
  {
    "url": "component---node-modules-narative-gatsby-theme-novela-src-templates-author-template-tsx-1998a60cbdf14597197b.js"
  },
  {
    "url": "page-data/authors/pewriebontal/page-data.json",
    "revision": "cbce25ea3fafcf0037766777ef5bb87f"
  },
  {
    "url": "page-data/sq/d/1143375668.json",
    "revision": "147e7be0eb97d9d5b6ddb7a789abeaa6"
  },
  {
    "url": "page-data/sq/d/1491088328.json",
    "revision": "b52f817052ca57831d0473900ec6a04f"
  },
  {
    "url": "page-data/sq/d/2444214635.json",
    "revision": "daffe7756d7df7c1ff6ecbc5ec03b1b3"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "7817a528c45d7ef5ca31718ed0216160"
  },
  {
    "url": "component---src-pages-404-js-95ee81969d7f37489af1.js"
  },
  {
    "url": "page-data/404.html/page-data.json",
    "revision": "36ead6c429c4f0e4f0493ad4ab18d1c1"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "74a9e9d88be52c7cb460fbe8f0c45f27"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\/page-data\/.*\.json/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|avif|svg|gif|tiff|js|woff|woff2|json|css)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */
importScripts(`idb-keyval-3.2.0-iife.min.js`)

const { NavigationRoute } = workbox.routing

let lastNavigationRequest = null
let offlineShellEnabled = true

// prefer standard object syntax to support more browsers
const MessageAPI = {
  setPathResources: (event, { path, resources }) => {
    event.waitUntil(idbKeyval.set(`resources:${path}`, resources))
  },

  clearPathResources: event => {
    event.waitUntil(idbKeyval.clear())
  },

  enableOfflineShell: () => {
    offlineShellEnabled = true
  },

  disableOfflineShell: () => {
    offlineShellEnabled = false
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi: api } = event.data
  if (api) MessageAPI[api](event, event.data)
})

function handleAPIRequest({ event }) {
  const { pathname } = new URL(event.request.url)

  const params = pathname.match(/:(.+)/)[1]
  const data = {}

  if (params.includes(`=`)) {
    params.split(`&`).forEach(param => {
      const [key, val] = param.split(`=`)
      data[key] = val
    })
  } else {
    data.api = params
  }

  if (MessageAPI[data.api] !== undefined) {
    MessageAPI[data.api]()
  }

  if (!data.redirect) {
    return new Response()
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: lastNavigationRequest,
    },
  })
}

const navigationRoute = new NavigationRoute(async ({ event }) => {
  // handle API requests separately to normal navigation requests, so do this
  // check first
  if (event.request.url.match(/\/.gatsby-plugin-offline:.+/)) {
    return handleAPIRequest({ event })
  }

  if (!offlineShellEnabled) {
    return await fetch(event.request)
  }

  lastNavigationRequest = event.request.url

  let { pathname } = new URL(event.request.url)
  pathname = pathname.replace(new RegExp(`^`), ``)

  // Check for resources + the app bundle
  // The latter may not exist if the SW is updating to a new version
  const resources = await idbKeyval.get(`resources:${pathname}`)
  if (!resources || !(await caches.match(`/app-987f31b95e7ee279cd9e.js`))) {
    return await fetch(event.request)
  }

  for (const resource of resources) {
    // As soon as we detect a failed resource, fetch the entire page from
    // network - that way we won't risk being in an inconsistent state with
    // some parts of the page failing.
    if (!(await caches.match(resource))) {
      return await fetch(event.request)
    }
  }

  const offlineShell = `/offline-plugin-app-shell-fallback/index.html`
  const offlineShellWithKey = workbox.precaching.getCacheKeyForURL(offlineShell)
  return await caches.match(offlineShellWithKey)
})

workbox.routing.registerRoute(navigationRoute)

// this route is used when performing a non-navigation request (e.g. fetch)
workbox.routing.registerRoute(/\/.gatsby-plugin-offline:.+/, handleAPIRequest)
