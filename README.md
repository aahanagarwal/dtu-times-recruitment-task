# DTU Times Recruitment Task

Task: https://docs.google.com/document/d/10oBrJ2BL-ZXLJWWBKfOeahG83xDLFRMJsW_GFLi1Sr0/edit?tab=t.0#heading=h.ag2wigmbzby8

---

### Setup

1. clone the github on your system: `git clone https://github.com/aahanagarwal/dtu-times-recruitment-task`.
2. to start the frontend locally, run `npm i` in the root `/` directory followed by `npm run dev`, the nextjs frontend will be up.
3. for backend, move to the `/server` directory, run `npm i` and then `npm run start` which would start the api on your localhost.

---

### Feature Overview

1. the frontend has a very basic landing page on `/` with a navbar, allowing the user to get to `/editions` where all of the editions are listed along with their complete details.
2. here, the user can edit/delete the editions. the page also has a floating button to add a new edition.
3. the backend is a simple expressjs app using json server to store data, it has route handling for basic CRUD operations on the editions db.
4. the UI is completely responsive for all device sizes.

\* authentication has not been implemented as not mentioned in the assignment shared. though the same would be mandatory when dealing with such data and operations at production level.

---

### Working Demo Links

[Video Demo](https://drive.google.com/file/d/1FLCn-tWStbZhVRT0qfT1hfCWlvNgBzW6/view?usp=sharing)
[Deployed Frontend](https://dtu-times-recruitment-task.vercel.app/)
[Deployed Backend](https://dtu-times-recruitment-task.onrender.com)

\* Note: the API has been hosted on render's free tier, which puts it into sleep mode after sometime of inactivity. When trying to access `/editions`, it could take upto 50 seconds for the page to load for the 1st time.

---

### Tech Stack

1. fronted is a `Next.js` app, used with `Mantine UI` for components.
2. backend is an `Express.js` app with `JSON Server` for db.

---

### API Documentation

the api has simple CRUD operations implemented, with `cors` and `zod` used for allowing frontend backend communication and data validation respectively. `JSON Server` is used to store data.

#### Edition Schema:

- name (string, required) → the edition name.
- edition_id (integer, required) → positive integer id of the edition.
- status (0 or 1, optional, default = 1) → publication status: 0 = draft, 1 = published
- edition_link (string, required) → a valid URL to the edition.
- published_at (string, required) → a valid date (ISO-8601 parsable).
- thumbnail (string, required) → a valid URL of the edition thumbnail.
- \_\_v (integer, optional, default = 0) → version field, non-negative integer.

#### Routes:

1. **`GET /api/editions`**

   - fetches all editions.
   - query params:
     - `search` → filter by name.
     - `status` → filter by status (0/1).
     - `sortBy` + `order` → sort results (asc/desc).
     - `page` + `limit` → pagination.
   - response: `{ total, page?, limit?, results: [] }`.

2. **`POST /api/editions`**

   - creates a new edition.
   - validates body with edition schema.
   - auto-generates `_id`, `createdAt`, `updatedAt`.
   - returns created edition.
   - errors: `400` with validation issues.

3. **`PUT /api/editions/:id`**

   - update an edition (partial updates allowed).
   - validates input, updates `updatedAt`.
   - errors: `400` (invalid data), `404` (not found).
   - returns updated edition.

4. **`DELETE /api/editions/:id`**

   - delete edition by ID.
   - returns `{ success: true }` if removed.
   - errors: `404` if not found.

5. **`GET /api/editions/:id`**
   - fetch a single edition by ID.
   - errors: `404` if not found.
   - returns edition object.

---

---
