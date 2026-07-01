# 💸 Family Expense Tracker

A modern full-stack expense tracking application built as a monorepo using Turborepo. It helps users track, categorise, and analyse their personal spending with a clean dashboard experience and full authentication.

---

## ✨ Features

### 🔐 Authentication
- User registration and login with JWT-based authentication
- Secure password hashing with bcrypt
- Protected routes and user session handling
- Persistent authentication across sessions

### 💰 Expense Management
- Create, edit, and delete expenses
- Assign multiple categories per expense
- Fast, modal-based workflows for adding and updating data
- Confirmation flow for deletions

### 📊 Dashboard Insights
- Monthly spending overview
- Spending breakdown by category
- Recent transactions (current week view)
- Filterable monthly expense table by category

### 🏷️ Categories
- Predefined and custom categories
- Multi-category tagging per expense
- Interactive category filters using selectable chips

---
## 🧭 User Experience

After logging in, users are taken to a dashboard that provides a quick financial overview:

- A prominent “Add Expense” button opens a modal form for quick entry
- Recent transactions show activity for the current week
- Monthly expenses table allows deep filtering by category
- Inline actions allow editing or deleting expenses directly from tables
- A clean sign-out action is always available in the top navigation

---

## 🏗️ Architecture

This project is structured as a monorepo using **Turborepo** and **pnpm workspaces**:

```
apps/
  web/   → Next.js frontend (React, MUI, TanStack Query)
  api/   → NestJS backend (Prisma, PostgreSQL, JWT)
```

### Frontend
- Next.js (App Router)
- TypeScript
- Material UI (MUI)
- TanStack Query for server state
- React Hook Form + Zod for validation

### Backend
- NestJS (modular architecture)
- PostgreSQL database
- Prisma ORM
- JWT authentication
- Class Validator / Transformer

### Infrastructure
- Dockerised PostgreSQL for local development
- Prisma migrations and seed scripts
- Shared environment configuration across apps

---

## 🧠 Key Design Principles

- Clean separation of frontend and backend concerns
- Strongly typed API contracts with TypeScript
- Secure authentication and authorization
- Scalable modular backend structure
- Reusable UI components and consistent design system
- Optimistic UI updates for better UX

---

## 🚀 Getting Started

```bash
$ docker compose up
cd apps/api
pnpm prisma migrate deploy
pnpm prisma generate
pnpm prisma db seed
pnpm prisma studio
```
