# API Contract — Dubai Estate Platform

> Phase 2 frontend implementation is designed against these contracts.
> Phase 3 (Express/MongoDB backend) must implement them exactly.

---

## Base URL

```
/api/v1
```

---

## Properties

### `GET /api/v1/properties`

Returns a paginated, filterable, sortable list of published properties.

#### Query Parameters

| Param          | Type       | Default  | Description                                      |
|----------------|------------|----------|--------------------------------------------------|
| `purpose`      | `string`   | —        | `"sale"` or `"rent"`                              |
| `propertyType` | `string[]` | —        | One or more of: `apartment`, `villa`, `townhouse`, `penthouse`, `duplex` |
| `area`         | `string[]` | —        | Area slugs: `dubai-marina`, `downtown-dubai`, etc |
| `minPrice`     | `number`   | —        | Minimum price (inclusive)                         |
| `maxPrice`     | `number`   | —        | Maximum price (inclusive)                         |
| `bedrooms`     | `number[]` | —        | Bedroom counts (0 = Studio)                      |
| `bathrooms`    | `number`   | —        | Minimum bathrooms                                |
| `status`       | `string`   | —        | `"ready"` or `"off-plan"`                         |
| `furnished`    | `string`   | —        | `"furnished"`, `"unfurnished"`, `"semi-furnished"` |
| `amenities`    | `string[]` | —        | Required amenity names                            |
| `developer`    | `string`   | —        | Developer slug                                    |
| `q`            | `string`   | —        | Free-text search (title, description, area, community) |
| `sort`         | `string`   | `newest` | Sort order (see below)                            |
| `page`         | `number`   | `1`      | Page number                                       |
| `limit`        | `number`   | `20`     | Items per page                                    |

**Sort values:** `newest`, `price-asc`, `price-desc`, `area-asc`, `area-desc`, `popular`

#### Response — Success (200)

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "_id": "prop-001",
        "title": "Azure Residences — Panoramic Marina View",
        "slug": "azure-residences-panoramic-marina-view",
        "purpose": "sale",
        "propertyType": "apartment",
        "status": "ready",
        "price": 2850000,
        "currency": "AED",
        "pricePerSqft": 2007,
        "bedrooms": 2,
        "bathrooms": 3,
        "builtUpArea": 1420,
        "location": {
          "address": "Azure Residences, Dubai Marina",
          "community": "Azure Residences",
          "area": "Dubai Marina",
          "city": "Dubai",
          "coordinates": { "lat": 25.0805, "lng": 55.1403 }
        },
        "verificationStatus": "featured",
        "images": [
          {
            "url": "https://...",
            "caption": "Living area",
            "isPrimary": true,
            "width": 1200,
            "height": 800
          }
        ],
        "agent": {
          "_id": "agent-001",
          "firstName": "Sarah",
          "lastName": "Thompson",
          "phone": "+971501234567",
          "avatar": "https://..."
        },
        "createdAt": "2025-09-14T08:00:00Z",
        "updatedAt": "2025-09-20T14:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 12,
      "totalPages": 1
    }
  }
}
```

#### Response — Error (500)

```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Failed to fetch properties."
  }
}
```

---

### `GET /api/v1/properties/:slug`

Returns a single property by its URL slug with populated references.

#### Path Parameters

| Param  | Type     | Description       |
|--------|----------|-------------------|
| `slug` | `string` | Property URL slug |

#### Response — Success (200)

```json
{
  "success": true,
  "data": {
    "_id": "prop-001",
    "title": "...",
    "slug": "...",
    "description": "Full property description...",
    "features": ["Full Marina Views", "High Floor"],
    "amenities": ["Swimming Pool", "Gym"],
    "floorPlans": [{ "url": "...", "title": "Floor Plan — 2BR Type A" }],
    "videos": [{ "url": "...", "title": "Property walkthrough" }],
    "paymentPlan": {
      "onBooking": 10,
      "duringConstruction": 50,
      "onHandover": 40
    },
    "agent": { "...populated agent object..." },
    "developer": { "...populated developer object..." },
    "area": { "...populated area object with nearbyPlaces..." }
  }
}
```

#### Response — Not Found (404)

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Property with slug \"xyz\" not found."
  }
}
```

---

### `GET /api/v1/properties/featured`

Returns featured properties (verificationStatus === "featured").

| Param   | Type     | Default | Description     |
|---------|----------|---------|-----------------|
| `limit` | `number` | `6`     | Max results     |

---

### `GET /api/v1/properties/:slug/similar` (or `:id/similar`)

Returns properties similar to the given property (matches area, type, or price range ±30%).

| Param   | Type     | Default | Description     |
|---------|----------|---------|-----------------|
| `limit` | `number` | `3`     | Max results     |

---

### `POST /api/v1/properties`

Creates a new property. Slug is auto-generated from `title`.

* **Auth requirement:** None in Phase 3 (Open development baseline; will be protected with JWT/Admin in Phase 5).
* **Content-Type:** `application/json`

#### Request Body Example:
```json
{
  "title": "Sobha Hartland Waterfront Villa",
  "purpose": "sale",
  "propertyType": "villa",
  "status": "ready",
  "publishStatus": "published",
  "price": 14500000,
  "currency": "AED",
  "bedrooms": 5,
  "bathrooms": 6,
  "builtUpArea": 5800,
  "location": {
    "address": "Hartland Estate, Mohammed Bin Rashid City",
    "community": "Sobha Hartland",
    "area": "Mohammed Bin Rashid City",
    "city": "Dubai"
  },
  "agentRef": "651a2b3c4d5e6f7a8b9c0d1e",
  "description": "Exquisite 5-bedroom villa surrounded by lush greenery and direct lagoon access.",
  "features": ["Private Pool", "Landscaped Garden", "Smart Home"],
  "amenities": ["Swimming Pool", "Gym", "Concierge"],
  "images": [
    {
      "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "caption": "Villa exterior",
      "isPrimary": true
    }
  ]
}
```

#### Response — Success (201)
```json
{
  "success": true,
  "data": {
    "_id": "6718a...",
    "title": "Sobha Hartland Waterfront Villa",
    "slug": "sobha-hartland-waterfront-villa",
    "purpose": "sale",
    "propertyType": "villa",
    "price": 14500000,
    "publishedAt": "2026-10-23T11:40:00.000Z",
    "createdAt": "2026-10-23T11:40:00.000Z"
  },
  "message": "Property created successfully"
}
```

---

### `PATCH /api/v1/properties/:id`

Updates an existing property. Regenerates `slug` automatically if `title` is modified.

* **Auth requirement:** None in Phase 3.
* **Params:** `id` (24-character hexadecimal MongoDB ObjectId)

#### Response — Success (200)
```json
{
  "success": true,
  "data": {
    "_id": "6718a...",
    "title": "Sobha Hartland Waterfront Villa (Updated)",
    "slug": "sobha-hartland-waterfront-villa-updated",
    "price": 15000000
  },
  "message": "Property updated successfully"
}
```

---

### `DELETE /api/v1/properties/:id`

Deletes a property by its ObjectId.

* **Auth requirement:** None in Phase 3.
* **Params:** `id` (24-character hexadecimal MongoDB ObjectId)

#### Response — Success (200)
```json
{
  "success": true,
  "data": null,
  "message": "Property deleted successfully"
}
```

---

## Health & System

### `GET /health` or `GET /api/v1/health`

System health check endpoint.

#### Response — Success (200)
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "uptime": 128,
    "database": "connected",
    "timestamp": "2026-10-23T11:40:00.000Z"
  },
  "message": "API is healthy"
}
```

---

## Standard Error Formats

All error responses strictly follow the standard shape:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "fields": {
      "purpose": "Invalid enum value. Expected 'sale' | 'rent'"
    }
  }
}
```

### Standard Status Codes

| Code | Error Code | Description |
|------|------------|-------------|
| 400 | `BAD_REQUEST` | Malformed parameter or bad database CastError |
| 404 | `NOT_FOUND` | Resource (property or route) not found |
| 409 | `CONFLICT` | Duplicate key conflict (e.g. unique slug or email) |
| 422 | `VALIDATION_ERROR` | Schema validation error with field-level details |
| 429 | `RATE_LIMIT` | Too many requests from client IP |
| 500 | `INTERNAL_ERROR` | Internal server error (stack trace sanitized) |

---

## Mongoose Schema Notes (Phase 3)

```
Property:
  - slug: unique, indexed, auto-generated from title
  - publishStatus: indexed (most queries filter published)
  - purpose: indexed
  - propertyType: indexed
  - price: indexed (range queries)
  - bedrooms: indexed
  - location.area: text-indexed
  - areaRef: ObjectId ref → Area
  - developerRef: ObjectId ref → Developer
  - agentRef: ObjectId ref → Agent (required)
  - verificationStatus: indexed

Compound indexes:
  - { publishStatus: 1, purpose: 1, price: 1 }
  - { publishStatus: 1, location.area: 1, propertyType: 1 }
  - { publishStatus: 1, bedrooms: 1, price: 1 }
```
