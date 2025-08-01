
# SeatSwapU

> **Real-time seat-trading marketplace for university courses**  
> Swap or grab seats after add/drop without breaking any rules.

---

## 🚀 30-Second Pitch
SeatSwapU lets students who **want to drop** a course instantly match with classmates who **need in**, handles a 15-minute lock window to complete the swap, and keeps everything **FERPA-safe**.  
North-star: ≥ 80 % of posted seats are transferred within 24 h.

---

## 📸 Live Screens
| Home Search & Stats | Offer Modal | Queue View |
|---|---|---|
| ![home]() | ![offer]() | ![queue]() |

---

## ⚡ Quick Start (local)

```bash
git clone https://github.com/your-org/seatswapu.git
cd seatswapu
pnpm install          # or npm / yarn
cp .env.example .env  # add your LDAP & Redis creds
pnpm dev              # Next.js on http://localhost:3000

```
---

## 🧪 One-Command Mock Mode
No backend? No problem.

```bash
pnpm mock
```
Spins up a JSON-Server with synthetic CRNs for UI-only demos.

---

## 🧰 Tech Highlights
- **Next.js 14** (App Router, SSR)  
- **Node 20 + Express 4**  
- **PostgreSQL 15 + Prisma ORM**  
- **Redis 7** (fair-queue & rate-limit)  
- **Socket.io 4** (real-time matches)  
- **OneSignal** push + email fall-back  
- **TailwindCSS** + **Radix UI** components  
- **GitHub Actions → AWS ECS Blue/Green**

---

## 🔐 Security & Compliance
- Campus **LDAP / Azure AD SSO**  
- **FERPA-safe**: only CRNs & hashed student IDs stored  
- OWASP Top-10 hardened, TLS 1.3 everywhere

---

## 📈 API Snippet
```http
POST /api/v1/seats/offer
{ "crn": "CS101-001", "reason": "time_conflict" }

→ { "offer_id": "uuid", "expires_at": "2025-08-02T15:00:00Z" }
```

---

## 🤝 Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md).  
Open an issue or grab a `good-first-issue` label!

---

## 📄 License
MIT © 2025 SeatSwapU Team
```
