# VoltCycle | Smart E-Waste Management & Circular Tech Platform

A modern, science-backed e-waste management web application engineered by combining **HTML5**, **CSS3**, and **JavaScript ES6+** into a cohesive, responsive web platform.

---

## 🚀 Web Trifecta: How the Coding Languages Combine

| Language | Role | Implementation in VoltCycle |
| :--- | :--- | :--- |
| **HTML5** | **Structure & Semantics** | Semantic landmark tags (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`), accessible ARIA attributes, native form controls with inline validation, procedural vector SVG graphics. |
| **CSS3** | **Design & Fluid Experience** | CSS custom property tokens (`:root`), frosted glassmorphism (`backdrop-filter: blur`), responsive CSS Grid & Flexbox, smooth dark/light theme switching, keyframe pulse animations. |
| **JavaScript ES6+** | **Logic & Reactive State** | Real-time UN e-waste ticker (~1.966 tonnes/sec), reactive state store backed by `localStorage`, dynamic mass & precious metal calculations, procedural SVG QR generator, client-side CSV and JSON exports. |

---

## 🌟 The 5 Core Features

### 1. Home Page — Introduces the E-Waste Problem
* **Empirical Global Statistics**: Sourced directly from the *UN Global E-Waste Monitor (UNITAR & ITU 2024)*.
* **Live Global E-Waste Counter**: Ticks in real time reflecting the global generation rate of **~1.96 metric tonnes of e-waste per second** (62 million tonnes annually).
* **The 3 Ecological Hazards**:
  * *Toxic Chemical Leaching*: Lead ($\text{Pb}$), Mercury ($\text{Hg}$), Cadmium ($\text{Cd}$), and BFRs leaking into drinking water aquifers.
  * *Thermal Runaway Fires*: Punctured or crushed lithium batteries causing compactor truck and landfill fires.
  * *Resource Depletion*: \$62 Billion worth of recoverable gold, silver, copper, and palladium buried without circular recovery.
* **Chemical Hazards Matrix**: Interactive tabs to inspect Lead, Mercury, Cadmium, BFRs, and Lithium cells.
* **Device Anatomy Exploder**: Interactive inspection of what's inside a Smartphone, Laptop, or Screen (Precious Recoverable Metals vs Hazardous Toxic Components).
* **Personal Ecological Footprint Calculator**: Sliders to calculate the recoverable gold, copper, and carbon offset of unused tech sitting in drawers.

### 2. E-Waste Guide — Explains Which Electronic Items Can Be Recycled
* **Recyclable Directory**: Clear breakdown of:
  * Smartphones, Tablets & E-Readers
  * Laptops, Desktops, Servers & Monitors
  * Power Cables, Adapters, Chargers & Peripherals
  * Rechargeable Lithium-ion Batteries (Special handling required)
  * Small Household Kitchen & Living Electronics
  * CRT & Flat Screen Televisions
* **Prohibited Tech**: Clarifies why radioactive smoke detectors (Americium-241) and medical devices cannot go into standard e-waste recycling.
* **Preparation Rules**: Step-by-step instructions on performing **NIST SP 800-88** data sanitization and taping battery terminal contacts.
* **Category Filters & Search Bar**: Quickly filter by category or type keywords.
* **Myth-Busters Quiz**: Interactive 3-question quiz with instant explanations and score tracker.

### 3. Collection Centre Information — Verified Facility Details
* **Verified Facilities**: Full directory of audited KSPCB, CPCB, ISO 14001, and R2v3 certified facilities across Bangalore / Karnataka.
* **Complete Details**:
  * Verified Certification Badges (KSPCB / CPCB / R2v3 / ISO 14001)
  * Physical Street Addresses with Bangalore PIN codes
  * Operating Hours with dynamic **Open Now / Closed** live indicator
  * Contact Phone Numbers (+91) & Direct Dispatch Links
  * One-click Google Maps Navigation (`Get Directions`)
  * Accepted Electronics tags for each hub
  * Locality filters for Bangalore (All), Peenya, Whitefield, Electronic City, Koramangala, Hebbal, Indiranagar, and Mysore Road

### 4. Request Pickup — Submit Disposal Requests
* **Pure Custom Web Disposal Form**:
  * Contact info: Full Name, Email, Phone, Location Type (Residential, Office, Institution).
  * Pickup Address: Street Address, City, State, Postal Code.
  * Electronics Selection: Easy `+` / `-` counters for all device categories with live mass estimation.
  * Preferred Schedule: Calendar date picker (minimum tomorrow) and morning/afternoon/evening slots.
  * Data Sanitization Protocol: Checkbox for certified NIST SP 800-88 cryptographic wiping.
  * Battery Safety: Terminal taping declaration.
* **Instant Confirmation Slip**:
  * Unique Tracking ID (e.g. `REQ-2026-149`).
  * Procedural SVG QR Code manifest.
  * Print/Save slip functionality (`window.print()`).

### 5. Impact Dashboard — Displays the Number of Requests Received
* **Total Requests Received**: Prominently displayed KPI counter that reflects historical verified requests plus any new requests submitted through the pickup form.
* **Dynamic Reactivity**: Every time a user submits a pickup request in Feature 4, the **Total Requests Received counter immediately increments**, the header badge updates, and the request appears at the top of the **Live Requests Stream Table**.
* **Community Metrics**: Also calculates total devices collected, e-waste weight diverted from landfills ($\text{kg}$), and secondary precious metals saved ($\text{g}$ of Gold, $\text{kg}$ of Copper).
* **Breakdown Bar Chart**: Visual distribution of electronics disposed.
* **Search & Status Filters**: Filter the live request stream table in real-time.
* **Client-Side Export**: Export request database to CSV or JSON with a single click.

---

## 🛠️ Section 6: Code Architecture Hub
* Interactive side-by-side code inspector displaying real snippets of **HTML5 semantic layout**, **CSS3 variables & glassmorphism**, and **JavaScript ES6+ reactive state engine** with instant copy-to-clipboard functionality.

---

## 🚀 How to Run Locally

Simply double-click or open `index.html` in any modern web browser:
```text
C:\Users\Bharath\.gemini\antigravity-ide\scratch\ewaste-management\index.html
```
No installation, node modules, or build steps required. The application runs 100% locally with pure Vanilla HTML5, CSS3, and JavaScript.
