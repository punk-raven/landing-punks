# PUNKRAVEN LANDING WEBSITE - MARKETING WEBSITE

### Install dependencies

Use `bun`:

```bash
bun install
```

### Run the development server

```bash
bun dev
```

### Deploy

Hosted on Cloudflare Workers via the `@opennextjs/cloudflare` adapter.

```bash
bun run preview   # build and serve in the local Workers runtime
bun run deploy    # build and deploy manually
```

Pushes deploy automatically through Cloudflare Workers Builds, so `bun run deploy`
is only for out-of-band deploys.

### Environment

`NEXT_PUBLIC_CF_BEACON_TOKEN` - Cloudflare Web Analytics site token. Public by
design (the beacon ships it to the browser); leave it unset locally and the
beacon is not rendered. Set it in the Cloudflare dashboard for the Worker.
