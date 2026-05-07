This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Konserin

Concert Journey adalah platform all-in-one yang membantu penonton konser merencanakan dan memantau semua aspek perjalanan konser mereka, mulai dari tiket dan akomodasi, hingga transportasi dan manajemen keramaian pada hari pelaksanaan acara.

## Fitur

### Pemesanan Tiket Konser
Cari konser mendatang di Jakarta, lihat detail venue dan jadwal, lalu pesan tiket langsung dari aplikasi. Mendukung berbagai kategori tiket (VIP, Regular, Festival) dengan maksimal 4 tiket per transaksi.

### Rekomendasi Akomodasi
Temukan dan pesan hotel di sekitar venue konser. Rekomendasi diurutkan berdasarkan jarak sehingga penonton dari luar kota dapat dengan mudah menemukan tempat menginap yang paling nyaman.

### Transportasi Luar Kota
Rencanakan perjalanan menuju dan dari Jakarta dengan pilihan moda kereta, pesawat, atau bus. Terintegrasi dengan platform eksternal (seperti Traveloka dan KAI) melalui deep link untuk kemudahan pemesanan.

### Panduan Transportasi Umum Dalam Kota
Dapatkan rute optimal menggunakan transportasi umum Jakarta (TransJakarta, MRT, JakLingko) dari hotel ke venue dan sebaliknya. Dilengkapi estimasi waktu tempuh, biaya, serta tautan langsung ke Google Maps untuk navigasi.

### Exit Guide & Crowd Tracking
Pada hari konser, fitur Exit Guide membantu penonton menavigasi keluar venue menuju titik jemput yang dipilih. Crowd Tracker memantau jumlah pengguna di setiap zona penjemputan secara real-time — jika suatu zona sudah penuh, sistem otomatis merekomendasikan alternatif terdekat yang masih tersedia untuk mengurangi penumpukan massa.

### Dashboard Terpadu
Satu halaman dashboard yang merangkum semua pemesanan aktif — tiket konser, reservasi hotel, dan transportasi — disusun secara kronologis untuk kemudahan pemantauan perjalanan.

---

## Backend

| Aspek | Detail |
|---|---|
| Framework | Gin (routing & manajemen endpoint API) |
| Database | PostgreSQL melalui Supabase, dengan `sqlc` untuk generate kode Go yang type-safe |
| Infrastruktur | Dibungkus Docker dan di-deploy secara serverless ke Microsoft Azure |
| Autentikasi | JWT (JSON Web Token) dengan Role-Based Access Control (RBAC) melalui Gin Middleware |
| Platform yang Didukung | Android, iOS (mobile browser), Windows/macOS (desktop browser) |

### Gambaran Umum API

Backend menyediakan endpoint RESTful API untuk modul-modul berikut:

- **Auth** — Registrasi, login, dan manajemen sesi berbasis JWT. Mengembalikan `HTTP 200` beserta token jika berhasil, `HTTP 401` jika kredensial salah, dan `HTTP 403` jika akses tidak diizinkan.
- **Tiket Konser** — Mengambil data konser yang tersedia dan membuat pemesanan yang terhubung ke sesi pengguna.
- **Akomodasi** — Mengambil dan memesan hotel yang difilter serta diurutkan berdasarkan jarak ke venue.
- **Transportasi Luar Kota** — Mengambil opsi transportasi berdasarkan kota asal dan tanggal perjalanan.
- **Transportasi Umum** — Menghasilkan rute transportasi umum antara lokasi pengguna dan venue.
- **Dashboard** — Mengagregasi semua pemesanan aktif pengguna yang sedang login ke dalam satu tampilan timeline.

---

## Kredit

Tim: Klepon Boys

| Nama | Peran |
|---|---|
| Falah Aqlyalanadhif | Project Manager & Frontend Developer |
| Rafa Attamimi Adnan Atmaja | Backend Developer |
| Devondra Fataputra | Creative Designer |
| Irsyad Rayyan Putra Herdiyanto | Proposal Writer |
| Moses Gabriel Antoni | Proposal Writer |

---

*Jakarta, April 2025*
