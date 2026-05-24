import { createError, getQuery, handleCacheHeaders, setHeaders, setHeader, H3Error, defineEventHandler } from 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/h3/dist/index.mjs';
import { u as useOgImageRuntimeConfig, h as hashOgImageOptions, c as componentNames, b as htmlPayloadCache, l as logger, e as extractSocialPreviewTags, f as fetchIsland, d as useStorage, g as logger$1, r as resolveContext, i as getSiteConfig } from '../../../nitro/nitro.mjs';
import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/nuxt-og-image/node_modules/pathe/dist/index.mjs';
import { parse } from 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/devalue/index.js';
import { c as createHead } from '../../../_/server.mjs';
import { a as applyEmojis, r as resolvedFonts } from '../../../_/index.mjs';
import { renderSSRHead } from 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/unhead/dist/server.mjs';
import { withTrailingSlash } from 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/ufo/dist/index.mjs';
import { digest } from 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/nuxt-og-image/node_modules/ohash/dist/index.mjs';
import { prefixStorage } from 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/unstorage/dist/index.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/consola/dist/index.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/destr/dist/index.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/hookable/dist/index.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/ofetch/dist/node.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/nitropack/node_modules/ohash/dist/index.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/klona/dist/index.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/defu/dist/defu.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/scule/dist/index.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/unctx/dist/index.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/radix3/dist/index.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/vue/index.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/@nuxtjs/i18n/node_modules/vue-router/vue-router.node.mjs';
import 'node:url';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/pathe/dist/index.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/nuxtseo-shared/dist/utils.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/@nuxt/content/node_modules/pathe/dist/index.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/db0/dist/connectors/better-sqlite3.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/unhead/dist/plugins.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/unhead/dist/utils.mjs';

function getComponentHash(componentName) {
  const components = componentNames;
  const component = components.find(
    (c) => c.pascalName === componentName || c.kebabName === componentName
  );
  return component?.hash || "";
}
function generateBuildCacheKey(options, extension) {
  const { version } = useOgImageRuntimeConfig();
  const componentHash = getComponentHash(options.component || "default");
  const hash = hashOgImageOptions(options, componentHash, version);
  return `${hash}.${extension}`;
}
function getBuildCachedImage(options, extension) {
  const { buildCacheDir } = useOgImageRuntimeConfig();
  if (!buildCacheDir)
    return null;
  const cacheKey = generateBuildCacheKey(options, extension);
  const cachePath = join(buildCacheDir, cacheKey);
  if (!existsSync(cachePath))
    return null;
  const cached = JSON.parse(readFileSync(cachePath, "utf-8"));
  if (cached.expiresAt && cached.expiresAt < Date.now()) {
    return null;
  }
  return Buffer.from(cached.data, "base64");
}
function setBuildCachedImage(options, extension, data, maxAgeSeconds) {
  const { buildCacheDir } = useOgImageRuntimeConfig();
  if (!buildCacheDir)
    return;
  const cacheKey = generateBuildCacheKey(options, extension);
  const cachePath = join(buildCacheDir, cacheKey);
  if (!existsSync(buildCacheDir)) {
    mkdirSync(buildCacheDir, { recursive: true });
  }
  const cached = {
    data: Buffer.from(data).toString("base64"),
    expiresAt: Date.now() + maxAgeSeconds * 1e3,
    createdAt: Date.now()
  };
  writeFileSync(cachePath, JSON.stringify(cached));
}

const PAYLOAD_REGEX = /<script.+id="nuxt-og-image-options"[^>]*>(.+?)<\/script>/;
function extractOptionsFromHtml(html) {
  const match = String(html).match(PAYLOAD_REGEX);
  if (!match?.[1])
    return [];
  return parse(match[1]);
}
async function doFetchWithErrorHandling(fetch, path) {
  const res = await fetch(path, {
    redirect: "follow",
    headers: {
      accept: "text/html"
    }
  }).catch((err) => {
    return err;
  });
  let errorDescription;
  if (res.status >= 300 && res.status < 400) {
    if (res.headers.has("location")) {
      return await doFetchWithErrorHandling(fetch, res.headers.get("location") || "");
    }
    errorDescription = `${res.status} redirected to ${res.headers.get("location") || "unknown"}`;
  } else if (res.status >= 400) {
    errorDescription = `${res.status} error: ${res.statusText}`;
  }
  if (errorDescription) {
    return [null, createError({
      statusCode: 500,
      statusMessage: `[Nuxt OG Image] Failed to parse \`${path}\` for og-image extraction. ${errorDescription}`
    })];
  }
  return [res._data || await res.text(), null];
}
async function fetchPathHtmlAndExtractOptions(e, path, cacheKey) {
  const cachedHtmlPayload = await htmlPayloadCache.getItem(cacheKey);
  if (cachedHtmlPayload && cachedHtmlPayload.expiresAt > Date.now())
    return cachedHtmlPayload.value;
  let [html, err] = await doFetchWithErrorHandling(e.fetch, path);
  if (err) {
    logger.warn(err);
  }
  if (!html) {
    const [fallbackHtml, err2] = await doFetchWithErrorHandling(globalThis.$fetch.raw, path);
    if (err2) {
      return err2;
    }
    html = fallbackHtml;
  }
  if (!html) {
    return createError({
      statusCode: 500,
      statusMessage: `[Nuxt OG Image] Failed to read the path ${path} for og-image extraction, returning no HTML.`
    });
  }
  const [root, images] = extractSocialPreviewTags(html);
  const options = extractOptionsFromHtml(html);
  const payload = {
    options,
    socialPreview: { root, images }
  };
  if (payload) {
    await htmlPayloadCache.setItem(cacheKey, {
      // 60 minutes for prerender, 10 seconds for runtime
      expiresAt: Date.now() + 1e3 * (60 * 60 ),
      value: payload
    });
  }
  return payload;
}

const RE_SCRIPT_TAG = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
async function html(ctx) {
  const { options } = ctx;
  const fonts = resolvedFonts;
  if (!options.component) {
    throw createError({
      statusCode: 500,
      statusMessage: `[Nuxt OG Image] Rendering an invalid component. Received options: ${JSON.stringify(options)}.`
    });
  }
  const islandTimeout = ctx.runtimeConfig.security?.renderTimeout ?? 15e3;
  const island = await fetchIsland(ctx.e, ctx.options.component, typeof ctx.options.props !== "undefined" ? ctx.options.props : ctx.options, islandTimeout);
  const head = createHead();
  head.push(island.head);
  let defaultFontFamily = "sans-serif";
  const firstFont = fonts[0];
  if (firstFont)
    defaultFontFamily = firstFont.family.replaceAll("+", " ");
  await applyEmojis(ctx, island);
  let html2 = island.html;
  const scale = options.props?.scale || 1;
  const scaledWidth = Math.round(Number(options.width) * scale);
  const scaledHeight = Math.round(Number(options.height) * scale);
  const fontFaces = fonts.map((font) => {
    const ext = font.src.split(".").pop()?.toLowerCase();
    const format = ext === "woff2" ? "woff2" : ext === "woff" ? "woff" : "truetype";
    return `@font-face {
  font-family: '${font.family.replaceAll("+", " ")}';
  font-style: ${font.style};
  font-weight: ${font.weight};
  src: url('${font.src}') format('${format}');
}`;
  }).join("\n");
  const bgColor = options.props?.colorMode === "dark" ? "#1b1b1b" : "#fff";
  head.push({
    style: [
      {
        innerHTML: `/* reset */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
img, svg { display: block; max-width: 100%; }

/* viewport */
html, body {
  width: ${scaledWidth}px;
  height: ${scaledHeight}px;
  overflow: hidden;
  font-family: '${defaultFontFamily}', sans-serif;
  background-color: ${bgColor};
}

/* scale wrapper */
.og-scale-wrapper {
  transform: scale(${scale});
  transform-origin: top left;
  width: ${options.width}px;
  height: ${options.height}px;
}
.og-scale-wrapper > :first-child {
  width: 100%;
  height: 100%;
}

/* match satori flex defaults for divs */
div { display: flex; }
div:has(div, p, ul, ol, li, blockquote, pre, hr, table, dl) {
  flex-direction: column;
}
div:not(:has(div, p, ul, ol, li, blockquote, pre, hr, table, dl)) {
  flex-wrap: wrap;
  gap: 12px;
}

svg[data-emoji] { display: inline-block; }

/* fonts */
${fontFaces}`
      }
    ],
    meta: [
      { charset: "utf-8" }
    ]
  });
  RE_SCRIPT_TAG.lastIndex = 0;
  html2 = html2.replaceAll(RE_SCRIPT_TAG, "");
  const headChunk = await renderSSRHead(head);
  return `<!DOCTYPE html>
<html ${headChunk.htmlAttrs}>
<head>${headChunk.headTags}</head>
<body ${headChunk.bodyAttrs}>${headChunk.bodyTagsOpen}<div class="og-scale-wrapper" data-v-inspector-ignore="true">${html2}</div>${headChunk.bodyTags}</body>
</html>`;
}

function safeCompare(a, b) {
  if (a.length !== b.length)
    return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++)
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}
async function useOgImageBufferCache(ctx, options) {
  const maxAge = Number(options.cacheMaxAgeSeconds);
  const intentionallyEnabled = maxAge > 0;
  let enabled = intentionallyEnabled;
  const cache = prefixStorage(useStorage(), withTrailingSlash(options.baseCacheKey || "/"));
  const key = ctx.key;
  let cachedItem = false;
  if (enabled) {
    const hasItem = await cache.hasItem(key).catch((e) => {
      enabled = false;
      return createError({
        cause: e,
        statusCode: 500,
        statusMessage: `[Nuxt OG Image] Failed to connect to cache ${options.baseCacheKey}. Response from cache: ${e.message}`
      });
    });
    if (hasItem instanceof Error)
      return hasItem;
    if (hasItem) {
      const { value, expiresAt, headers } = await cache.getItem(key).catch(() => ({
        value: null,
        expiresAt: Date.now()
      }));
      const purgeValue = getQuery(ctx.e).purge;
      if (typeof purgeValue !== "undefined") {
        if (options.secret && !safeCompare(String(purgeValue), options.secret)) {
          return createError({
            statusCode: 403,
            statusMessage: "[Nuxt OG Image] Invalid purge token. Provide the signing secret as ?purge=<secret>."
          });
        }
        await cache.removeItem(key).catch(() => {
        });
      } else if (expiresAt > Date.now()) {
        cachedItem = Buffer.from(value, "base64");
        if (handleCacheHeaders(ctx.e, {
          modifiedTime: new Date(headers["last-modified"]),
          etag: headers.etag,
          maxAge
        })) {
          return;
        }
        setHeaders(ctx.e, headers);
        setHeader(ctx.e, "X-OG-Cache", "HIT");
      } else {
        await cache.removeItem(key).catch(() => {
        });
      }
    }
  }
  if (!enabled) {
    setHeader(ctx.e, "Cache-Control", "no-cache, no-store, must-revalidate");
    setHeader(ctx.e, "Pragma", "no-cache");
    setHeader(ctx.e, "Expires", "0");
  }
  return {
    enabled,
    cachedItem,
    async update(item) {
      setHeader(ctx.e, "X-OG-Cache", intentionallyEnabled ? "MISS" : "DISABLED");
      if (!enabled)
        return;
      const value = Buffer.from(item).toString("base64");
      const headers = {
        // avoid multi-tenancy cache issues
        "Vary": "accept-encoding, host",
        "etag": `W/"${digest(value)}"`,
        "last-modified": (/* @__PURE__ */ new Date()).toUTCString(),
        "cache-control": `public, max-age=${maxAge}, s-maxage=${maxAge}, immutable`
      };
      setHeaders(ctx.e, headers);
      await cache.setItem(key, {
        value,
        headers,
        expiresAt: Date.now() + maxAge * 1e3
      }).catch((err) => logger$1.warn(`[Nuxt OG Image] Failed to write cache for key "${key}": ${err?.message || err}`));
    }
  };
}

async function imageEventHandler(e) {
  const reqStart = performance.now();
  const ctx = await resolveContext(e).catch((err) => {
    logger$1.error(`resolveContext error for ${e.path}:`, err?.message || err);
    throw err;
  });
  if (ctx instanceof H3Error)
    return ctx;
  const timings = ctx.timings;
  timings.record("resolve-context", performance.now() - reqStart);
  try {
    return await renderOgImage(e, ctx);
  } finally {
    timings.record("total", performance.now() - reqStart);
    const header = timings.header();
    if (header)
      setHeader(e, "Server-Timing", header);
  }
}
async function renderOgImage(e, ctx) {
  const timings = ctx.timings;
  const { isDevToolsContextRequest, extension, renderer } = ctx;
  const { debug, baseCacheKey, security } = useOgImageRuntimeConfig(e);
  if ((debug) && isDevToolsContextRequest) {
    setHeader(e, "Content-Type", "application/json");
    const [extract, rendererDebug] = await Promise.all([
      fetchPathHtmlAndExtractOptions(e, ctx.basePath, ctx.key),
      renderer.debug ? renderer.debug(ctx).catch((err) => {
        logger$1.debug(`renderer.debug failed for ${ctx.options.component}: ${err?.message || err}`);
        return {};
      }) : {}
    ]);
    return {
      extract,
      siteUrl: getSiteConfig(e).url,
      ...rendererDebug
    };
  }
  switch (extension) {
    case "html":
      setHeader(e, "Content-Type", `text/html`);
      return html(ctx);
    case "svg": {
      if (!debug && true) {
        return createError({
          statusCode: 404
        });
      }
      if (ctx.renderer.name !== "satori") {
        return createError({
          statusCode: 400,
          statusMessage: `[Nuxt OG Image] Generating ${extension}'s with ${renderer.name} is not supported.`
        });
      }
      setHeader(e, "Content-Type", `image/svg+xml`);
      const debugResult = await ctx.renderer.debug(ctx);
      return debugResult.svg;
    }
    case "png":
    case "jpeg":
    case "jpg":
    case "webp":
      if (!renderer.supportedFormats.includes(extension)) {
        return createError({
          statusCode: 400,
          statusMessage: `[Nuxt OG Image] Generating ${extension}'s with ${renderer.name} is not supported.`
        });
      }
      setHeader(e, "Content-Type", `image/${extension === "jpg" ? "jpeg" : extension}`);
      break;
    default:
      return createError({
        statusCode: 400,
        statusMessage: `[Nuxt OG Image] Invalid request for og.${extension}.`
      });
  }
  const buildCachedImage = getBuildCachedImage(ctx.options, extension) ;
  if (buildCachedImage) {
    timings.record("cache-hit", 0);
    return buildCachedImage;
  }
  const endCacheLookup = timings.start("cache-lookup");
  const cacheApi = await useOgImageBufferCache(ctx, {
    cacheMaxAgeSeconds: ctx.options.cacheMaxAgeSeconds,
    baseCacheKey,
    secret: security?.secret
  }).finally(endCacheLookup);
  if (typeof cacheApi === "undefined") {
    return;
  }
  if (cacheApi instanceof H3Error) {
    return cacheApi;
  }
  let image = cacheApi.cachedItem;
  if (image) {
    timings.record("cache-hit", 0);
  }
  if (!image) {
    const timeout = security?.renderTimeout ?? 15e3;
    let timer;
    const endRender = timings.start("render-total");
    image = await Promise.race([
      renderer.createImage(ctx),
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(`OG image render timed out after ${timeout}ms`)), timeout);
      })
    ]).catch((err) => {
      if (err?.message?.includes("timed out")) {
        logger$1.error(`renderer.createImage timeout for ${e.path}`);
        return createError({ statusCode: 408, statusMessage: `[Nuxt OG Image] Request timed out while waiting for OG image render.` });
      }
      logger$1.error(`renderer.createImage error for ${e.path}:`, err?.stack || err?.message || err);
      throw err;
    }).finally(() => {
      clearTimeout(timer);
      endRender();
    });
    if (image instanceof H3Error) {
      return image;
    }
    if (!image) {
      return createError({
        statusCode: 500,
        statusMessage: `Failed to generate og.${extension}.`
      });
    }
    await cacheApi.update(image);
    if (ctx.options.cacheMaxAgeSeconds) {
      setBuildCachedImage(ctx.options, extension, image, ctx.options.cacheMaxAgeSeconds);
    }
  }
  return image;
}

const image = defineEventHandler(imageEventHandler);

export { image as default };
//# sourceMappingURL=image.mjs.map
