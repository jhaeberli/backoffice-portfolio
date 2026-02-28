# Portfolio Backoffice

A backoffice management application for managing portfolio projects, built with React, TypeScript, and Vite.

## Features

- **Dashboard** – Overview with project statistics
- **Projects** – Full CRUD management of portfolio projects
- **Responsive Layout** – AppBar + collapsible sidebar navigation

## Tech Stack

| Library | Purpose |
|---|---|
| React 18 + TypeScript | UI framework |
| Vite | Build tooling & dev server |
| React Router v7 | Client-side navigation |
| TanStack Query v5 | Server state & data fetching |
| React Hook Form | Form management & validation |
| MUI v7 (Material UI) | Component library & theming |

## Getting Started

```bash
npm install
npm run dev
```

The app runs on [http://localhost:5173](http://localhost:5173).

## Project Structure

```
src/
├── api/          # Mock CRUD API functions (in-memory)
├── components/   # Shared components (Layout)
├── hooks/        # Custom React hooks
├── pages/        # Page components (Dashboard, Projects, NotFound)
├── theme/        # MUI theme configuration
└── types/        # TypeScript interfaces
```

## Build

```bash
npm run build
```
