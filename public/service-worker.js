/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["assets/images/accenture.png","22da65f0d0d8ddd4810b8a08fa1492e6"],["assets/images/app-logos/android.png","924a4a2366fb5f7b5ec92a97ae0b5158"],["assets/images/app-logos/cardboard.png","c83794e178551e3a80ba5d7edb1960b4"],["assets/images/app-logos/cloud.png","601efd703ac62b9afbea2178eb1e9f15"],["assets/images/app-logos/firebase.png","7ce4ed3771a3ee21a0a496ff57d5f733"],["assets/images/app-logos/polymer.png","70f15b2618d5b2ef882674a440dcd51a"],["assets/images/app-logos/tensor-flow.png","5bcbace053b46318b69dacbb75b52994"],["assets/images/bg.mp4","c64a73ddca6003b51f64d1728db3b324"],["assets/images/certificate-resources/bg1.png","22812fd1ac22ec8e5d073a623786f56f"],["assets/images/certificate-resources/bg2.png","8f09d80374c7b8f8b45a58e9d63ccbfc"],["assets/images/certificate-resources/gdg-icon.png","1cb5e30e842b360e0ab0f87525399cd4"],["assets/images/certificate-resources/gdgph-vector.png","e910e655c834b9634012245c8d0d30ab"],["assets/images/certificate-resources/jomar-tigcal.png","abb80a92ae1d17288a3b9077c9e3b34b"],["assets/images/certificate-resources/ralph-vincent-regalado.png","f54bedbaab830e6017bd494cae187fa2"],["assets/images/certificate-resources/template.jpg","4ae5f88bbe7e924fe67f2675f8da29b6"],["assets/images/certificate-resources/template.png","09193b49e7b9d9d51ccc885ae808989f"],["assets/images/events/androidmasters.jpg","3f298f2e03f7d3f9be62477dffed4313"],["assets/images/events/codeblaze/cover.png","3578881f0a2fafac1b2c7735dd55b478"],["assets/images/events/devfest.jpg","c282666b312beaea8fb78a1167c9e71d"],["assets/images/events/firebase-live-viewing/cover.jpg","7fe6aa38d5f9c918866d7523afaf17bd"],["assets/images/events/firebase-live-viewing/mozilla.png","657646f155689d9ae20a7204b44e1fcc"],["assets/images/events/hackfair.jpg","8da7cb0f2c927a92bf52f9fb91eef258"],["assets/images/events/io.jpg","5328026926d6335177bb7e3968613a41"],["assets/images/events/next17/Albert Padin.jpg","08a0dac6ec00f4fa215a3774b3a95484"],["assets/images/events/next17/Benj Tupas.jpg","84b24c5a37e8405ee71639c82a7ee3ae"],["assets/images/events/next17/cover.jpg","4e1eb123109f768c7d6c02200d4b9b47"],["assets/images/events/next17/cover.png","b77dc2b24d85874fc98ae10e213720de"],["assets/images/events/study-jams.jpg","1aa1e23d1b48528ef98b2ce0d4082697"],["assets/images/events/tensorflow-dev-summit/cover.jpg","c3e8afabd531bf6961ffb3742aaff46f"],["assets/images/events/wtm.jpg","3f4611b2ae52c1879745e4077070a5c2"],["assets/images/fb.png","323836a323f60a992c56af268146bb6a"],["assets/images/gdg-icon.png","c131324c0bab9a5950529f60cf84ac50"],["assets/images/gdg-icon_large.png","5e931dd20282f1c3ce01498b36743edf"],["assets/images/gdg.jpg","35bc9418086e6a1f4038655afc61a068"],["assets/images/gdg/bacolod.png","5fde9cef50872106d0f51f45f5a794d9"],["assets/images/gdg/baguio.png","0a948fcee9c94183bc03619e9c5843f9"],["assets/images/gdg/cdo.png","2b495b2327a067a3f9959c520b9abf32"],["assets/images/gdg/cebu.png","597c93f56931a59527b81431047a6d55"],["assets/images/gdg/davao.png","75b79a780a0724ef5a565df80a466fe2"],["assets/images/gdg/halsema.png","b13d502dc8a556db975232424add85fb"],["assets/images/gdg/philippines.png","ec153e317b4798d4f1b85b499b1206ef"],["assets/images/gdg/zamboanga.png","076f2192d37cdf52c51592c4c411e4ec"],["assets/images/gdg_androids.png","d5aa85148c2f8969cef672bc948b2914"],["assets/images/gp.png","ba1f1d52e388e9bbcfd0686860ceb69e"],["assets/images/ig.png","6a950fdc833151c099fafa18fcb902cf"],["assets/images/klab-cyscorpions.png","5cea40cdc26399c6d08a62231a6d00c9"],["assets/images/linkedin.png","e16f41a1f50dce88884bd80fe9416655"],["assets/images/og.jpg","f20d87af143e489437678cafeb79f061"],["assets/images/phmap.png","ae809736697a0e1863e259eb43586cdd"],["assets/images/slideshow/1.jpg","139f8e4880805e48c15d0d43e923ef4a"],["assets/images/slideshow/2.jpg","2e3ea7fa8e606641141ea65a353fb123"],["assets/images/slideshow/3.jpg","36c5ea5994e9c534ba0e7056c431e3fb"],["assets/images/slideshow/4.jpg","a312cd773ce7be6c4114fac745502594"],["assets/images/slideshow/5.jpg","12cd6f9ff2ad0bec0db6a492caa336aa"],["assets/images/slideshow/6.jpg","eb42430ba1aaf753361f42098dcab0ca"],["assets/images/speakers/Adam Ray Baguyo.jpg","520cf325f7cd687810819d1fe3490db8"],["assets/images/speakers/Adrian Vincent Tayag.jpg","a398cc80293fc797d3c92976fa597554"],["assets/images/speakers/Albert Padin.jpg","08a0dac6ec00f4fa215a3774b3a95484"],["assets/images/speakers/Alex Alabiso.jpg","49a29c8ba80e77cc1fcb9bed6923a810"],["assets/images/speakers/Allan Tan.jpg","bbb84bc8dc2cc70305c3bbff506da240"],["assets/images/speakers/Ambe Tierro.jpg","28d77e4acf5de5a3e4e4be68e2a10d25"],["assets/images/speakers/Anne Michelle Santos.jpg","8dd5eeec9a8ecd3ba2876008e11ce3d5"],["assets/images/speakers/Ben Adrian Sarmiento.jpg","9d6f827c70a69b14fcc887f4067e38ff"],["assets/images/speakers/Benj Tupas.jpg","84b24c5a37e8405ee71639c82a7ee3ae"],["assets/images/speakers/Brian Tan Seng.jpg","17e56954b9ab2929ec89e6957494bca9"],["assets/images/speakers/Charibeth Cheng.jpg","1cf9714a51661b5f8b1ab8e97e56da79"],["assets/images/speakers/Chelle Obligacion Gray.jpg","9dbe05d1061c1907946e02d1c11ffd61"],["assets/images/speakers/Chelle Obligacion Gray2.jpg","2111541786d9532286cbf9d5a2590900"],["assets/images/speakers/Claudine Rodriguez.jpg","f7a65895d92d369ce331a8fb058bf25d"],["assets/images/speakers/Cristine Chen.jpg","6a998a7e1163b83bf1cdc9729b2b4fcb"],["assets/images/speakers/Cristopher David.jpg","1f5d5373b642c86a2fd5cd93bfaa0331"],["assets/images/speakers/Darth Vidar.jpg","c209c0c080fb770e308632f50b447d13"],["assets/images/speakers/Derrick Alain Mapagu.jpg","f706fd5f5a67b8bf2b57bfdc5d04abc3"],["assets/images/speakers/Deuphil Kaufmann.jpg","facb758df971f78237181aa835917228"],["assets/images/speakers/Dexter Santos.jpg","cdef9fa9bf8cb1bcb4462bbc47b02cfd"],["assets/images/speakers/Ellaine de Guzman.jpg","019144251e942c7367c00dcdf1837be8"],["assets/images/speakers/Elymar Apao.jpg","685e9c4cb65683dfeafa5c7bba1c5cbf"],["assets/images/speakers/Gail Tan.jpg","6388f7289a7ed506984bf311bbbad6c2"],["assets/images/speakers/Gino Tria.jpg","d85a432f74cdf8c02e325524430b91b6"],["assets/images/speakers/Goldy Yancha.jpg","864aac206f5e35f3290b1c73fb77cc9e"],["assets/images/speakers/Grace Sojor.jpg","c4133732e36c7052da5717db2b219766"],["assets/images/speakers/Howard Go.jpg","2a09060957c3393230990a15a1a67ca3"],["assets/images/speakers/Jasmin Caronan.jpg","41fab6d8a6f136474b8ec5656066dd72"],["assets/images/speakers/Jielynn Diroy.jpg","a93607d668a69605326098696a8749e3"],["assets/images/speakers/Joem Petilla.jpg","d3705959a854ebab1dc3c7889aa8e19d"],["assets/images/speakers/Johnny Benitez.jpg","ba116a172709c2ee0ef94bfac04c1a56"],["assets/images/speakers/Jomar Tigcal.jpg","5a74669a098940f087eaa45a76c3b771"],["assets/images/speakers/Jonah Micah Mananghaya.jpg","94ca641027dae2993dafd29f9536ff4c"],["assets/images/speakers/Jonathan Joson.jpg","f004b20a09bb2288ecc04987d30112f3"],["assets/images/speakers/Jordan Deja.jpg","78b4eb7024492d2320917dd4c6f05478"],["assets/images/speakers/Josan Astrid Dometita-Chug.jpg","97e7a22aa9a5001e2d1773459e56e440"],["assets/images/speakers/Joyce Guiao.jpg","d5d9fa4b82215ac9a67e35682c4a3b87"],["assets/images/speakers/Julie Ann Alonzo.jpg","1300c981afb3cae5aae9d5b20c1daeed"],["assets/images/speakers/Juvar Abrera.jpg","a26f0f1023de20a2d8f81b4b673bfa68"],["assets/images/speakers/Karen Matias.jpg","8b57bd5076b12a97d7326e4153519d73"],["assets/images/speakers/Kazunori Sato.jpg","c56e3750e55553d1e2d23de40c378c1c"],["assets/images/speakers/Kristine Mae Adlaon.jpg","2d0e1d40c9f90ac8870e2369fdde573c"],["assets/images/speakers/Luna Cruz.jpg","efa3d824e59e90cd430cdad3c6553500"],["assets/images/speakers/Mac Valmores.jpg","b840c73ff561ffaea2e59c3a4143b1bc"],["assets/images/speakers/Mara Ang.jpg","f1aa24d0e301b1cc8f7428086887030f"],["assets/images/speakers/Mark Anthony Panizales.jpg","bae16abf228d8ea508e388fd8f0a02f9"],["assets/images/speakers/Merlin Suarez.jpg","e2e60673f3cd8d8013ad4cec3f26f385"],["assets/images/speakers/Mete Atamel.jpg","ce3cef7b7488efcad696edcd269f3da6"],["assets/images/speakers/Micaela Reyes.jpg","887615764fa04ea0f6667a18b8ea36f0"],["assets/images/speakers/Mika Aldaba.jpg","0c274cd10f76698b731c602e13351ab3"],["assets/images/speakers/Nadine Jamila.jpg","2c33b2123dcbc12c3c171db81637248c"],["assets/images/speakers/Neil Patrick Del Gallego.jpg","104f89cc7d9b8f6e2d4bc9c0b133625d"],["assets/images/speakers/Pamela Cajilig.jpg","c2bbf1fa818893a0ac2c7f97f763d165"],["assets/images/speakers/Patricia Faustino.jpg","f06d8deb5eb9cfc54ad0337085df522a"],["assets/images/speakers/Paul Gadi.jpg","9a2caea5b53fc4206a3b3e7a7f5b5c0e"],["assets/images/speakers/Ralph Regalado.jpg","ecaabeb43c7dfd7ed0d2ab106b92d7b6"],["assets/images/speakers/Raymund Vidar.jpg","4e2d52b4063421f08aec97a4769dbefa"],["assets/images/speakers/Reymart Canuel.jpg","a992696981d39d97a178b857102c7bb6"],["assets/images/speakers/Reymart Canuel2.jpg","6c13bb096ac318d3b5c68a9d39e09b76"],["assets/images/speakers/Sami Kizilbash.jpg","7e6c165f1da5c7d93630dd39dff31d39"],["assets/images/speakers/Stephanie Sy.jpg","b8c46fd42786cf941a3d14c9fd91ba57"],["assets/images/speakers/Takuo Suzuki.jpg","a8b9abbda60fe48de23c98d886904af3"],["assets/images/speakers/Tal de Guzman.jpg","1ba127feef9f15b4c85631f80f61f301"],["assets/images/speakers/Toni-Jan Keith Monserrat.jpg","676b4694ccb5573272d352e68c79e5b2"],["assets/images/speakers/Valenice Balace.jpg","3f71c7503925b6def78feaa1c922b38d"],["assets/images/speakers/Vicky Sy.jpg","88dc4b8c8526cd0df214aea728e78ab9"],["assets/images/speakers/Vin Lim.jpg","f4aff3daa82dd1d584597cc813315a38"],["assets/images/speakers/Warangkana Fajardo.jpg","f73cd0f497892eedf2fb91f542359b5d"],["assets/images/speakers/Wayne Manuel.jpg","36309ef3f7bbc62374fe1a38f3f3a43c"],["assets/images/speakers/Yohan Totting.jpg","fd0832aab8bd90f4c5ae747f08baf67b"],["assets/images/sponsors/accenture.png","22da65f0d0d8ddd4810b8a08fa1492e6"],["assets/images/sponsors/globe-labs-black.png","a899bab119dd56c0352f88bd604b7110"],["assets/images/sponsors/google.png","113d2c16640cf831f82318f3ae90026d"],["assets/images/team/adam-baguyo.gif","2d44ee7c58b19fd4b02f9916dab509d2"],["assets/images/team/adam-baguyo.jpg","ebd69a160f19a909667a69b201803184"],["assets/images/team/all.png","daf28c271f32b5ec1315954cf18a5fb2"],["assets/images/team/antonio-rui-salum.gif","1b04efaab03dd4d81700e4a6e4c9b6dd"],["assets/images/team/antonio-rui-salum.jpg","db05f65d25f245f0330b5b7693c74303"],["assets/images/team/chelle-gray.gif","1cb37bcb66d1ef175899fbba20d29d27"],["assets/images/team/chelle-gray.jpg","100d8e9636914b8a6b7736c0f45bd010"],["assets/images/team/cristine-chen.jpg","6a947df3c94297e0c6b924a5b67e4cef"],["assets/images/team/faye-estacio.gif","34840c89410e1693dbc2d132b4cb5ca9"],["assets/images/team/faye-estacio.jpg","ddcb44a2ba29accb0bc6c98f5b1e8019"],["assets/images/team/ferlyn-lausa.gif","7e05806d8a3575f98afb604239f35940"],["assets/images/team/ferlyn-lausa.jpg","ea7d25b75ff2620f020a8029070507ab"],["assets/images/team/ferlyn.png","d220b097b95a339d1c93aeeb45eec615"],["assets/images/team/jarrell-remulla.gif","8588e650f47e9c11d9e5ab87665a1245"],["assets/images/team/jarrell-remulla.jpg","490fd4a4438b7d9ac96c15378a4bae0b"],["assets/images/team/jielynn-diroy.gif","85a50a0bf3e09b3ea6a2eccb6b2ee3c2"],["assets/images/team/jielynn-diroy.jpg","69a4fc096d171e51c67d9746a88c9ea1"],["assets/images/team/jomar-tigcal.gif","30e543b5e372de3ed8be36f1f46a6cea"],["assets/images/team/jomar-tigcal.jpg","b4ffc681cafd1493f2822ebc28afb60b"],["assets/images/team/jonah-mananghaya.gif","8d55bbf8b286697d5c9ca730e6c8cd1e"],["assets/images/team/jonah-mananghaya.jpg","e3646c44e07f25dba55a87abf306a3e5"],["assets/images/team/juvar-abrera.gif","277ec9f060218bcd0b4ec8d14706d333"],["assets/images/team/juvar-abrera.jpg","c82a0c5f1e10287a7bfbcf2a2f0c6626"],["assets/images/team/kristine-mae-adlaon.gif","411986c839bef4ada4ce098cc25fed4e"],["assets/images/team/kristine-mae-adlaon.jpg","c05e7b4669e73b36bac8e511bde3692c"],["assets/images/team/louis-san-pedro.gif","ea4af5f319b54fd8375b2830f452405b"],["assets/images/team/louis-san-pedro.jpg","bc69eca875aed7c8ab1b25b84ec1d57b"],["assets/images/team/nikki-gomicua.gif","49d28046f7498e5bafc20338736c01c2"],["assets/images/team/nikki-gomicua.jpg","a5aebb2a5a96c3b5fa879bfcf36f8701"],["assets/images/team/ralph-regalado.gif","16a5142de46c8017aa7e31ececc9f617"],["assets/images/team/ralph-regalado.jpg","adb587999afb41dfa8c74af028291fda"],["assets/images/team/tj-monserrat.gif","c61c4e01849f3c36904c12e832cb1457"],["assets/images/team/tj-monserrat.jpg","2794a3bf94860e9a117b612f2936dc19"],["assets/images/team/vince-benito.gif","e7debe699a662babc4cfcd8ec5411c14"],["assets/images/team/vince-benito.jpg","646dfbb747eff270313846c6aaec6092"],["assets/images/tw.png","4d92e6b981ef2e0d5facbd401553c2dc"],["assets/images/web.png","4e0b1285e2fb7bda2de356fd86a2ece2"],["assets/images/yt.png","3457eb9c0f976f36d499886859f192ff"],["favicon.ico","0f26d53b522d6af3b7c921631fbcbb8c"],["index.html","c64dc5750d3bad4f501ba3c20ed54f41"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







