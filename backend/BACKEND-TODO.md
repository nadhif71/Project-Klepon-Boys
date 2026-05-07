# Backend TODO

## GET /dashboard returns duplicate rows

The `/dashboard` endpoint returns a denormalized JOIN result. When a user has one ticket order with multiple associated records (e.g. intercity transport to + from, hotel booking), the query produces multiple rows sharing the same `TicketOrderID`.

**Current behavior:** A user with 1 ticket order, 2 intercity bookings, and 1 hotel booking gets back multiple rows with `TicketOrderID: 5` — all nearly identical except for the intercity/hotel fields.

**Expected behavior:** One row per `TicketOrderID`. Either:
1. Aggregate the related data in the SQL query (e.g. `DISTINCT ON (ticket_order_id)` or a subquery), or
2. Group results in Go code before returning the response.

**Frontend workaround:** The frontend currently deduplicates by `TicketOrderID` client-side (`app/dashboard/page.tsx`), but this is wasteful and should be fixed at the source.
