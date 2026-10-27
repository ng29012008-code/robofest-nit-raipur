# ROBOFEST 2026 — Futuristic Robotics Festival Landing Page
> **Theme:** NEON FRONTIER — THE FUTURE IS ENGINEERED  
> **Host Organization:** ROBOTiX Club, National Institute of Technology (NIT) Raipur  
> **Individual Frontend Development Recruitment Assignment**  
> 
> 🌐 **Public Live Website Link:** **[https://vzggu-117-236-139-6.run.pinggy-free.link](https://vzggu-117-236-139-6.run.pinggy-free.link)**  
> *(Alternative mirror: https://etbwk-117-236-139-6.free.pinggy.net)*

---

## ⚡ Overview

**ROBOFEST 2026** is a high-concept landing page crafted for the **ROBOTiX Club, NIT Raipur**. Moving beyond generic college event templates, this project delivers the aesthetic of an award-winning creative developer portfolio combined with a high-stakes technology conference and autonomous robotics proving ground.

The visual experience blends deep void backgrounds with electric-blue conduits, neon-orange kinetic accents, technical HUD overlays, oversized editorial typography, and interactive simulated telemetry controls.

---

## 🛠 Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with custom cyber-grid patterns and atmospheric glow filters
- **Icons:** [Lucide React](https://lucide.dev/) + custom high-precision inline SVG brand emblems
- **Audio Feedback:** Native Web Audio API (100% client-synthesized sci-fi frequencies, 0 external audio file dependencies)
- **Visual Assets:** High-resolution 3D Octane-style metallic robotics renders + dynamic SVG CAD schematics

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18.0.0 or higher recommended, tested on Node v26.12.1)
- npm (v9.0.0 or higher)

### Installation & Run

1. **Navigate to the project directory:**
   ```bash
   cd /Users/nikhilgoyal/.gemini/antigravity/scratch/robofest-nit-raipur
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173/`.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The bundled production assets will be generated in `dist/`.

---

## 🎨 Key Design Decisions

1. **Color Palette — "Neon Frontier":**
   - **Backgrounds:** `#05070B` (Deep Black), `#080C14` (Charcoal Void), and `#0D1527` (Midnight Navy).
   - **Primary Accent:** Electric Blue (`#00F0FF`) representing intelligence, perception, and cybernetic logic.
   - **Secondary Accent:** Neon Orange (`#FF6B00`) representing kinetic energy, combat robotics, and heat dissipation.
   - **Restrained Glows:** All glows are bounded with soft blur values and subtle opacity to avoid cluttered neon glare while preserving an Awwwards-caliber look.

2. **Typography Hierarchy:**
   - **Headings:** `Syne` & `Space Grotesk` — bold, geometric, futuristic sans-serifs with tight letter-spacing for high visual dominance.
   - **Body:** `Inter` — highly readable, human-centric, and legible across all viewports.
   - **Technical HUD & Metadata:** `JetBrains Mono` — monospace coordinates, frequencies, and telemetry tags.

3. **Editorial Layout & Asymmetry:**
   - Sections feature an editorial grid (7-column / 5-column splits) with generous negative space, technical framing brackets, and clean section dividers.
   - Strict adherence to guidelines: zero fabricated attendance counts, prize figures, official dates, or fictitious sponsors.

4. **Performance & Accessibility:**
   - Lightweight interactive canvas particle system that automatically respects the user's `prefers-reduced-motion` settings.
   - Touch-friendly 44px+ hit targets on mobile devices.
   - Responsive typography preventing clipped headings on viewports from 360px smartphones to 4K displays.

---

## 🕹 Interactive Features

1. **Synthesized Sci-Fi Audio Feedback:**
   - Built with the native browser Web Audio API (sine/sawtooth frequency sweeps).
   - Includes subtle hover blips, tactile button click thuds, and a multi-stage rising chord when initializing the system.
   - Features a global mute/unmute toggle in the navbar.
2. **Interactive CAD Blueprint (Vision Section):**
   - Selecting **01 BUILD**, **02 COMPETE**, or **03 INNOVATE** highlights the respective engineering subsystem on the central SVG technical schematic in real-time.
3. **Robotics Control Interface (Simulation Testbed):**
   - Central interactive console with dynamic rotating telemetry rings.
   - **"INITIALIZE SYSTEM"** button triggers a simulated boot sequence from `STANDBY` to `SYSTEM ONLINE`, scaling power from 35% to 98%, locking link telemetry at 1.2ms, and streaming real-time diagnostic logs.
   - Interactive subsystem switchers (Actuators, Vision Mesh, Neural Core, Telemetry RF).
4. **Arena Event Inspector:**
   - Hover cards with image zoom and border glow animations.
   - Clicking any card opens a technical specification modal with torque, armor ratings, and perception specs.
5. **Pre-Registration Admission Protocol Modal:**
   - Clearly explains that official dates and links will open via ROBOTiX Club, NIT Raipur.
   - Allows users to test-register squad details with instant simulated telemetry pass confirmation.

---

## ⚙️ How to Update Registration & Social Links

All festival settings are centrally maintained in a single configuration file:
👉 [`src/config.js`](file:///Users/nikhilgoyal/.gemini/antigravity/scratch/robofest-nit-raipur/src/config.js)

### 1. Replacing the Registration URL
When the official registration form (Google Form, Unstop, or college portal) goes live:
```javascript
// src/config.js
export const FESTIVAL_CONFIG = {
  // Replace the placeholder below with your live URL:
  registrationUrl: "https://your-official-portal.com/register",
  isRegistrationLive: true,
  // ...
};
```

### 2. Updating Social Media Links
```javascript
// src/config.js
socialLinks: {
  github: "https://github.com/robotix-nitrr",
  linkedin: "https://linkedin.com/company/robotix-nitrr",
  instagram: "https://instagram.com/robotix_nitrr",
  twitter: "https://x.com/robotix_nitrr",
}
```

---

## 🌐 Deployment Instructions

### Deploy to Vercel
1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run deployment from the project root:
   ```bash
   vercel
   ```
3. Or import your Git repository directly on the [Vercel Dashboard](https://vercel.com/):
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Deploy to Netlify
1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
3. Deploy the `dist` directory:
   ```bash
   netlify deploy --prod --dir=dist
   ```
4. Or connect your repository on the [Netlify Dashboard](https://app.netlify.com/):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

---

## 🤖 AI Tool Disclosure

This project was developed with the assistance of **Google Antigravity** using the **Gemini 3.8 Flash** model. AI tools were utilized for architectural scaffolding, asset generation prompts for 3D conceptual robotics renders, and iterative refinement of responsive CSS layouts. All code logic, component structures, state interactions, accessibility checks, and design guidelines were reviewed, tested, and verified directly within the environment.

---

## 🏛 About ROBOTiX Club, NIT Raipur

ROBOTiX Club is the official robotics and technical hardware organization of the National Institute of Technology, Raipur. Dedicated to fostering curiosity and engineering excellence, the club organizes hands-on workshops, hardware hackathons, and high-intensity robotics competitions.

*“Engineer the Extraordinary.”*
