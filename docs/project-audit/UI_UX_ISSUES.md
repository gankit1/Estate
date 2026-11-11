# UI/UX Audit Report — Dubai Real Estate Platform

**Audit Date:** October 26, 2026  
**Auditor:** Senior UX Architect & Visual Design Lead  
**Scope:** Visual aesthetics, typography, responsiveness, luxury branding, spacing, imagery, and interactive states.  
**Standard of Comparison:** Top-tier Dubai luxury real-estate brokerages (Emaar Properties, Sotheby's International Realty UAE, Luxhabitat, DAMAC Properties, Haus & Haus).

---

## 1. Executive Visual Assessment

The current visual design represents a functional developer prototype rather than an ultra-luxury Dubai real estate portal. In the ultra-high-net-worth Dubai market (AED 10M–100M+ properties in Palm Jumeirah, Downtown, Emirates Hills), visual presentation is paramount. The current UI suffers from:
1. **Generic, flat aesthetic:** Sharp square corners (`rounded-sm`), heavy dark borders, and flat card backgrounds feel clinical and utilitarian rather than warm, opulent, and bespoke.
2. **Typography hierarchy weaknesses:** Headings lack editorial drama; prices lack typographic prominence; specs (beds, baths, sqft) lack elegant iconography.
3. **Placeholder-heavy sections:** Prominent gray boxes with *"Interactive map coming soon"* erode trust and give an incomplete prototype impression.
4. **Desktop search friction:** Hero search and catalog filter sidebar require manual button clicks ("Apply Filters") rather than responsive or seamless micro-interactions.

---

## 2. Detailed UI/UX Issues Register

### ISSUE-UI-01: Hero Section Lacks Luxury Grandeur and Dynamic Appeal
- **Route:** `/` (Homepage)
- **Component / File:** `src/app/(marketing)/page.tsx` (`HeroSection`)
- **Severity:** High
- **Problem Description:**
  The hero section uses a static darkened background photo with a heavy dark overlay (`bg-charcoal/60`). The search bar is a plain box with cramped white inputs and standard borders. In modern Dubai luxury portals, hero sections feature high-frame-rate ambient cinematic video reels or high-res full-bleed photography with gold accents, translucent glassmorphism search bars, and bold editorial serif typography.
- **Recommended Improvement:**
  - Introduce an elegant glassmorphism floating search card (`backdrop-blur-md bg-white/10 border border-white/20`).
  - Upgrade hero typography to an editorial serif or refined display font with gold gradient highlights (`from-amber-200 to-amber-500`).
  - Add smooth subtle zoom/pan ambient motion to hero imagery.

---

### ISSUE-UI-02: Property Card Design Feels Utilitarian Rather Than High-End
- **Route:** `/properties` & `/`
- **Component / File:** `src/components/property/PropertyCard.tsx`
- **Severity:** High
- **Problem Description:**
  Property cards have a standard square aspect ratio, rigid `rounded-sm` corners, plain white borders, and small typography. The price (e.g. `AED 2,850,000`) is visually under-emphasized and lacks typographic weight. The spec badges (beds, baths, area) are crammed into a plain gray line.
- **Recommended Improvement:**
  - Increase image aspect ratio to 16:10 or 3:2 with subtle gradient overlays for badge contrast.
  - Implement luxury card styling: borderless soft elevations, subtle warm gold hover borders (`hover:border-gold/50`), and image micro-zoom (`group-hover:scale-105`).
  - Emphasize price with large, crisp luxury typography and gold badge accents for "Featured", "Exclusive", and "Off-Plan".

---

### ISSUE-UI-03: Filter Sidebar UX Friction ("Apply Filters" Requirement)
- **Route:** `/properties`
- **Component / File:** `src/components/property/FilterPanel.tsx`
- **Severity:** Medium
- **Problem Description:**
  On desktop, clicking any filter pill (e.g., "Rent", "Apartment", "2 Beds") updates internal state, but does NOT update the results until the user scrolls down and clicks the "Apply Filters" button. Users expect instant dynamic filtering on desktop. Furthermore, price inputs lack an "AED" currency prefix inside the input field.
- **Recommended Improvement:**
  - On desktop, enable instant reactive filtering (with 300ms debounce on text/price inputs) or keep "Apply" sticky and visible.
  - Add formatted "AED" prefix adornments inside min/max price inputs.
  - Add interactive slider components for Price and Square Footage.

---

### ISSUE-UI-04: Property Detail Gallery Lacks Immersive Experience
- **Route:** `/properties/[slug]`
- **Component / File:** `src/components/property/PropertyGallery.tsx`
- **Severity:** Medium
- **Problem Description:**
  The property gallery consists of one main photo and a row of small thumbnail boxes. High-end buyers expect a full-width panoramic hero gallery, a multi-photo grid layout (like Airbnb/Sotheby's 5-photo showcase), a floor plan viewer, and virtual tour modal.
- **Recommended Improvement:**
  - Implement a modern 5-image mosaic layout for desktop with "View All Photos" count badge.
  - Enhance lightbox with keyboard arrow navigation, swipe gestures for mobile, and high-res fullscreen zoom.

---

### ISSUE-UI-05: Prominent "Interactive Map Coming Soon" Placeholders
- **Route:** `/properties` & `/properties/[slug]`
- **Component / File:** `src/app/(marketing)/properties/[slug]/page.tsx` & `PropertyListingContent.tsx`
- **Severity:** Medium
- **Problem Description:**
  Both the catalog map view toggle and the property detail location section display empty sand-colored boxes with text stating *"Interactive map coming soon"*. This damages the website's professional credibility.
- **Recommended Improvement:**
  - Integrate a real interactive Mapbox or Google Maps dark/light luxury styled map showing property pins, landmark distances, and neighborhood boundaries.

---

### ISSUE-UI-06: Mobile Bottom Sticky Bar Obscures Footer Content
- **Route:** `/properties/[slug]` (Mobile viewport < 768px)
- **Component / File:** `src/components/property/EnquirySidebar.tsx` (`MobileCTA`)
- **Severity:** Low
- **Problem Description:**
  On mobile devices, the fixed bottom CTA bar (`WhatsApp`, `Call`, `Book Viewing`) is permanently pinned to the bottom of the screen. When users scroll to the bottom of the page, the bar overlays footer copyright and legal disclaimer links.
- **Recommended Improvement:**
  - Add bottom padding (`pb-24`) to mobile detail page layout so footer content scrolls completely clear of the sticky bar.

---

### ISSUE-UI-07: Low Color Contrast on Secondary Muted Text
- **Route:** Sitewide
- **Component / File:** `src/app/globals.css`, `src/components/`
- **Severity:** Medium
- **Problem Description:**
  Subtle labels using `text-sand-400` or `text-text-muted` on off-white or sand backgrounds (`bg-sand-50`) fall below WCAG 2.1 AA 4.5:1 color contrast ratio.
- **Recommended Improvement:**
  - Darken secondary text token values to `#57534E` (stone-600) to ensure readability and compliance.
