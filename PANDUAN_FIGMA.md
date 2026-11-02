# Panduan Akses & Edit Kembali ke Figma

Website ini dibangun 100% mengikuti mockup desain Figma asli Anda (`portofolio.jpg`). Anda dapat mengimpor kembali atau mengeditnya di Figma kapan saja menggunakan beberapa cara praktis berikut:

---

## Cara 1: Menggunakan Plugin "html.to.design" di Figma (Paling Direkomendasikan ⭐)
Plugin resmi ini akan mengubah seluruh halaman website menjadi layer native Figma (Auto-Layout, teks editable, komponen, dan vektor asli).

1. Buka aplikasi **Figma** atau buka di browser [figma.com](https://figma.com).
2. Buat file baru atau buka file desain Anda.
3. Klik kanan di kanvas > **Plugins** > cari **html.to.design** (oleh Divriots) atau **Builder.io**.
4. Jika website dibuka di browser (misalnya dengan Live Server atau dibuka langsung):
   - Salin URL halaman (contoh: `http://localhost:5500` atau URL hosting Anda).
   - Masukkan ke plugin `html.to.design` dan klik **Import**.
5. Desain portofolio akan langsung diubah menjadi frame lengkap dengan susunan layer yang rapi dan siap diedit!

---

## Cara 2: Drag & Drop File Vektor SVG ke Kanvas Figma
Kami telah menyiapkan file vektor SVG siap-pakai:
- Lokasi file: `Downloads/portfolio-ahfash/figma_portfolio_export.svg`
- Cukup buka Figma, lalu tarik (*drag & drop*) file `figma_portfolio_export.svg` langsung ke dalam kanvas Figma.
- Semua elemen (Navbar, Hero, Pendidikan, Pengalaman, Portofolio, Karya Fotografi Ice-Blue, Keahlian, dan Kontak) akan langsung menjadi grup dan layer vektor editable!

---

## Cara 3: Salin Vektor Otomatis Melalui Tombol di Website
1. Buka `index.html` di browser Anda.
2. Di pojok kanan atas navbar, klik tombol **"Edit di Figma"**.
3. Pilih **"Salin Vektor SVG Portofolio ke Figma (Ctrl + V)"**.
4. Buka Figma dan tekan **Ctrl + V** (Paste). Struktur desain akan langsung terpaste di kanvas Figma Anda.

---

## Struktur File Website
```
portfolio-ahfash/
├── index.html                   # Struktur HTML semantik & teroptimasi
├── style.css                    # Styling warna, glassmorphism, & container ice-blue Figma
├── script.js                    # Animasi scroll, video modal YouTube, lightbox foto, & sync Figma
├── figma_portfolio_export.svg   # File vektor Figma siap drag-and-drop
├── PANDUAN_FIGMA.md             # Panduan lengkap integrasi Figma
└── assets/                      # Semua foto & logo resolusi tinggi asli
    ├── hero_nahidh.png
    ├── navbar_logo.png
    ├── logo_uin_walisongo.png
    ├── logo_jogjatv.png
    ├── logo_walisongotv.png
    ├── logo_kordais.png
    ├── logo_lazismu.png
    ├── fotografash_card_logo.png
    ├── thumb_01_sambangan.jpg s/d thumb_14_dieng.jpg
    ├── photography/ (9 foto wisuda resolusi tinggi)
    ├── documentation/ (9 foto behind-the-scenes)
    └── icons/ (Ps, Pr, Ae, LrC, Lr, Resolve, Figma, Canva, CapCut, OBS)
```
