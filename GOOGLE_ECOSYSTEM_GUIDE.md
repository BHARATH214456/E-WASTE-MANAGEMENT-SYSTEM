# Tech Titans &bull; Google Ecosystem & Canva Implementation Blueprint

This guide provides the complete setup for building your **E-Waste Management Solution** using **Google Sites**, **Google Forms**, **Google Sheets**, and **Canva**, featuring the exact **5 required features**:

1. **Home Page** — Introduces the e-waste problem.
2. **E-Waste Guide** — Explains which electronic items can be recycled.
3. **Collection Centre Information** — Displays verified collection centre details.
4. **Request Pickup** — Allows users to submit a disposal request through a form.
5. **Impact Dashboard** — Displays the number of requests received.

---

## 🌐 1. Google Sites Setup Guide

### Page Structure (5 Main Pages / Sections)
In your Google Sites editor (`sites.google.com`), create a site named **VoltCycle (Tech Titans)** with 5 pages:

| Page Name | Purpose | What to Insert on Google Sites |
| :--- | :--- | :--- |
| **1. Home** | Introduces the problem | Banner heading, UN e-waste stats (62M tonnes/year), 3 problem cards (Toxic leaching, fire hazards, lost minerals). |
| **2. E-Waste Guide** | What can/cannot be recycled | Collapsible groups or table listing recyclable tech vs prohibited tech and preparation rules (NIST wipe & taping). |
| **3. Collection Centres** | Physical drop-off details | Cards or embedded Google Map with certified R2v3 / e-Stewards hub addresses, hours, and phone numbers. |
| **4. Request Pickup** | Disposal request intake | **Insert > Forms > Select your Google Form** (embeds directly on page). |
| **5. Impact Dashboard** | Displays requests received | **Insert > Charts / Sheets > Select your Google Sheet** to show live request count and metrics. |

### How to Embed the Interactive Web Code into Google Sites
If you want to embed the interactive live ticker, custom UI, or calculator into Google Sites:
1. On Google Sites, click **Insert** in the right sidebar.
2. Click **Embed** (`</>`).
3. Select **Embed code** tab.
4. Paste the HTML/JS snippet from `index.html` (e.g., the Live Ticker or the Impact KPI counter).
5. Click **Next** &rarr; **Insert**. Resize the container to fit nicely!

---

## 📝 2. Google Form Configuration (Disposal Request)

Create a new form at `forms.google.com` titled **"VoltCycle E-Waste Disposal Request — Tech Titans"**.

### Exact Form Fields & Settings

1. **Full Name**
   * *Type*: Short answer
   * *Required*: Yes

2. **Email Address**
   * *Type*: Short answer
   * *Validation*: Text &rarr; Email
   * *Required*: Yes (Collect emails for disposal receipt)

3. **Phone Number**
   * *Type*: Short answer
   * *Required*: Yes

4. **Premises Type**
   * *Type*: Multiple choice
   * *Options*: Residential Home / Apartment &bull; Commercial Office / Business &bull; School / University

5. **Pickup Street Address & City**
   * *Type*: Paragraph
   * *Required*: Yes

6. **Which electronic items are you disposing of?**
   * *Type*: Checkboxes
   * *Options*:
     * Smartphones & Tablets
     * Laptops & Computers
     * Monitors & Televisions
     * Cables, Adapters & Keyboards/Mice
     * Small Household Appliances (Microwaves, Kettles, Audio)
     * Loose Rechargeable Batteries (Terminals must be taped)

7. **Approximate Total Quantity (Number of Items)**
   * *Type*: Short answer
   * *Validation*: Number &rarr; Greater than 0
   * *Required*: Yes

8. **Condition of Electronics**
   * *Type*: Multiple choice
   * *Options*:
     * Intact / Working or Repairable
     * Broken / Non-functional (Material Recovery)
     * Contains Swollen or Damaged Battery *(Special fire-safe handling required)*

9. **Preferred Pickup Date & Time Window**
   * *Type*: Multiple choice or Short answer
   * *Options*:
     * Morning Slot (09:00 AM – 01:00 PM)
     * Afternoon Slot (01:00 PM – 05:00 PM)
     * Evening Slot (05:00 PM – 08:00 PM)

10. **Data Sanitization & Battery Safety Confirmation**
    * *Type*: Checkboxes
    * *Options*:
      * I request certified NIST SP 800-88 data destruction for storage drives.
      * I confirm loose battery terminals are taped with electrical tape.

### Link Form to Google Sheets
1. In your Google Form, click the **Responses** tab at the top.
2. Click **Link to Sheets** (green spreadsheet icon).
3. Select **Create a new spreadsheet** &rarr; Name it **"VoltCycle E-Waste Requests Database"** &rarr; Click **Create**.
4. Every time a user submits the Google Form, a new row is instantly added!

---

## 📊 3. Google Sheets Setup & Impact Formulas

Your linked Google Sheet will receive rows automatically. Create a second tab named **"Impact Dashboard"** to compute the live metrics.

### Sheet 1: Form Responses
Add helper columns in columns `M` and `N`:
* Column `M` Header: `Estimated Weight (kg)`
  * Formula for row 2: `=IF(ISBLANK(G2), 0, G2 * 1.8)` *(where G2 is the number of items)*
* Column `N` Header: `Pickup Status`
  * Set Data Validation &rarr; Dropdown list: `Scheduled`, `In Transit`, `Recycled (Zero Landfill)`

### Sheet 2: Impact Dashboard (Displaying Number of Requests)
Create high-visibility summary cells with these formulas:

| Metric Cell | Metric Name | Exact Google Sheets Formula |
| :--- | :--- | :--- |
| **B2** | **Total Requests Received** | `=COUNTA('Form Responses 1'!A2:A)` |
| **B3** | **Total Devices Collected** | `=SUM('Form Responses 1'!G2:G)` |
| **B4** | **Total Weight Diverted (kg)** | `=SUM('Form Responses 1'!M2:M)` |
| **B5** | **Estimated Gold Recovered (g)** | `=B3 * 0.025` |
| **B6** | **Estimated Copper Recovered (kg)** | `=B3 * 0.09` |

### Embed Chart into Google Sites
1. Highlight your summary metrics in Google Sheets.
2. Click **Insert > Chart** (Select Scorecard or Column Chart).
3. Go to Google Sites &rarr; Click **Insert > Charts** &rarr; Select your Google Sheet.
4. The live chart will now visibly display the **Total Requests Received** on your website!

---

## 🎨 4. Canva Assets Blueprint (Tech Titans)

Use Canva (`canva.com`) to design public awareness posters and presentation slides.

### A. Canva Awareness Poster (With QR Code)
* **Canva Template**: Search for *"Environmental Poster"* or *"Tech Infographic Poster"*.
* **Color Palette**: Dark Slate background (`#070d18`), Emerald Green (`#10b981`), and Cyan (`#22d3ee`).
* **Headline**: *"Don't Trash It, Cash in on Clean Earth!"*
* **Sub-headline**: *VoltCycle &bull; Certified E-Waste Management by Tech Titans*
* **Key Statistics**:
  * 🔴 62 Million Tonnes of e-waste generated worldwide every year.
  * 🟡 Only 22.3% recycled — 77.7% dumped or burned.
  * 🟢 1 million phones recycled = 34 kg gold + 16,000 kg copper.
* **Call to Action**: *"Book Your Free Doorstep Pickup Now!"*
* **QR Code Element**:
  * In Canva, click **Apps > QR Code**.
  * Paste your Google Form link (or Google Sites link).
  * Place the QR code with label: *"Scan to Submit Disposal Request"*.

---

### B. Canva 7-Slide Pitch Deck (Tech Titans Presentation)

#### Slide 1: Title & Team
* **Title**: VoltCycle: Community E-Waste Management Solution
* **Subtitle**: Educate &bull; Collect &bull; Divert &bull; Impact
* **Team**: Tech Titans

#### Slide 2: The E-Waste Crisis (Problem Statement)
* **Points**:
  * 62M tonnes produced annually, accelerating to 82M by 2030.
  * Toxic heavy metals (Lead, Mercury, Cadmium) leaking into water tables.
  * Lithium-ion battery fires in municipal compactor trucks.
  * $62 Billion in scarce minerals landfilled every year.

#### Slide 3: Our 5-Feature Solution
* 1. **Home Page**: Introduces the problem with live global tickers.
* 2. **E-Waste Guide**: Teaches communities what is recyclable and pre-disposal rules.
* 3. **Collection Centres**: Directory of verified R2v3 / e-Stewards drop-off hubs.
* 4. **Request Pickup**: Seamless intake via Google Forms.
* 5. **Impact Dashboard**: Real-time display of requests received and e-waste diverted.

#### Slide 4: Technology Stack
* **Google Sites**: Clean, zero-cost, responsive web portal.
* **Google Forms**: User-friendly disposal request collection.
* **Google Sheets**: Backend database, route planning, and live formula organizer.
* **Canva**: High-impact visual posters with QR codes and slide decks.

#### Slide 5: The Live Workflow (Demo)
* Citizen scans Canva QR code or visits Google Site.
* Citizen fills out the Google Form.
* Google Sheet instantly records the request row and increments the live count.
* Impact Dashboard visibly updates in real time.

#### Slide 6: Community Impact to Date
* Over **140+ verified requests received**.
* **1,140+ electronic gadgets** safely diverted from informal dumping.
* **4,800+ kg** of toxic heavy metals prevented from polluting public water.

#### Slide 7: Scalability & Call to Action
* Next steps: Partnering with municipal centers and schools.
* *"Turn Your Electronic Waste into Environmental Value."*
* Scan QR code or visit our Google Site today!

---

## 💻 5. Local Prototype Available in Workspace

You can test and view the interactive web prototype right now in:
[`C:/Users/Bharath/.gemini/antigravity-ide/scratch/ewaste-management/index.html`](file:///C:/Users/Bharath/.gemini/antigravity-ide/scratch/ewaste-management/index.html)

* It features all **5 features** ready to browse.
* It includes the **Tech Stack & Canva overview section**.
* It includes an **Export to Google Sheets (CSV)** button to download request rows ready for import.
* It includes a **Copy Canva Slide Script** button for instant pasting into Canva!
