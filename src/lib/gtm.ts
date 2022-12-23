// refs https://github.com/vercel/next.js/blob/canary/examples/with-google-tag-manager/lib/gtm.js
// refs https://github.com/vercel/next.js/discussions/20784#discussioncomment-4101864

type WindowWithDataLayer = Window & {
  dataLayer: Record<string, unknown>[];
};

declare const window: WindowWithDataLayer;

export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID;

export const pageview = (url: string) => {
  window.dataLayer.push({
    event: "pageview",
    page: url,
  });
};
