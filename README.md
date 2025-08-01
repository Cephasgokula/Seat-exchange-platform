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
| ![home](docs/ss-home.png) | ![offer](docs/ss-offer.png) | ![queue](docs/ss-queue.png) |

---

## ⚡ Quick Start (local)

```bash
git clone https://github.com/your-org/seatswapu.git
cd seatswapu
pnpm install          # or npm / yarn
cp .env.example .env  # add your LDAP & Redis creds
pnpm dev              # Next.js on http://localhost:3000
