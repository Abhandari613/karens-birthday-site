# 🇸🇻 Karen's 40th Birthday — Masterplan

> *"Debí Tirar Más Fotos"* — A love letter to Karen, El Salvador, and 40 years of memories.

---

## 1. App Overview & Objectives

A custom-built, publicly accessible birthday website created as a personal gift for Karen's 40th birthday. The site serves two phases:

- **Pre-party (March 2–7):** Friends and family contribute photos, videos, and personal messages/memories
- **Party night (March 7):** The site becomes a live, celebratory experience — a shared memory wall, photo timeline, and music playlist revealed to Karen in real time

The emotional core of the site is a love letter to Karen as a proud Salvadoran woman turning 40, anchored visually and culturally in El Salvador, with the vibrant pan-Latin energy of Bad Bunny's *Debí Tirar Más Fotos* album and his 2026 Super Bowl halftime show aesthetic wrapping around it.

---

## 2. Target Audience

| Audience | Role | Experience |
|---|---|---|
| ~9 contributing friends & family | Upload content before the party | Simple, mobile-first submission form |
| Karen | The birthday honoree | Emotional, celebratory reveal experience |
| Party guests | View the wall on the night | Big-screen slideshow / gallery mode |

---

## 3. Core Features & Functionality

### 3.1 Hero Landing Page
- Full-screen animated splash celebrating Karen's 40th
- Countdown timer to March 7th (visible to contributors pre-party)
- Background music playing on load (from curated Spotify embed or uploaded tracks)
- Cultural visual anchors: Flor de Izote, indigo blue tones, El Salvador flag colors, tropical foliage inspired by DTMF aesthetic
- Personal welcome message from the site creator

### 3.2 Unified Media & Memory Submission
A single, dead-simple upload experience — works flawlessly on iPhone, Android, and desktop.

**What guests can submit:**
- Photos (from camera roll, Google Photos, or file system)
- Short videos
- A written memory or message (optional, paired with or without media)
- An approximate year/date for the photo (optional, used for timeline)
- Their name (so Karen knows who contributed)

**UX principles:**
- Maximum 3 taps/clicks to submit on mobile
- Large, clear call-to-action buttons
- No login required — just a shared link
- Visual progress/confirmation after submission ("Your memory has been added! 🎉")

### 3.3 Live Memory Wall / Gallery
- Masonry-style grid of all submitted photos, videos, and messages
- Updates in real time as new submissions come in
- Each card shows the contributor's name and their message
- Tapping/clicking a card expands it for full view
- Filterable by media type (photos / videos / messages)

### 3.4 Real-Time Contributor Counter
- Displays how many of the ~9 friends have submitted
- Light social nudge: *"7 of 9 friends have contributed — don't miss out!"*
- Visible on the landing page and submission page

### 3.5 Photo Timeline
- A visual, chronological journey through Karen's 40 years
- Populated using:
  1. EXIF metadata extracted automatically from uploaded photos (where available)
  2. Optional year field guests fill in during upload
  3. Bulk-imported photos from the existing Google Photos shared album (manually downloaded and uploaded to Supabase Storage)
- Grouped by decade or year
- Designed as a highlight experience for party night

### 3.6 Party / Presentation Mode
- A fullscreen, auto-advancing slideshow of all submitted photos and messages
- Designed to display on a large TV or projector screen at the party
- Smooth transitions, ambient music, no UI chrome
- Karen (or the host) can activate this mode with a single button

### 3.7 Spotify — "Songs That Remind Me of Karen" Playlist
- Guests can search for and add a song to a shared Spotify playlist directly from the site
- Uses Spotify OAuth login (guests briefly log in via Spotify — minimal friction as most are already logged in on their phones)
- Playlist is owned by the site creator's Spotify account
- On March 7th, the playlist is gifted/transferred to Karen as a keepsake she keeps forever
- Embedded Spotify player on the site for ambient music playback

### 3.8 Ambient Background Music
- Curated playlist plays softly on site load
- Draws from Bad Bunny's *Debí Tirar Más Fotos* album + other meaningful tracks
- Powered by Spotify embed (no API key required for playback)
- Subtle, non-intrusive — user can mute

---

## 4. Visual Design & Cultural Identity

### 4.1 Cultural Anchor: El Salvador 🇸🇻
El Salvador is the heart of the site. Every design decision should feel like a love letter to Salvadoran culture:

- **Color palette:** Indigo blue (El Salvador's historic indigo legacy), warm terracotta, deep forest green, and white
- **Flor de Izote** — El Salvador's national flower — used as a recurring decorative motif
- **Izalco Volcano** — used as a dramatic background or hero element
- **La Palma art style** — Fernando Llort's colorful, naive geometric patterns as texture/borders
- **Traditional Pipil textile patterns** — geometric weaving motifs as decorative elements
- **Pupusa references** — warm, celebratory, everyday Salvadoran life

### 4.2 Broader Latin/DTMF Aesthetic Layer
Inspired by Bad Bunny's 2026 Super Bowl halftime show and *Debí Tirar Más Fotos*:

- Lush tropical foliage — plantain trees, sugarcane, tropical flora
- White plastic monobloc chairs (iconic pan-Latin symbol)
- Warm string lights / fiesta atmosphere
- Rich, saturated colors — not flat, feels alive and tactile
- Handwritten / brush-stroke typography mixed with bold display fonts
- Overall feeling: a warm family party, outside, in the tropics, at golden hour

### 4.3 Typography
- Display/Hero: Bold, expressive Latin-flavored typeface (e.g., a script or brush font for Karen's name)
- Body: Clean, warm sans-serif for readability
- Mix of Spanish and English throughout (bilingual feel)

### 4.4 Animation & Motion
- Confetti or flower petal burst on page load
- Subtle parallax scrolling on hero section
- Cards animate in as the gallery loads
- Smooth, celebratory transitions throughout

---

## 5. Technical Stack Recommendations

### 5.1 Development Workflow
```
Google Stitch → Google Antigravity → Supabase → Vercel
```

| Layer | Tool | Purpose |
|---|---|---|
| UI Prototyping | Google Stitch | Design and visual workflow before coding |
| Development | Google Antigravity | Agentic IDE — builds, tests, iterates |
| Backend / Database | Supabase | Database, storage, real-time subscriptions |
| Media Storage | Supabase Storage | Photos and video file hosting |
| Frontend Hosting | Vercel | Deployment, CDN, custom domain |
| Music | Spotify Web API + Embed | Playlist creation and ambient playback |
| Domain | Custom domain (already owned) | Branded URL to share with guests |

### 5.2 Frontend
- **Framework:** Next.js (React-based, works perfectly with Vercel deployment)
- **Styling:** Tailwind CSS for rapid, responsive styling
- **Animations:** Framer Motion for smooth, celebratory transitions
- **Real-time updates:** Supabase Realtime subscriptions (gallery updates live)

### 5.3 Backend / Data
- **Supabase** handles everything:
  - PostgreSQL database for submissions (names, messages, dates, file references)
  - Supabase Storage for photo and video files
  - Supabase Realtime for live gallery updates
  - No separate backend server needed — Supabase client SDK handles it all from the frontend
- **API keys / secrets:** Stored as Vercel environment variables — never exposed to the client

### 5.4 Media Handling
- File uploads go directly to Supabase Storage via the client SDK
- EXIF data extracted client-side (using a JS library) before upload
- Google Photos bulk import: Download shared album as ZIP → extract → bulk upload to Supabase Storage via a one-time script in Antigravity

### 5.5 Spotify Integration
- Spotify Developer App registered under site creator's account
- Guests authenticate via Spotify OAuth to add songs
- Playlist owned by creator, shareable/transferable to Karen post-party
- Embedded Spotify Web Player for ambient background music

---

## 6. Conceptual Data Model

### Submissions Table
| Field | Type | Notes |
|---|---|---|
| id | UUID | Auto-generated |
| contributor_name | String | Who submitted |
| message | Text | Optional memory or note |
| media_url | String | Path to file in Supabase Storage |
| media_type | Enum | photo / video / none |
| photo_year | Integer | Optional — for timeline placement |
| exif_date | Timestamp | Auto-extracted if available |
| created_at | Timestamp | Submission time |

### Spotify Songs Table (optional)
| Field | Type | Notes |
|---|---|---|
| id | UUID | Auto-generated |
| contributor_name | String | Who added the song |
| spotify_track_id | String | Spotify track reference |
| track_name | String | Display name |
| added_at | Timestamp | When it was added |

---

## 7. Security Considerations

- **No user authentication required** — open site by design
- **API secrets:** All Supabase and Spotify credentials stored as Vercel environment variables, never in client code
- **Supabase Row Level Security (RLS):** Configure so that anyone can INSERT submissions (contribute) but only authenticated admin (you) can DELETE or UPDATE
- **File upload limits:** Set max file size limits in Supabase Storage to prevent abuse (e.g., 50MB per file)
- **Rate limiting:** Basic rate limiting on submissions to prevent spam
- **Spotify OAuth:** Handled entirely by Spotify — no credentials stored on your end

---

## 8. Development Phases & Milestones

Given the deadline of **March 2nd** (live for contributions) and **March 7th** (party), here's a realistic build order:

### Phase 1 — Design & Foundation (Day 1)
- [ ] Create visual mockup in Google Stitch
- [ ] Set up Supabase project (database + storage bucket)
- [ ] Initialize Next.js project, connect to Vercel, connect custom domain
- [ ] Establish color palette, typography, and core design tokens

### Phase 2 — Core Submission Flow (Day 2)
- [ ] Build submission form (name, message, photo/video upload)
- [ ] Connect Supabase Storage for file uploads
- [ ] Connect Supabase database for storing submission records
- [ ] EXIF extraction on upload + optional year field
- [ ] Mobile-first responsive design — test on iPhone and Android

### Phase 3 — Gallery & Wall (Day 2–3)
- [ ] Build live memory wall / masonry gallery
- [ ] Wire up Supabase Realtime for live updates
- [ ] Contributor counter component
- [ ] Individual card expansion / lightbox view

### Phase 4 — Visual Polish & Cultural Design (Day 3)
- [ ] Hero section with animated splash and countdown timer
- [ ] Full El Salvador / DTMF visual treatment
- [ ] Animations, transitions, confetti
- [ ] Background music embed (Spotify)

### Phase 5 — Spotify Playlist Feature (Day 3–4)
- [ ] Register Spotify Developer App
- [ ] Implement OAuth flow for guest song addition
- [ ] Song search and add-to-playlist UI
- [ ] Display current playlist on site

### Phase 6 — Timeline & Google Photos Import (Day 4)
- [ ] Build photo timeline component
- [ ] Bulk import from Google Photos shared album
- [ ] Timeline rendering by year/decade

### Phase 7 — Party Mode & Final Polish (Day 4–5, before March 2)
- [ ] Build fullscreen presentation/slideshow mode
- [ ] End-to-end testing on mobile and desktop
- [ ] Share link with contributors
- [ ] Final content review

---

## 9. Potential Challenges & Solutions

| Challenge | Solution |
|---|---|
| Non-tech-savvy guests struggling to upload | Radically simple mobile UI — big buttons, step-by-step, instant confirmation. Consider sending a short "how to contribute" message with the link |
| Videos too large to upload | Set clear file size guidance in the UI; consider compressing client-side before upload |
| EXIF data missing from WhatsApp/social media photos | Optional year field as fallback; populate timeline with what's available |
| Google Photos import | Manual download + bulk upload via script — reliable and fast |
| Spotify OAuth friction for guests | Make it optional — guests who don't want to log into Spotify can skip the playlist feature |
| Karen seeing the site before the party | No login required, but the site URL is only shared with contributors privately. Low risk by design |
| Supabase free tier storage limits | With ~9 contributors uploading photos/videos, free tier (1GB storage) should be sufficient |

---

## 10. Future / Post-Party Possibilities

- **Digital keepsake:** Keep the site live permanently as a memento Karen can revisit
- **Download package:** Generate a ZIP of all photos and memories for Karen to keep offline
- **Print book:** Export the gallery and messages into a photo book via a print service
- **Annual tradition:** Repurpose the codebase for future milestone birthdays or family events
- **Karen's personal site:** Evolve it into a personal page she can maintain

---

## 11. Key Links & Resources (to populate)

- **Live site URL:** TBD (custom domain)
- **Supabase project:** TBD
- **Vercel project:** TBD
- **Spotify Developer App:** TBD
- **Google Stitch prototype:** TBD
- **Contributor sharing link:** TBD (send to 9 guests by March 2nd)
- **Google Photos shared album:** TBD (source for bulk import)

---

*Built with love. Hecho con amor. 🇸🇻🎉*
