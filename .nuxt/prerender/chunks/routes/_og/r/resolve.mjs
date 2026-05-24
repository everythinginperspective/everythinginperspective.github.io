import { defineEventHandler, createError, getQuery, sendRedirect } from 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/h3/dist/index.mjs';
import { withQuery, withLeadingSlash, parseURL } from 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/ufo/dist/index.mjs';
import { u as useOgImageRuntimeConfig, j as isInternalRoute } from '../../../nitro/nitro.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/consola/dist/index.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/destr/dist/index.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/hookable/dist/index.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/ofetch/dist/node.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/unstorage/dist/index.mjs';
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
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/devalue/index.js';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/nuxt-og-image/node_modules/ohash/dist/index.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/@nuxtjs/i18n/node_modules/vue-router/vue-router.node.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/pathe/dist/index.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/nuxtseo-shared/dist/utils.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/@nuxt/content/node_modules/pathe/dist/index.mjs';
import 'file:///Volumes/B95P4/everythinginperspective_nuxt/node_modules/db0/dist/connectors/better-sqlite3.mjs';

const RE_META_TAG = /<meta\b[^>]*>/gi;
const RE_META_KEY = /\b(?:property|name)\s*=\s*(?:"([^"]+)"|'([^']+)')/i;
const RE_META_CONTENT = /\bcontent\s*=\s*(?:"([^"]*)"|'([^']*)')/i;
const MAX_RESOLVE_PATH_LENGTH = 2048;
const RE_STRIP_PREFIX = /^.*?\/_og\/r/;
const RE_IMAGE_EXT = /\.(?:png|jpe?g|webp|svg)$/i;
const RE_DOUBLE_LEADING_SLASH = /^\/{2,}/;
function extractMeta(html, key) {
  for (const tagMatch of html.matchAll(RE_META_TAG)) {
    const tag = tagMatch[0];
    const keyMatch = tag.match(RE_META_KEY);
    const keyValue = keyMatch?.[1] ?? keyMatch?.[2];
    if (keyValue?.toLowerCase() !== key)
      continue;
    const contentMatch = tag.match(RE_META_CONTENT);
    const content = contentMatch?.[1] ?? contentMatch?.[2];
    if (content)
      return content;
  }
  return void 0;
}
function resolveTargetPath(event) {
  const pathname = parseURL(event.path).pathname;
  const stripped = pathname.replace(RE_STRIP_PREFIX, "") || "/";
  return stripped.replace(RE_IMAGE_EXT, "") || "/";
}
const resolve = defineEventHandler(async (event) => {
  const runtimeConfig = useOgImageRuntimeConfig(event);
  const security = runtimeConfig.security;
  if (security?.maxQueryParamSize && false) ;
  const targetPath = resolveTargetPath(event);
  if (targetPath.length > MAX_RESOLVE_PATH_LENGTH) {
    throw createError({
      statusCode: 400,
      statusMessage: `[Nuxt OG Image] Target path exceeds ${MAX_RESOLVE_PATH_LENGTH} characters.`
    });
  }
  if (targetPath.includes("://") || RE_DOUBLE_LEADING_SLASH.test(targetPath)) {
    throw createError({
      statusCode: 400,
      statusMessage: "[Nuxt OG Image] Target path must be a same-origin path."
    });
  }
  if (isInternalRoute(targetPath)) {
    throw createError({
      statusCode: 400,
      statusMessage: "[Nuxt OG Image] Cannot resolve og:image for internal route."
    });
  }
  const query = getQuery(event);
  const ogKey = typeof query._og_key === "string" ? query._og_key.toLowerCase() : "";
  const metaKey = ogKey === "twitter" ? "twitter:image" : "og:image";
  const forwardQuery = {};
  for (const [k, v] of Object.entries(query)) {
    if (!k.startsWith("_og_"))
      forwardQuery[k] = v;
  }
  const fetchPath = withQuery(withLeadingSlash(targetPath), forwardQuery);
  const html = await event.$fetch(fetchPath, {
    headers: { accept: "text/html" },
    responseType: "text"
  }).catch((err) => {
    throw createError({
      statusCode: 502,
      statusMessage: `[Nuxt OG Image] Failed to fetch ${fetchPath}: ${err?.message || "unknown error"}`
    });
  });
  const resolved = extractMeta(String(html), metaKey);
  if (!resolved) {
    throw createError({
      statusCode: 404,
      statusMessage: `[Nuxt OG Image] No <meta property="${metaKey}"> found on ${fetchPath}.`
    });
  }
  return sendRedirect(event, resolved, 302);
});

export { resolve as default };
//# sourceMappingURL=resolve.mjs.map
