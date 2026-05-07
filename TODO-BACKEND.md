# TODO - Backend

Below is a breakdown of fields and functionality the frontend expects but the backend doesn't currently support (per `BACKEND-GUIDE.md`).

---

## 1. Missing Fields on Existing Models

### Concerts (`GET /concerts`, `GET /concerts/:id`)
| Missing Field | Why |
|---|---|
| `ImageURL` or `PosterURL` (string) | Landing page carousel and concert cards show concert images/thumbnails |

### Hotels (`GET /hotels`, `GET /hotels/:id`)
| Missing Field | Why |
|---|---|
| `Images` or `ImageURLs` (string[]) | Hotel detail popup shows a gallery: `img1`, `img2`, `img3` |
| `Description` (string) | Hotel popup shows a description/blurb |
| `BestChoice` or `IsRecommended` (bool) | Frontend marks some hotels as "best choice" |

### User Registration (`POST /register`)
| Missing Field | Why |
|---|---|
| `first_name` (string) | Signup page collects First Name + Last Name |
| `last_name` (string) | Same as above |

### Venues (referenced in concert responses + `/venue/:id/pickups`)
| Missing Field | Why |
|---|---|
| `ImageURL` (string) | Venue/concert pages could show venue images |
| `Description` (string) | Venue descriptions for context |
| `Address` (string) | Venues only have Lat/Lng, no address string |

---

## 2. Missing Endpoints

### Intercity Transport Ticket Listings
The frontend's "Transport To" and "Transport From" wizard steps let users:
1. Pick an **origin city** and **origin hub** (e.g., Jakarta → Soekarno-Hatta for plane, Gambir for train)
2. Pick a **destination hub** (e.g., Yogyakarta → Tugu Station)
3. Pick a **ticket option** showing: provider name, price, departure time, class

The backend only has `POST /intercities` / `GET /intercities` for creating/viewing transport **plans**. There is no endpoint to **browse available transport ticket options** (flights/trains with schedules and prices).

**Needed endpoint:**
- `GET /transport-options?origin=X&destination=Y&mode=plane|train` — returns available schedules with provider name, price, departure/arrival time, class

Or alternatively, seed the transport listings as entities and expose:
- `GET /cities` — list cities with their transport hubs (airports, train stations)
- `GET /transport-options?from_hub=X&to_hub=Y` — available tickets

### City / Transport Hub Data
The frontend hardcodes a list of cities with their plane/train hubs. The backend has no concept of cities or hubs.

**Needed:**
- `GET /cities` — returns `{ id, name, hubs: { plane: string[], train: string[] } }`
- `GET /cities/:id/hubs` — returns hubs for a specific city

### Standalone Venue Endpoints
Venue info is embedded inside concert responses, but there's no way to fetch venues independently.

**Needed:**
- `GET /venues` — list all venues
- `GET /venues/:id` — get venue details

These matter because:
- Crowd check-in uses `/venue/:id/pickups` — you need a venue list first
- Local routing uses `/route/:id` (where `:id` is a venue ID) — same issue

### Individual Detail Endpoints for Bookings
Only list endpoints exist. Frontend detail modals would benefit from individual item fetches.

**Needed:**
- `GET /hotelbookings/:id` — single hotel booking detail
- `GET /ticketorders/:id` — single ticket order detail
- `GET /intercities/:id` — single transport plan detail
- `GET /crowdcheckins` — list past check-ins (currently only POST exists)
- `GET /crowdcheckins/:id` — single check-in detail

### Forgot / Reset Password
The frontend has a `/forgot-password` page but the backend has no password reset flow.

**Needed:**
- `POST /forgot-password` — send reset email/link
- `POST /reset-password` — set new password with token

---

## 3. Missing Functionality / Notes

### Transport Plan Response Should Include Ticket Details
Currently `GET /intercities` only returns `{ OriginCity, TransportMode, DepartureDate, ReturnDate, Status }`. The frontend expects to show actual ticket/provider details (e.g., "Garuda Indonesia GA-202", $45, 08:00 departure). Consider joining transport plans with a ticket/booking reference.

### Venue ID Path Inconsistency
- Concert routing uses `/concerts/:id` (plural)
- Ticket listing uses `/concert/:id/tickets` (singular)
- Pickup points use `/venue/:id/pickups` (singular)
- Route uses `/route/:id` (no venue prefix)

Pick a consistent pattern (e.g., always use plural resource names).

### Dashboard Covers the Right Aggregation
`GET /dashboard` already returns the aggregated data the frontend `ConcertPlan` model needs (concert info, hotel booking, intercity transport in one response). No changes needed there.

### Crowd Check-in Response Uses UUID for ID
`POST /crowdcheckins` returns `"ID": "uuid-string"` while other resources return integer IDs. Consider keeping consistent ID types across the API.

---

## Summary (for prioritization)

| Priority | Item |
|---|---|
| **P0** | Concert images, hotel images/description, user name fields on register |
| **P0** | Transport ticket listing endpoint (the frontend wizard can't work without it) |
| **P0** | City/hub data endpoint |
| **P1** | Standalone venue endpoints |
| **P1** | Individual booking detail endpoints |
| **P2** | Forgot/reset password flow |
| **P2** | Venue image + description fields |
| **P3** | API naming consistency (/concert vs /concerts, /venue vs /venues) |
| **P3** | ID type consistency (int vs UUID) |
