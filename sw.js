/* eslint-disable no-restricted-globals */
const staticCacheName = "s-app-1";
const dynamicCache = "d-app-1";

const statick = [
  "index.html",
  "365.png",
  "static/js/index.js",
  "manifest.json",
];

self.addEventListener("install", async (event) => {
  console.log("[SW]: install");
  const cache = await caches.open(staticCacheName);
  await cache.addAll(statick);
});

self.addEventListener("activate", async (event) => {
  console.log("[SW]: activate");
  // const cacheNames = await caches.keys();
  // await Promise.all(
  //   cacheNames
  //     .filter((name) => !(name === staticCacheName || name === dynamicCache))
  //     .map((name) => caches.delete(name))
  // );
});

self.addEventListener("fetch", async (event) => {
  const { request } = event;

  const url = new URL(request.url);
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(netWorkFirst(request));
  }
});

const cacheFirst = async (req) => {
  const cached = await caches.match(req);
  return cached ?? (await fetch(req));
};

const netWorkFirst = async (req) => {
  const cache = await caches.open(dynamicCache);
  try {
    const response = await fetch(req);
    await cache.put(req, response.clone());
    return response;
  } catch (error) {
    console.log("error fetch network, return to cache");
    const cacheRes = await cache.match(req);
    return cacheRes ?? caches.match("You are offline");
  }
};
