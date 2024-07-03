import { base } from "$app/paths";
import ky from "ky";

export const fetchWeb = ky.extend({
  headers: { "content-type": "application/json" },
});

export const fetchApi = ky.extend({
  prefixUrl: `${base}/api`,
  headers: { "content-type": "application/json" },
});
