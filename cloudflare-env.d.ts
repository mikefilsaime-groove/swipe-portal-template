// Optional Cloudflare bindings available to this site.
// Update these declarations if the binding names in .openai/hosting.json change.
declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
  }
}
