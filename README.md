# Lebensfunke Heim Egerkingen — Dienst- & Aufgabenportal (SPA)

> Massgeschneidertes internes Personal-, Betreuungs-, Jugend- und Aufgaben-Dashboard für die sozialpädagogische Institution **Lebensfunke AG** in **Egerkingen (Kanzelstrasse 23)**.  
> Gebaut mit modernem **Vanilla HTML5**, **CSS3** und **ES6+ JavaScript** als eigenständige Progressive Web App (PWA).

---

## 👥 Offizielles Team Lebensfunke Heim Egerkingen (12 Mitarbeitende)

| Name | Funktion | Fachbereich | Status im System |
| :--- | :--- | :--- | :--- |
| **Bella** | **Schulpersonal & App-Administratorin** | **Schule & Bildung** | **Im Dienst (Admin)** |
| **Cigdem** | **Heimleitung** | **Heimleitung** | **Im Dienst** |
| **Serdar** | **Heimleitung** | **Heimleitung** | **Im Dienst** |
| **Kimete** | **SV / Heimleitung** (Stellvertretung) | **Heimleitung** | **Im Dienst** |
| **Sandra** | **Teamleitung** | **Teamleitung** | **Im Dienst** |
| **Kerstin** | **Betreuungspersonal** | **Betreuung** | **Im Dienst** |
| **Oliver** | **Betreuungspersonal** | **Betreuung** | **Im Dienst** |
| **Samia** | **Betreuungspersonal** | **Betreuung** | **Abwesend** |
| **Laura** | **Betreuungspersonal** | **Betreuung** | **Im Dienst** |
| **Semi** | **Praktikant** | **Praktikum** | **Im Dienst** |
| **Donika** | **Praktikantin** | **Praktikum** | **Frei** |
| **Steffi** | **Schulpersonal** | **Schule & Bildung** | **Frei** |

---

## 🧒 Betreute Jugendliche im Heim Egerkingen (10 Jugendliche)

| Name | Status | Zimmer / Gruppe | Bezugsperson | Schulbegleitung | Förderfokus / Ziel |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Marcos** | Im Heim (Anwesend) | Zimmer 1 (WG 1) | Kerstin | Bella | Schulabschluss & Lehrstellensuche |
| **Amir** | Schule / Ausbildung | Zimmer 2 (WG 1) | Oliver | Steffi | Praktikumsvorbereitung Logistik |
| **Muxi** | Im Heim (Anwesend) | Zimmer 3 (WG 1) | Laura | Bella | Reintegration & Familienstärkung |
| **Nekmal** | Schule / Ausbildung | Zimmer 4 (WG 1) | Samia | Steffi | Berufsintegration & Deutschförderung |
| **Amelie** | Im Heim (Anwesend) | Zimmer 5 (WG 2) | Sandra | Bella | Tagesstruktur & Standortbestimmung KESB |
| **Zsahra** | Im Heim (Anwesend) | Zimmer 6 (WG 2) | Kerstin | Steffi | Berufswahl & Selbstständigkeit |
| **Jaqueline** | Urlaub / Familie | Zimmer 7 (WG 2) | Laura | Bella | Soziales Kompetenztraining & Familie |
| **Lou** | Im Heim (Anwesend) | Zimmer 8 (WG 2) | Oliver | Steffi | Kreativförderung & Beziehungsaufbau |
| **Noelle** | Time-out / Krisenint. | Krisenzimmer | Samia | Bella | Krisenintervention & Stabilisierung |
| **Isa** | Im Heim (Anwesend) | Notfallzimmer 1 | Sandra | Steffi | 24h-Notfallplatzierung & Übergang |

---

## 🔐 Login-System & App-Admin (Bella = Admin)

| Rolle | Benutzername | Berechtigung |
| :--- | :--- | :--- |
| **Bella (App Admin)** | `bella` | **Exklusiver Vollzugriff:** Aufgaben, Mitarbeitende & Jugendliche erfassen, bearbeiten, löschen, Status direkt ändern, Backups importieren/exportieren und Demo-Reset. |
| **Mitarbeiter (Lesemodus)** | *Keine Anmeldung nötig* | **Nur-Lesen:** Einsicht in Dienststatus aller 12 Mitarbeitenden, Aufenthaltsstatus der 10 Jugendlichen, Betreuungsaufgaben und Dienstprotokoll. Mutations-Buttons sind gesperrt. |

### Admin-Zugangsdaten für Bella:
- **Benutzername:** `bella`
- **Passwort:** `bella` *(oder `lebensfunke`)*

> [!NOTE]
> Versucht ein Mitarbeiter im Lesemodus eine geschützte Aktion (z. B. einen Jugendlichen zu bearbeiten oder eine Aufgabe zu löschen), öffnet sich automatisch das **Admin-Login-Fenster für Bella**.

---

## 🚨 Schadenmeldungen mit Sofort-Routing an Admin Bella

- **Niederschwellige Meldung für alle Mitarbeitenden:**
  - Jeder Mitarbeitende auf Schicht kann über den prominenten Button **[⚠️ Schaden melden]** in der Kopfzeile oder im Dashboard Defekte in der Liegenschaft Kanzelstrasse 23 melden — **ohne vorheriges Admin-Login**.
- **Automatische Weiterleitung & Aufgaben-Zuweisung:**
  - Bei jeder Schadensmeldung wird sofort automatisch eine Aufgabe erzeugt und **direkt an Admin Bella zugewiesen** (`emp-101`).
  - Im Dienst- und Schichtprotokoll wird sofort ein Alarm-Eintrag hinterlegt (`🚨 Schadenmeldung weitergeleitet`).
  - Auf dem Dashboard erscheint ein dynamischer Alarm-Banner (`X offene Schadenmeldungen`), und das Navigationsmenü zählt ungelöste Fälle mit rotem Alarm-Badge.
- **Bearbeitung & Instandstellung (Bella Admin):**
  - Bella kann Handwerker-Notizen eintragen, den Status auf *In Arbeit* oder *Behoben* setzen.
  - Beim Markieren als *Behoben* wird auch die verknüpfte Aufgabe für Bella synchronisiert und abgeschlossen.

---

## 🚀 Schnellstart & Weltweiter Zugriff ("Von jedem Ort")

### 🌍 Weltweiter Zugriff (Smartphone, Tablet, Unterwegs & Heim):
Öffnen Sie den geschützten HTTPS-Link von jedem Smartphone, Laptop oder Tablet (auch über 4G/5G Mobilfunknetz):
👉 **https://creature-housewives-hub-biz.trycloudflare.com**

- **Live Echtzeit-Synchronisation:** Egal wo ein Mitarbeiter einen Schaden meldet oder Bella eine Aufgabe abhakt, alle Geräte werden über den Server in Echtzeit synchron gehalten.
- **Offline-Fähig:** Auch ohne Internet bleiben Daten im lokalen Browser-Speicher verfügbar.

### 🏠 Lokaler Zugriff im Heim-WLAN:
- **PC:** `http://localhost:8080`
- **WLAN Egerkingen:** `http://192.168.8.16:8080`

### ⚡ 1-Klick Startdatei:
Doppelklick auf [`start-public.bat`](file:///C:/Users/Lebensfunke/.gemini/antigravity/scratch/staffhub/start-public.bat) startet den Server und den weltweiten HTTPS-Tunnel automatisch.

### 📱 Zum Startbildschirm hinzufügen ("Add to Home Screen"):
- **Google Chrome / Edge:** Klicken Sie oben rechts in der App auf **"App installieren"** oder auf das Desktop-Installationssymbol in der URL-Leiste.
- **Apple iOS (Safari):** Teilen-Symbol (Viereck mit Pfeil nach oben) antippen -> **"Zum Home-Bildschirm"** wählen.
- **Android:** Im Browser-Menü **"App installieren"** wählen.

---

## 📂 Dateistruktur

```text
C:\Users\Lebensfunke\.gemini\antigravity\scratch\staffhub\
├── index.html          # Semantisches Portal mit 4 Hauptansichten (Dashboard, Teams, Jugendliche, Aufgaben)
├── style.css           # Modernes Dark Dashboard (Farben: #07111f, #0f1b2d, #29405f, #67e8f9 u.a.)
├── app.js              # Auth-System (Bella App Admin), 12 Mitarbeitende, 10 Jugendliche, Aufgaben
├── manifest.json       # PWA Web App Manifest für Standalone-Modus & Home Screen
├── sw.js               # Service Worker für Offline-Caching
├── icons/
│   └── icon.svg        # Lebensfunke-Flamme & Schutzschild-Icon
└── README.md           # Dokumentation & Roster-Übersicht
```
