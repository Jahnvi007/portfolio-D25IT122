# Task Manager API — Practical 4 + Practical 5

A RESTful backend for a Task Management system, built with Node.js,
Express, and MongoDB (via Mongoose). Practical 4 built the Express
CRUD skeleton with an in-memory array; Practical 5 replaces that array
with a real MongoDB-backed `Task` model and schema validation.

## Setup

```bash
npm install
cp .env.example .env   # then edit MONGO_URI to point at your MongoDB
npm start
```

Server runs on `http://localhost:5000` once MongoDB is connected.

## Task schema (Mongoose)

| Field         | Type    | Rules                                   |
|---------------|---------|------------------------------------------|
| title         | String  | required, trimmed                       |
| description   | String  | optional                                |
| completed     | Boolean | default `false`                         |
| priority      | String  | enum `low` / `medium` / `high`, default `medium` |
| createdAt     | Date    | default `Date.now`                      |

Ids are MongoDB ObjectIds (24-char hex strings), not sequential integers.

## Endpoints

| Method | Route         | Description          | Success Status |
|--------|---------------|-----------------------|-----------------|
| GET    | /tasks        | List all tasks        | 200             |
| GET    | /tasks/:id    | Get a single task     | 200 / 404       |
| POST   | /tasks        | Create a task          | 201             |
| PUT    | /tasks/:id    | Update a task          | 200 / 404       |
| DELETE | /tasks/:id    | Delete a task          | 204 / 404       |

All POST/PUT requests must send `Content-Type: application/json`,
otherwise the API responds `415 Unsupported Media Type`.

## Example requests (curl)

```bash
# Create a task
curl -X POST http://localhost:5000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Write MATURITY.md"}'

# Get all tasks
curl http://localhost:5000/tasks

# Update a task (use a real _id from a GET /tasks response)
curl -X PUT http://localhost:5000/tasks/64f1c2a5e1b2c3d4e5f6a7b8 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Delete a task
curl -X DELETE http://localhost:5000/tasks/64f1c2a5e1b2c3d4e5f6a7b8
```

## Middleware pipeline

1. `express.json()` — parses JSON request bodies
2. `requestLogger` — logs method, URL, timestamp for every request
3. `requireJson` — rejects POST/PUT without `application/json` Content-Type
4. Task routes (each with `validateTaskId` on `:id` routes)
5. `notFound` — 404 handler for undefined routes
6. `errorHandler` — global error handler (registered last)

## Project structure

```
task-manager-api/
├── server.js
├── package.json
├── .env.example
├── models/
│   └── Task.js
├── controllers/
│   └── taskController.js
├── routes/
│   └── taskRoutes.js
└── middleware/
    ├── logger.js
    ├── requireJson.js
    ├── validateTaskId.js
    ├── notFound.js
    └── errorHandler.js
```

## Key Questions (Analysis)

- **Why must the error handling middleware be last?** Express walks the
  middleware stack in order. If the error handler is registered before
  routes, it never gets a chance to catch errors those routes throw —
  errors are only routed to error handlers that come *after* the code
  that threw them, via `next(err)`.
- **`app.use()` vs. route-specific middleware?** `app.use()` (with no
  path, or a path prefix) runs for every matching request regardless of
  HTTP method. Route-specific middleware (e.g. `router.get('/:id',
  validateTaskId, handler)`) only runs for that exact method + path.
- **Why not send raw stack traces to the client?** Stack traces expose
  file paths, internal logic, and library versions — useful information
  for an attacker, and irrelevant/confusing to a legitimate API
  consumer. Log the stack server-side; return a generic message to the
  client.

The Richardson Maturity Model evaluation for this API lives in the
separate `assignment-w4-<rollno>` repository (see `MATURITY.md` there),
per the Week 4 assignment brief.
