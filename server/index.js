// import
const express = require("express");
const jsonServer = require("json-server");
const path = require("path");
const cors = require("cors");
const { z } = require("zod");

// setup express app
const server = express();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults({ noCors: true });
server.use(middlewares);
server.use(cors());
server.use(express.json());
const db = router.db;

// schema
const EditionInput = z.object({
  name: z.string().min(1, "name is required"),
  edition_id: z.number().int().positive("edition id is required"),
  status: z
    .union([z.literal(0), z.literal(1)])
    .optional()
    .default(1),
  edition_link: z.string().url("edition link must be a valid URL"),
  published_at: z
    .string()
    .refine((s) => !Number.isNaN(Date.parse(s)), "must be a valid date"),
  thumbnail: z.string().url("thumbnail must be a valid URL"),
  __v: z.number().int().nonnegative().optional().default(0),
});

// GET /api/editions
server.get("/api/editions", (req, res) => {
  let editions = db.get("editions").value();
  const { search, status, sortBy, order, page, limit } = req.query;

  if (search)
    editions = editions.filter((e) =>
      e.name.toLowerCase().includes(String(search).toLowerCase())
    );

  if (status !== undefined)
    editions = editions.filter((e) => String(e.status) === String(status));

  if (sortBy)
    editions = editions.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return order === "desc" ? 1 : -1;
      if (a[sortBy] > b[sortBy]) return order === "desc" ? -1 : 1;
      return 0;
    });

  if (page || limit) {
    const p = parseInt(page) || 1;
    const l = parseInt(limit) || 10;
    const start = (p - 1) * l;
    const end = start + l;
    const paginated = editions.slice(start, end);

    return res.json({
      total: editions.length,
      page: p,
      limit: l,
      results: paginated,
    });
  }

  // default return all
  res.json({ total: editions.length, results: editions });
});

// POST /api/editions
server.post("/api/editions", (req, res) => {
  const parsed = EditionInput.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.errors });
  }

  const payload = parsed.data;
  const id =
    Math.floor(Date.now() / 1000).toString(16) +
    [...Array(8)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");

  const now = new Date().toISOString();
  const newEdition = {
    _id: id,
    ...payload,
    createdAt: now,
    updatedAt: now,
  };

  db.get("editions").push(newEdition).write();
  res.status(201).json(newEdition);
});

// PUT /api/editions/:id
server.put("/api/editions/:id", (req, res) => {
  const { id } = req.params;
  const parseResult = EditionInput.partial().safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ errors: parseResult.error.errors });
  }

  const update = { ...parseResult.data, updatedAt: new Date().toISOString() };

  const found = db.get("editions").find({ _id: id }).value();
  if (!found) return res.status(404).json({ error: "edition not found" });

  const updated = db.get("editions").find({ _id: id }).assign(update).write();
  res.json(updated);
});

// DELETE /api/editions/:id
server.delete("/api/editions/:id", (req, res) => {
  const { id } = req.params;
  const removed = db.get("editions").remove({ _id: id }).write();
  if (removed.length > 0) return res.json({ success: true });
  return res.status(404).json({ error: "edition not found" });
});

// GET /api/editions/:id
server.get("/api/editions/:id", (req, res) => {
  const { id } = req.params;

  const edition = db.get("editions").find({ _id: id }).value();
  if (!edition) return res.status(404).json({ error: "Edition not found" });

  res.json(edition);
});

// fallback
server.use("/api", router);

// start
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}/api`)
);
