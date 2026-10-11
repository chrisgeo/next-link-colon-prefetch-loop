# next-link-colon-prefetch-loop

Minimal reproduction: a `<Link>` whose href has a raw `:` in a dynamic segment
makes the segment cache prefetch the same URL again and again (no user action).

## Reproduce

1. `npm install`
2. `npm run build && npm start` (port 3417)
3. Open http://localhost:3417 in Chromium. Do nothing.
4. In DevTools > Network, filter `items`. Requests with `_rsc` to `/items/jira:id-4` ... `/items/jira:id-7` repeat without stop.

Control: in `app/page.js` use `encodeURIComponent(id)` in the href. Requests stop.

## Expected vs actual

Expected: a few prefetch requests per link, then none.

Actual (next 16.3.8, production build, 30 s idle, headless Chromium, 12 links):
about 8,000 requests to `/items/*`. Links 0-3: 2 requests each. Links 4-7: about 2,000 each.
Links 8-11: 0. Also seen on next 16.4.0 (9,138) and 16.5.0-canary.7 (9,216).
Encoded href or ids without special characters: 0 requests.
