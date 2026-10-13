/**
 * ============================================================================
 * StaffHub — Lebensfunke Heim Egerkingen
 * Internes Personal-, Betreuungs- & Aufgaben-Dashboard (SPA)
 * 
 * Institution:
 *  Lebensfunke AG · Kanzelstrasse 23 · 4622 Egerkingen
 *  Spezialisierung: Stationäre Jugendhilfe, 24h-Notfallplatzierungen,
 *                   Krisenintervention & Time-out Begleitung
 *
 * Team (12 Mitarbeitende):
 *  - Cigdem & Serdar: Heimleitung
 *  - Kimete: SV / Heimleitung
 *  - Sandra: Teamleitung
 *  - Kerstin, Oliver, Samia, Laura: Betreuungspersonal
 *  - Semi, Donika: Praktikanten
 *  - Bella & Steffi: Schulpersonal
 *  - BELLA: Exklusive App-Administratorin
 *
 * Betreute Jugendliche (10 Jugendliche):
 *  - Marcos, Amir, Muxi, Nekmal, Amelie, Zsahra, Jaqueline, Lou, Noelle, Isa
 * ============================================================================
 */

'use strict';

// ============================================================================
// 1. CONSTANTS & INSTITUTIONAL SEED DATA (HEIM EGERKINGEN)
// ============================================================================

const STORAGE_KEY = 'lebensfunke_staffhub_v6';

const TEAMS = Object.freeze([
  'Heimleitung',
  'Teamleitung',
  'Betreuung',
  'Schule & Bildung',
  'Praktikum'
]);

const EMPLOYEE_STATUSES = Object.freeze({
  ANWESEND: 'anwesend',
  ABWESEND: 'abwesend',
  FREI: 'frei'
});

const YOUTH_STATUSES = Object.freeze({
  IM_HEIM: 'im Heim',
  SCHULE: 'Schule / Ausbildung',
  URLAUB: 'Urlaub / Familie',
  TIMEOUT: 'Time-out'
});

const TASK_PRIORITIES = Object.freeze({
  NIEDRIG: 'niedrig',
  MITTEL: 'mittel',
  HOCH: 'hoch'
});

const TASK_STATUSES = Object.freeze({
  OFFEN: 'offen',
  IN_ARBEIT: 'in Arbeit',
  ERLEDIGT: 'erledigt'
});

const DAMAGE_URGENCIES = Object.freeze({
  NOTFALL: 'notfall',
  HOCH: 'hoch',
  MITTEL: 'mittel',
  NIEDRIG: 'niedrig'
});

const DAMAGE_STATUSES = Object.freeze({
  GEMELDET: 'gemeldet',
  IN_ARBEIT: 'in Arbeit',
  BEHOBEN: 'behoben'
});

/**
 * Offizielles Team und Jugendbestand von Lebensfunke Heim Egerkingen:
 */
const INITIAL_SEED_DATA = Object.freeze({
  employees: [
    {
      id: 'emp-101',
      name: 'Bella',
      role: 'Schulpersonal & App-Administratorin',
      team: 'Schule & Bildung',
      status: 'anwesend',
      username: 'bella',
      isAdmin: true,
      initials: 'BE'
    },
    {
      id: 'emp-102',
      name: 'Cigdem',
      role: 'Heimleitung',
      team: 'Heimleitung',
      status: 'anwesend',
      username: 'cigdem',
      isAdmin: false,
      initials: 'CI'
    },
    {
      id: 'emp-103',
      name: 'Serdar',
      role: 'Heimleitung',
      team: 'Heimleitung',
      status: 'anwesend',
      username: 'serdar',
      isAdmin: false,
      initials: 'SE'
    },
    {
      id: 'emp-104',
      name: 'Kimete',
      role: 'SV / Heimleitung',
      team: 'Heimleitung',
      status: 'anwesend',
      username: 'kimete',
      isAdmin: false,
      initials: 'KI'
    },
    {
      id: 'emp-105',
      name: 'Sandra',
      role: 'Teamleitung',
      team: 'Teamleitung',
      status: 'anwesend',
      username: 'sandra',
      isAdmin: false,
      initials: 'SA'
    },
    {
      id: 'emp-106',
      name: 'Kerstin',
      role: 'Betreuungspersonal',
      team: 'Betreuung',
      status: 'anwesend',
      username: 'kerstin',
      isAdmin: false,
      initials: 'KE'
    },
    {
      id: 'emp-107',
      name: 'Oliver',
      role: 'Betreuungspersonal',
      team: 'Betreuung',
      status: 'anwesend',
      username: 'oliver',
      isAdmin: false,
      initials: 'OL'
    },
    {
      id: 'emp-108',
      name: 'Samia',
      role: 'Betreuungspersonal',
      team: 'Betreuung',
      status: 'abwesend',
      username: 'samia',
      isAdmin: false,
      initials: 'SA'
    },
    {
      id: 'emp-109',
      name: 'Laura',
      role: 'Betreuungspersonal',
      team: 'Betreuung',
      status: 'anwesend',
      username: 'laura',
      isAdmin: false,
      initials: 'LA'
    },
    {
      id: 'emp-110',
      name: 'Semi',
      role: 'Praktikant',
      team: 'Praktikum',
      status: 'anwesend',
      username: 'semi',
      isAdmin: false,
      initials: 'SE'
    },
    {
      id: 'emp-111',
      name: 'Donika',
      role: 'Praktikantin',
      team: 'Praktikum',
      status: 'frei',
      username: 'donika',
      isAdmin: false,
      initials: 'DO'
    },
    {
      id: 'emp-112',
      name: 'Steffi',
      role: 'Schulpersonal',
      team: 'Schule & Bildung',
      status: 'frei',
      username: 'steffi',
      isAdmin: false,
      initials: 'ST'
    }
  ],
  youths: [
    {
      id: 'jug-101',
      name: 'Marcos',
      status: 'im Heim',
      room: 'Zimmer 1 (WG 1)',
      bezugsperson: 'emp-106', // Kerstin
      schulbegleitung: 'emp-101', // Bella
      fokus: 'Schulabschluss & Lehrstellensuche'
    },
    {
      id: 'jug-102',
      name: 'Amir',
      status: 'Schule / Ausbildung',
      room: 'Zimmer 2 (WG 1)',
      bezugsperson: 'emp-107', // Oliver
      schulbegleitung: 'emp-112', // Steffi
      fokus: 'Praktikumsvorbereitung Logistik'
    },
    {
      id: 'jug-103',
      name: 'Muxi',
      status: 'im Heim',
      room: 'Zimmer 3 (WG 1)',
      bezugsperson: 'emp-109', // Laura
      schulbegleitung: 'emp-101', // Bella
      fokus: 'Reintegration & Familienstärkung'
    },
    {
      id: 'jug-104',
      name: 'Nekmal',
      status: 'Schule / Ausbildung',
      room: 'Zimmer 4 (WG 1)',
      bezugsperson: 'emp-108', // Samia
      schulbegleitung: 'emp-112', // Steffi
      fokus: 'Berufsintegration & Deutschförderung'
    },
    {
      id: 'jug-105',
      name: 'Amelie',
      status: 'im Heim',
      room: 'Zimmer 5 (WG 2)',
      bezugsperson: 'emp-105', // Sandra
      schulbegleitung: 'emp-101', // Bella
      fokus: 'Tagesstruktur & Standortbestimmung KESB'
    },
    {
      id: 'jug-106',
      name: 'Zsahra',
      status: 'im Heim',
      room: 'Zimmer 6 (WG 2)',
      bezugsperson: 'emp-106', // Kerstin
      schulbegleitung: 'emp-112', // Steffi
      fokus: 'Berufswahl & Selbstständigkeit'
    },
    {
      id: 'jug-107',
      name: 'Jaqueline',
      status: 'Urlaub / Familie',
      room: 'Zimmer 7 (WG 2)',
      bezugsperson: 'emp-109', // Laura
      schulbegleitung: 'emp-101', // Bella
      fokus: 'Soziales Kompetenztraining & Familie'
    },
    {
      id: 'jug-108',
      name: 'Lou',
      status: 'im Heim',
      room: 'Zimmer 8 (WG 2)',
      bezugsperson: 'emp-107', // Oliver
      schulbegleitung: 'emp-112', // Steffi
      fokus: 'Kreativförderung & Beziehungsaufbau'
    },
    {
      id: 'jug-109',
      name: 'Noelle',
      status: 'Time-out',
      room: 'Krisenzimmer (Time-out)',
      bezugsperson: 'emp-108', // Samia
      schulbegleitung: 'emp-101', // Bella
      fokus: 'Krisenintervention & Stabilisierung'
    },
    {
      id: 'jug-110',
      name: 'Isa',
      status: 'im Heim',
      room: 'Notfallzimmer 1',
      bezugsperson: 'emp-105', // Sandra
      schulbegleitung: 'emp-112', // Steffi
      fokus: '24h-Notfallplatzierung & Übergangsplanung'
    }
  ],
  tasks: [
    {
      id: 'task-201',
      title: 'Notfallplatzierung 24h: Zimmer für Isa vorbereiten',
      assignedTo: 'emp-106', // Kerstin
      youthId: 'jug-110', // Isa
      priority: 'hoch',
      dueDate: '2026-10-14',
      status: 'in Arbeit'
    },
    {
      id: 'task-202',
      title: 'KESB-Verlaufsbericht & Standortbestimmung für Amelie',
      assignedTo: 'emp-102', // Cigdem
      youthId: 'jug-105', // Amelie
      priority: 'hoch',
      dueDate: '2026-10-10',
      status: 'offen' // Überfällig ⚠️
    },
    {
      id: 'task-203',
      title: 'Schulstoff-Förderplan & Lernziele für Marcos ausarbeiten',
      assignedTo: 'emp-101', // Bella
      youthId: 'jug-101', // Marcos
      priority: 'hoch',
      dueDate: '2026-10-15',
      status: 'in Arbeit'
    },
    {
      id: 'task-204',
      title: 'Dienst- & Schichtplan November für Wohngruppe finalisieren',
      assignedTo: 'emp-104', // Kimete
      youthId: null,
      priority: 'mittel',
      dueDate: '2026-10-18',
      status: 'offen'
    },
    {
      id: 'task-205',
      title: 'Wöchentliche Fallbesprechung: Entwicklung von Muxi leiten',
      assignedTo: 'emp-105', // Sandra
      youthId: 'jug-103', // Muxi
      priority: 'hoch',
      dueDate: '2026-10-13',
      status: 'in Arbeit'
    },
    {
      id: 'task-206',
      title: 'Medikamentenausgabe & Abendprotokollierung',
      assignedTo: 'emp-107', // Oliver
      youthId: null,
      priority: 'hoch',
      dueDate: '2026-10-12',
      status: 'erledigt'
    },
    {
      id: 'task-207',
      title: 'Lerncoaching & Bewerbungsdossier für Nekmal prüfen',
      assignedTo: 'emp-112', // Steffi
      youthId: 'jug-104', // Nekmal
      priority: 'mittel',
      dueDate: '2026-10-20',
      status: 'offen'
    },
    {
      id: 'task-208',
      title: 'Freizeit-Aktivität & Kochen mit Zsahra begleiten',
      assignedTo: 'emp-110', // Semi
      youthId: 'jug-106', // Zsahra
      priority: 'niedrig',
      dueDate: '2026-10-12',
      status: 'erledigt'
    },
    {
      id: 'task-209',
      title: 'Bezugspersonengespräch: Zwischenbilanz Reintegration von Noelle',
      assignedTo: 'emp-109', // Laura
      youthId: 'jug-109', // Noelle
      priority: 'mittel',
      dueDate: '2026-10-16',
      status: 'in Arbeit'
    },
    {
      id: 'task-210',
      title: 'Lehrstellen-Bewerbungsgespräch begleiten für Amir',
      assignedTo: 'emp-103', // Serdar
      youthId: 'jug-102', // Amir
      priority: 'mittel',
      dueDate: '2026-10-25',
      status: 'offen'
    },
    {
      id: 'task-301',
      title: '🚨 [SCHADEN] Fenstergriff Zimmer 3 klemmt (Zimmer 3 (WG 1))',
      assignedTo: 'emp-101', // Bella (Admin)
      youthId: 'jug-103', // Muxi
      priority: 'hoch',
      dueDate: '2026-10-12',
      status: 'offen',
      damageId: 'dmg-301'
    },
    {
      id: 'task-302',
      title: '🚨 [SCHADEN] Duschschlauch WG 2 undicht (Badezimmer WG 2)',
      assignedTo: 'emp-101', // Bella (Admin)
      youthId: null,
      priority: 'mittel',
      dueDate: '2026-10-13',
      status: 'in Arbeit',
      damageId: 'dmg-302'
    }
  ],
  damages: [
    {
      id: 'dmg-301',
      title: 'Fenstergriff Zimmer 3 klemmt',
      location: 'Zimmer 3 (WG 1)',
      reporterName: 'Laura',
      urgency: 'hoch',
      youthId: 'jug-103',
      description: 'Das Fenster im Zimmer von Muxi lässt sich oben nicht mehr ankippen, der Griff blockiert. Bitte Hauswart/Schreiner beauftragen.',
      status: 'gemeldet',
      createdAt: '2026-10-12T08:45:00Z',
      adminTaskId: 'task-301',
      resolutionNotes: ''
    },
    {
      id: 'dmg-302',
      title: 'Duschschlauch WG 2 undicht',
      location: 'Badezimmer WG 2',
      reporterName: 'Kerstin',
      urgency: 'mittel',
      youthId: null,
      description: 'Der Duschschlauch im oberen Bad tropft an der Verschraubung. Neuer Schlauch liegt im Keller bereit.',
      status: 'in Arbeit',
      createdAt: '2026-10-11T14:20:00Z',
      adminTaskId: 'task-302',
      resolutionNotes: 'Oliver schaut sich das heute Nachmittag an.'
    }
  ],
  activityLog: [
    {
      id: 'log-1',
      timestamp: '2026-10-12T07:30:00Z',
      action: 'Heim Egerkingen initialisiert',
      details: 'Offizielles Team (12 Mitarbeitende) und 10 Jugendliche geladen.',
      type: 'system'
    },
    {
      id: 'log-2',
      timestamp: '2026-10-12T08:15:00Z',
      action: 'Schulbegleitung gestartet',
      details: 'Bella hat den Förderplan für Marcos auf "in Arbeit" gesetzt.',
      type: 'update'
    },
    {
      id: 'log-3',
      timestamp: '2026-10-12T09:00:00Z',
      action: 'Notfallplatzierung vorbereitet',
      details: 'Kerstin bereitet Zimmer für Isa vor.',
      type: 'create'
    },
    {
      id: 'log-4',
      timestamp: '2026-10-12T09:30:00Z',
      action: '🚨 Schadenmeldung weitergeleitet',
      details: 'Laura hat "Fenstergriff Zimmer 3 klemmt" gemeldet -> Direkt als Aufgabe an Admin Bella zugewiesen.',
      type: 'create'
    }
  ],
  currentUser: null,
  theme: 'dark'
});

// ============================================================================
// 2. STATE MANAGEMENT & STORAGE HANDLER
// ============================================================================

let AppState = {
  employees: [],
  youths: [],
  tasks: [],
  damages: [],
  activityLog: [],
  currentUser: null,
  theme: 'dark',
  activeView: 'dashboard',
  filters: {
    employees: { search: '', team: '', status: '' },
    youths: { search: '', status: '', bezugsperson: '' },
    tasks: { search: '', priority: '', status: '', assignee: '' },
    damages: { search: '', urgency: '', status: '' }
  }
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return JSON.parse(JSON.stringify(INITIAL_SEED_DATA));
    }
    const parsed = JSON.parse(raw);
    return {
      employees: Array.isArray(parsed.employees) ? parsed.employees : INITIAL_SEED_DATA.employees,
      youths: Array.isArray(parsed.youths) ? parsed.youths : INITIAL_SEED_DATA.youths,
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : INITIAL_SEED_DATA.tasks,
      damages: Array.isArray(parsed.damages) ? parsed.damages : (INITIAL_SEED_DATA.damages || []),
      activityLog: Array.isArray(parsed.activityLog) ? parsed.activityLog : INITIAL_SEED_DATA.activityLog,
      currentUser: (parsed.currentUser && parsed.currentUser.id) ? parsed.currentUser : null,
      theme: parsed.theme || 'dark'
    };
  } catch (err) {
    console.error('Fehler beim Laden aus localStorage:', err);
    return JSON.parse(JSON.stringify(INITIAL_SEED_DATA));
  }
}

function saveState() {
  try {
    const payload = {
      employees: AppState.employees,
      youths: AppState.youths,
      tasks: AppState.tasks,
      damages: AppState.damages,
      activityLog: AppState.activityLog,
      currentUser: AppState.currentUser,
      theme: AppState.theme
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    updateStorageStatusText();
    syncStateToServer(payload);
  } catch (err) {
    console.error('Fehler beim Speichern:', err);
    showToast('Fehler beim Speichern im Browser-Speicher.', 'error');
  }
}

async function syncStateToServer(payload) {
  if (!window.location.protocol.startsWith('http')) return;
  try {
    await fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.debug('Server sync note:', err);
  }
}

async function fetchStateFromServer() {
  if (!window.location.protocol.startsWith('http')) return null;
  try {
    const res = await fetch('/api/state', { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || data.empty || !Array.isArray(data.employees)) return null;
    return data;
  } catch (err) {
    return null;
  }
}

function resetStateToSeed() {
  if (!assertAdmin('Heim-Daten zurücksetzen')) return;

  AppState.employees = JSON.parse(JSON.stringify(INITIAL_SEED_DATA.employees));
  AppState.youths = JSON.parse(JSON.stringify(INITIAL_SEED_DATA.youths));
  AppState.tasks = JSON.parse(JSON.stringify(INITIAL_SEED_DATA.tasks));
  AppState.damages = JSON.parse(JSON.stringify(INITIAL_SEED_DATA.damages));
  AppState.activityLog = [
    {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      action: 'Heim-Daten wiederhergestellt',
      details: 'Das System wurde auf die Standarddaten von Lebensfunke Heim Egerkingen zurückgesetzt.',
      type: 'system'
    }
  ];

  saveState();
  renderApp();
  showToast('Heim-Daten erfolgreich wiederhergestellt.', 'info');
}

function exportStateAsJson() {
  try {
    const payload = {
      institution: 'Lebensfunke Heim Egerkingen (Kanzelstrasse 23, 4622 Egerkingen)',
      app: 'StaffHub',
      version: '1.4.0',
      exportedAt: new Date().toISOString(),
      data: {
        employees: AppState.employees,
        youths: AppState.youths,
        tasks: AppState.tasks,
        damages: AppState.damages,
        activityLog: AppState.activityLog,
        currentUser: AppState.currentUser,
        theme: AppState.theme
      }
    };

    const jsonString = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const dateStamp = new Date().toISOString().slice(0, 10);

    const a = document.createElement('a');
    a.href = url;
    a.download = `lebensfunke-egerkingen-backup-${dateStamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    logActivity('Daten exportiert', 'System-Sicherung für Heim Egerkingen heruntergeladen.', 'system');
    showToast('Systemzustand als JSON heruntergeladen.', 'success');
  } catch (err) {
    console.error('Export fehlgeschlagen:', err);
    showToast('Export fehlgeschlagen.', 'error');
  }
}

function importStateFromJson(file) {
  if (!assertAdmin('Daten importieren')) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      const incoming = parsed.data || parsed;

      if (!Array.isArray(incoming.employees) || !Array.isArray(incoming.tasks)) {
        throw new Error('Ungültiges Datenformat: Mitarbeitende oder Aufgaben fehlen.');
      }

      AppState.employees = incoming.employees;
      AppState.youths = Array.isArray(incoming.youths) ? incoming.youths : [];
      AppState.tasks = incoming.tasks;
      AppState.damages = Array.isArray(incoming.damages) ? incoming.damages : [];
      AppState.activityLog = Array.isArray(incoming.activityLog) ? incoming.activityLog : [];
      
      logActivity('Backup importiert', `JSON-Sicherung mit ${incoming.employees.length} Mitarbeitenden, ${AppState.youths.length} Jugendlichen, ${incoming.tasks.length} Aufgaben und ${AppState.damages.length} Schadenmeldungen eingespielt.`, 'system');
      saveState();
      renderApp();
      showToast('Heim-Daten erfolgreich importiert!', 'success');
    } catch (err) {
      console.error('Importfehler:', err);
      showToast(`Import fehlgeschlagen: ${err.message}`, 'error');
    }
  };
  reader.readAsText(file);
}

// ============================================================================
// 3. AUTHENTICATION SYSTEM (INDIVIDUELLER MITARBEITER- & ADMIN-LOGIN)
// ============================================================================

function isBellaAdmin() {
  return !!(AppState.currentUser && 
         (AppState.currentUser.username?.toLowerCase() === 'bella' || 
          AppState.currentUser.displayName?.toLowerCase() === 'bella' || 
          AppState.currentUser.isAdmin === true));
}

function getLoggedInEmployee() {
  if (!AppState.currentUser || !AppState.currentUser.id) return null;
  return AppState.employees.find(e => e.id === AppState.currentUser.id) || null;
}

function loginAsEmployee(employeeIdentifier, password = '') {
  const norm = (employeeIdentifier || '').trim().toLowerCase();
  const emp = AppState.employees.find(e => 
    e.id.toLowerCase() === norm || 
    (e.username && e.username.toLowerCase() === norm) || 
    e.name.toLowerCase() === norm
  );

  if (!emp) {
    return {
      success: false,
      message: 'Mitarbeitender nicht gefunden. Bitte w?hle ein Profil aus der Liste.'
    };
  }

  const pass = (password || '').trim();

  // If logging in as Bella (Admin):
  if (emp.name.toLowerCase() === 'bella' || (emp.username && emp.username.toLowerCase() === 'bella')) {
    if (!pass) {
      return {
        success: false,
        requiresPassword: true,
        message: 'Admin-Passwort f?r Bella erforderlich.'
      };
    }
    if (pass !== 'bella' && pass !== 'lebensfunke') {
      return {
        success: false,
        message: 'Falsches Admin-Passwort für Bella.'
      };
    }

    AppState.currentUser = {
      id: emp.id,
      username: 'bella',
      displayName: 'Bella',
      role: 'Schulpersonal & App-Administratorin',
      team: 'Schule & Bildung',
      isAdmin: true
    };
  } else {
    // Any other staff member:
    const validPass = emp.name.toLowerCase();
    if (pass && pass !== validPass && pass !== 'lebensfunke' && pass !== '1234') {
      return {
        success: false,
        message: `Falsches Passwort für ${emp.name}.`
      };
    }

    AppState.currentUser = {
      id: emp.id,
      username: emp.username || emp.name.toLowerCase(),
      displayName: emp.name,
      role: emp.role,
      team: emp.team,
      isAdmin: false
    };

    // Auto-set status to 'anwesend' (im Dienst) if they were 'frei' or 'abwesend'
    if (emp.status !== EMPLOYEE_STATUSES.ANWESEND) {
      emp.status = EMPLOYEE_STATUSES.ANWESEND;
    }
  }

  saveState();
  checkAccessGate();
  renderApp();

  logActivity('Schicht-Login', `${AppState.currentUser.displayName} (${AppState.currentUser.role}) hat sich angemeldet.`, 'system');
  showToast(`Willkommen im Dienst, ${AppState.currentUser.displayName}!`, 'success');

  return { success: true, employee: emp };
}

function loginAsBella(username, password) {
  return loginAsEmployee('bella', password);
}

function logoutUser() {
  const prevName = AppState.currentUser ? AppState.currentUser.displayName : 'Mitarbeiter';
  AppState.currentUser = null;
  saveState();
  checkAccessGate();
  renderApp();
  logActivity('Dienst abgemeldet', `${prevName} hat sich abgemeldet. Portal gesperrt.`, 'system');
  showToast('Erfolgreich abgemeldet. Portal ist gesperrt.', 'info');
}

function logoutToMitarbeiter() {
  logoutUser();
}

function setMyDutyStatus(newStatus) {
  if (!AppState.currentUser || !AppState.currentUser.id) {
    showToast('Bitte melde dich zuerst an.', 'warning');
    checkAccessGate();
    return;
  }
  const emp = AppState.employees.find(e => e.id === AppState.currentUser.id);
  if (!emp) return;

  emp.status = newStatus;
  saveState();
  renderApp();
  logActivity('Statuswechsel', `${emp.name} hat den Dienststatus auf "${newStatus}" gesetzt.`, 'update');
  showToast(`Dienststatus f?r ${emp.name} auf "${newStatus}" aktualisiert.`, 'success');
}

function openLoginModal() {
  const modal = document.getElementById('modalLogin');
  const errorBox = document.getElementById('loginAuthError');
  const userInput = document.getElementById('loginUsername');
  const passInput = document.getElementById('loginPassword');

  if (errorBox) errorBox.classList.add('hidden');
  if (userInput) userInput.value = isBellaAdmin() ? 'bella' : (AppState.currentUser?.displayName || 'bella');
  if (passInput) passInput.value = '';


  if (modal) modal.classList.remove('hidden');
  if (passInput) passInput.focus();
}

function assertAdmin(actionName = 'Diese Aktion') {
  if (isBellaAdmin()) return true;

  showToast(`${actionName} ist gesperrt: Nur f?r Bella (Admin) freigeschaltet.`, 'warning');
  openLoginModal();
  return false;
}

function checkAccessGate() {
  const gate = document.getElementById('gatekeeperLogin');
  const app = document.getElementById('app');

  const isLoggedIn = !!(AppState.currentUser && AppState.currentUser.id);

  if (gate) {
    gate.style.display = isLoggedIn ? 'none' : 'flex';
  }
  if (app) {
    app.style.display = isLoggedIn ? 'flex' : 'none';
  }

  if (!isLoggedIn) {
    renderGatekeeperUI();
  }
}

function renderGatekeeperUI() {
  const selectUser = document.getElementById('gateSelectUser');
  if (selectUser && selectUser.options.length === 0) {
    selectUser.innerHTML = AppState.employees.map(emp => {
      const isAdmin = emp.isAdmin || emp.name.toLowerCase() === 'bella';
      return `<option value="${emp.id}">${escapeHtml(emp.name)} (${escapeHtml(emp.team)}${isAdmin ? ' • 👑 Admin' : ''})</option>`;
    }).join('');
  }
}

// ============================================================================
// 4. ACTIVITY LOGGER
// ============================================================================

function logActivity(action, details, type = 'update') {
  const entry = {
    id: 'log-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    timestamp: new Date().toISOString(),
    action,
    details,
    type
  };

  AppState.activityLog.unshift(entry);
  if (AppState.activityLog.length > 40) {
    AppState.activityLog.pop();
  }

  saveState();
  renderActivityLog();
}

function clearActivityLog() {
  if (!assertAdmin('Dienstprotokoll leeren')) return;
  AppState.activityLog = [];
  saveState();
  renderActivityLog();
  showToast('Dienstprotokoll geleert.', 'info');
}

// ============================================================================
// 5. VALIDATION
// ============================================================================

function validateEmployeeForm(data) {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.empName = 'Bitte einen gültigen Namen mit mindestens 2 Zeichen eingeben.';
  } else if (data.name.trim().length > 60) {
    errors.empName = 'Der Name darf maximal 60 Zeichen lang sein.';
  }

  if (!data.role || data.role.trim().length < 2) {
    errors.empRole = 'Bitte Funktion / Fachbereich mit mindestens 2 Zeichen angeben.';
  }

  if (!data.team || !TEAMS.includes(data.team)) {
    errors.empTeam = 'Bitte einen gültigen Fachbereich des Heims auswählen.';
  }

  if (!data.status || !Object.values(EMPLOYEE_STATUSES).includes(data.status)) {
    errors.empStatus = 'Bitte einen gültigen Dienststatus wählen.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

function validateYouthForm(data) {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.youthName = 'Bitte den Namen des Jugendlichen eingeben.';
  }

  if (!data.status || !Object.values(YOUTH_STATUSES).includes(data.status)) {
    errors.youthStatus = 'Bitte einen gültigen Aufenthalts-Status auswählen.';
  }

  if (!data.bezugsperson) {
    errors.youthBezugsperson = 'Bitte eine zuständige Bezugsperson auswählen.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

function validateTaskForm(data) {
  const errors = {};

  if (!data.title || data.title.trim().length < 3) {
    errors.taskTitle = 'Der Aufgabentitel muss mindestens 3 Zeichen umfassen.';
  } else if (data.title.trim().length > 120) {
    errors.taskTitle = 'Der Aufgabentitel darf maximal 120 Zeichen lang sein.';
  }

  if (!data.priority || !Object.values(TASK_PRIORITIES).includes(data.priority)) {
    errors.taskPriority = 'Bitte eine Priorität auswählen.';
  }

  if (!data.dueDate) {
    errors.taskDueDate = 'Bitte ein Fälligkeitsdatum angeben.';
  } else if (isNaN(new Date(data.dueDate).getTime())) {
    errors.taskDueDate = 'Ungültiges Datumsformat.';
  }

  if (!data.status || !Object.values(TASK_STATUSES).includes(data.status)) {
    errors.taskStatus = 'Bitte einen gültigen Aufgabenstatus wählen.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

function validateDamageForm(data) {
  const errors = {};

  if (!data.title || data.title.trim().length < 3) {
    errors.damageTitle = 'Der Schadentitel muss mindestens 3 Zeichen umfassen.';
  } else if (data.title.trim().length > 120) {
    errors.damageTitle = 'Der Schadentitel darf maximal 120 Zeichen lang sein.';
  }

  if (!data.location) {
    errors.damageLocation = 'Bitte den Standort im Heim auswählen.';
  }

  if (!data.reporterName) {
    errors.damageReporter = 'Bitte den meldenden Mitarbeitenden auswählen.';
  }

  if (!data.urgency || !Object.values(DAMAGE_URGENCIES).includes(data.urgency)) {
    errors.damageUrgency = 'Bitte eine Dringlichkeitsstufe auswählen.';
  }

  if (!data.description || data.description.trim().length < 5) {
    errors.damageDescription = 'Bitte eine detaillierte Beschreibung des Mangels angeben (mindestens 5 Zeichen).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// ============================================================================
// 6. CRUD CONTROLLERS (EMPLOYEES, YOUTHS, TASKS)
// ============================================================================

// Employee CRUD
function saveEmployee(employeeData) {
  if (!assertAdmin('Mitarbeitenden speichern')) return false;

  const isEdit = Boolean(employeeData.id);

  if (isEdit) {
    const idx = AppState.employees.findIndex(e => e.id === employeeData.id);
    if (idx === -1) {
      showToast('Mitarbeiter nicht gefunden.', 'error');
      return false;
    }
    const prev = AppState.employees[idx];
    AppState.employees[idx] = { ...prev, ...employeeData };
    logActivity('Mitarbeitender aktualisiert', `Daten von "${employeeData.name}" (${employeeData.team}) aktualisiert.`, 'update');
    showToast(`Mitarbeitender "${employeeData.name}" aktualisiert.`, 'success');
  } else {
    const newEmp = {
      id: 'emp-' + Date.now(),
      name: employeeData.name.trim(),
      role: employeeData.role.trim(),
      team: employeeData.team,
      status: employeeData.status
    };
    AppState.employees.push(newEmp);
    logActivity('Mitarbeitender angelegt', `"${newEmp.name}" (${newEmp.role}) im Fachbereich ${newEmp.team} hinzugefügt.`, 'create');
    showToast(`Mitarbeitender "${newEmp.name}" angelegt.`, 'success');
  }

  saveState();
  renderApp();
  return true;
}

function deleteEmployee(empId) {
  if (!assertAdmin('Mitarbeitenden löschen')) return false;

  const emp = AppState.employees.find(e => e.id === empId);
  if (!emp) return false;

  // Safety cascade: Unassign tasks linked to this employee
  let unassignedCount = 0;
  AppState.tasks = AppState.tasks.map(task => {
    if (task.assignedTo === empId) {
      unassignedCount++;
      return { ...task, assignedTo: null };
    }
    return task;
  });

  AppState.employees = AppState.employees.filter(e => e.id !== empId);

  const cascadeNote = unassignedCount > 0 
    ? ` (${unassignedCount} zugewiesene Aufgabe(n) freigegeben).`
    : '.';

  logActivity('Mitarbeitender gelöscht', `"${emp.name}" aus Heim Egerkingen entfernt${cascadeNote}`, 'delete');
  saveState();
  renderApp();
  showToast(`"${emp.name}" gelöscht${cascadeNote}`, 'info');
  return true;
}

// Youth CRUD
function saveYouth(youthData) {
  if (!assertAdmin('Jugendlichen speichern')) return false;

  const isEdit = Boolean(youthData.id);

  if (isEdit) {
    const idx = AppState.youths.findIndex(y => y.id === youthData.id);
    if (idx === -1) {
      showToast('Jugendlicher nicht gefunden.', 'error');
      return false;
    }
    const prev = AppState.youths[idx];
    AppState.youths[idx] = { ...prev, ...youthData };
    logActivity('Jugendlicher aktualisiert', `Daten von "${youthData.name}" (Status: ${youthData.status}) aktualisiert.`, 'update');
    showToast(`Jugendlicher "${youthData.name}" aktualisiert.`, 'success');
  } else {
    const newYouth = {
      id: 'jug-' + Date.now(),
      name: youthData.name.trim(),
      status: youthData.status,
      room: youthData.room ? youthData.room.trim() : 'Wohngruppe',
      bezugsperson: youthData.bezugsperson,
      schulbegleitung: youthData.schulbegleitung || null,
      fokus: youthData.fokus ? youthData.fokus.trim() : ''
    };
    AppState.youths.push(newYouth);
    logActivity('Jugendlicher erfasst', `"${newYouth.name}" neu im Heim Egerkingen erfasst.`, 'create');
    showToast(`Jugendlicher "${newYouth.name}" erfasst.`, 'success');
  }

  saveState();
  renderApp();
  return true;
}

function deleteYouth(youthId) {
  if (!assertAdmin('Jugendlichen löschen')) return false;

  const youth = AppState.youths.find(y => y.id === youthId);
  if (!youth) return false;

  // Cascade: Unlink any tasks linked to this youth
  AppState.tasks = AppState.tasks.map(task => {
    if (task.youthId === youthId) {
      return { ...task, youthId: null };
    }
    return task;
  });

  AppState.youths = AppState.youths.filter(y => y.id !== youthId);

  logActivity('Jugendlicher gelöscht', `"${youth.name}" aus dem System entfernt.`, 'delete');
  saveState();
  renderApp();
  showToast(`Jugendlicher "${youth.name}" gelöscht.`, 'info');
  return true;
}

// Task CRUD
function saveTask(taskData) {
  if (!assertAdmin('Aufgabe speichern')) return false;

  const isEdit = Boolean(taskData.id);

  if (isEdit) {
    const idx = AppState.tasks.findIndex(t => t.id === taskData.id);
    if (idx === -1) {
      showToast('Aufgabe nicht gefunden.', 'error');
      return false;
    }
    const prev = AppState.tasks[idx];
    AppState.tasks[idx] = { ...prev, ...taskData };
    logActivity('Aufgabe bearbeitet', `Aufgabe "${taskData.title}" aktualisiert.`, 'update');
    showToast(`Aufgabe "${taskData.title}" aktualisiert.`, 'success');
  } else {
    const newTask = {
      id: 'task-' + Date.now(),
      title: taskData.title.trim(),
      assignedTo: taskData.assignedTo || null,
      youthId: taskData.youthId || null,
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      status: taskData.status
    };
    AppState.tasks.push(newTask);
    logActivity('Aufgabe erfasst', `Neue Aufgabe "${newTask.title}" (Priorität: ${newTask.priority}) erfasst.`, 'create');
    showToast(`Aufgabe "${newTask.title}" erstellt.`, 'success');
  }

  saveState();
  renderApp();
  return true;
}

function updateTaskStatus(taskId, newStatus) {
  if (!assertAdmin('Status ändern')) return false;

  const task = AppState.tasks.find(t => t.id === taskId);
  if (!task) return false;

  const oldStatus = task.status;
  task.status = newStatus;

  logActivity('Status geändert', `"${task.title}": von "${oldStatus}" auf "${newStatus}".`, 'update');
  saveState();
  renderApp();
  showToast(`Status auf "${newStatus}" geändert.`, 'success');
  return true;
}

function deleteTask(taskId) {
  if (!assertAdmin('Aufgabe löschen')) return false;

  const task = AppState.tasks.find(t => t.id === taskId);
  if (!task) return false;

  AppState.tasks = AppState.tasks.filter(t => t.id !== taskId);
  logActivity('Aufgabe gelöscht', `Aufgabe "${task.title}" gelöscht.`, 'delete');
  saveState();
  renderApp();
  showToast(`Aufgabe "${task.title}" gelöscht.`, 'info');
  return true;
}

// Schadenmeldungen CRUD & Direkt-Routing an Admin Bella
function saveDamage(damageData) {
  const isEdit = Boolean(damageData.id);

  if (isEdit && !assertAdmin('Schadenmeldung bearbeiten')) {
    return false;
  }

  if (isEdit) {
    const idx = AppState.damages.findIndex(d => d.id === damageData.id);
    if (idx === -1) {
      showToast('Schadenmeldung nicht gefunden.', 'error');
      return false;
    }
    const prev = AppState.damages[idx];
    const updated = {
      ...prev,
      title: damageData.title.trim(),
      location: damageData.location,
      reporterName: damageData.reporterName,
      urgency: damageData.urgency,
      youthId: damageData.youthId || null,
      description: damageData.description.trim(),
      status: damageData.status || prev.status,
      resolutionNotes: damageData.resolutionNotes !== undefined ? damageData.resolutionNotes.trim() : prev.resolutionNotes
    };

    // Synchronize linked task for Bella
    if (updated.adminTaskId) {
      const task = AppState.tasks.find(t => t.id === updated.adminTaskId);
      if (task) {
        task.title = `🚨 [SCHADEN] ${updated.title} (${updated.location})`;
        task.youthId = updated.youthId;
        task.priority = (updated.urgency === 'notfall' || updated.urgency === 'hoch') ? TASK_PRIORITIES.HOCH : TASK_PRIORITIES.MITTEL;
        if (updated.status === 'behoben') {
          task.status = TASK_STATUSES.ERLEDIGT;
        } else if (updated.status === 'in Arbeit') {
          task.status = TASK_STATUSES.IN_ARBEIT;
        } else {
          task.status = TASK_STATUSES.OFFEN;
        }
      }
    }

    AppState.damages[idx] = updated;
    logActivity('Schaden aktualisiert', `Mangel "${updated.title}" (${updated.location}, Status: ${updated.status}) aktualisiert.`, 'update');
    showToast(`Schadenmeldung "${updated.title}" aktualisiert.`, 'success');
  } else {
    // NEW DAMAGE REPORT: Allowed for all staff members without login!
    const newDamageId = 'dmg-' + Date.now();
    const todayStr = new Date().toISOString().slice(0, 10);

    // 1. Create linked urgent task assigned to Admin Bella ('emp-101')
    const adminTask = {
      id: 'task-' + Date.now(),
      title: `🚨 [SCHADEN] ${damageData.title.trim()} (${damageData.location})`,
      assignedTo: 'emp-101', // Bella (Schulpersonal & App-Administratorin)
      youthId: damageData.youthId || null,
      priority: (damageData.urgency === 'notfall' || damageData.urgency === 'hoch') ? TASK_PRIORITIES.HOCH : TASK_PRIORITIES.MITTEL,
      dueDate: todayStr,
      status: TASK_STATUSES.OFFEN,
      damageId: newDamageId
    };
    AppState.tasks.unshift(adminTask);

    // 2. Create damage record
    const newDamage = {
      id: newDamageId,
      title: damageData.title.trim(),
      location: damageData.location,
      reporterName: damageData.reporterName,
      urgency: damageData.urgency,
      youthId: damageData.youthId || null,
      description: damageData.description.trim(),
      status: DAMAGE_STATUSES.GEMELDET,
      createdAt: new Date().toISOString(),
      adminTaskId: adminTask.id,
      resolutionNotes: ''
    };
    AppState.damages.unshift(newDamage);

    // 3. Log into activity trail
    logActivity(
      '🚨 Schadenmeldung weitergeleitet',
      `${damageData.reporterName} hat "${newDamage.title}" in ${newDamage.location} gemeldet -> Direkt als Aufgabe an Admin Bella zugewiesen.`,
      'create'
    );

    showToast(`🚨 Schadenmeldung erfolgreich übermittelt und an Admin Bella weitergeleitet!`, 'success');
  }

  saveState();
  renderApp();
  return true;
}

function updateDamageStatus(damageId, newStatus, resolutionNotes = null) {
  if (!assertAdmin('Schadenstatus ändern')) return false;

  const damage = AppState.damages.find(d => d.id === damageId);
  if (!damage) return false;

  const oldStatus = damage.status;
  damage.status = newStatus;
  if (resolutionNotes !== null) {
    damage.resolutionNotes = resolutionNotes;
  }

  // Synchronize linked task
  if (damage.adminTaskId) {
    const task = AppState.tasks.find(t => t.id === damage.adminTaskId);
    if (task) {
      if (newStatus === 'behoben') {
        task.status = TASK_STATUSES.ERLEDIGT;
      } else if (newStatus === 'in Arbeit') {
        task.status = TASK_STATUSES.IN_ARBEIT;
      } else {
        task.status = TASK_STATUSES.OFFEN;
      }
    }
  }

  logActivity('Schadenstatus geändert', `"${damage.title}": von "${oldStatus}" auf "${newStatus}".`, 'update');
  saveState();
  renderApp();
  showToast(`Status auf "${newStatus}" gesetzt.`, 'success');
  return true;
}

function deleteDamage(damageId) {
  if (!assertAdmin('Schadenmeldung löschen')) return false;

  const damage = AppState.damages.find(d => d.id === damageId);
  if (!damage) return false;

  // Cascade: also delete or unassign the linked admin task
  if (damage.adminTaskId) {
    AppState.tasks = AppState.tasks.filter(t => t.id !== damage.adminTaskId);
  }

  AppState.damages = AppState.damages.filter(d => d.id !== damageId);
  logActivity('Schadenmeldung gelöscht', `Meldung "${damage.title}" (${damage.location}) gelöscht.`, 'delete');
  saveState();
  renderApp();
  showToast(`Schadenmeldung "${damage.title}" gelöscht.`, 'info');
  return true;
}

// ============================================================================
// 7. ROUTING & VIEW NAVIGATION
// ============================================================================

function switchView(viewName) {
  const validViews = ['dashboard', 'employees', 'youths', 'tasks', 'damages', 'login'];
  const target = validViews.includes(viewName) ? viewName : 'dashboard';

  AppState.activeView = target;

  document.querySelectorAll('.content-view').forEach(view => {
    view.classList.remove('active');
  });
  const activeContainer = document.getElementById(`view-${target}`);
  if (activeContainer) {
    activeContainer.classList.add('active');
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.nav === target);
  });

  closeMobileSidebar();

  if (target === 'dashboard') renderDashboard();
  if (target === 'employees') renderEmployees();
  if (target === 'youths') renderYouths();
  if (target === 'tasks') renderTasks();
  if (target === 'damages') renderDamages();
  if (target === 'login') renderLoginView();
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (sidebar) sidebar.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
}

// ============================================================================
// 8. RENDER ENGINES
// ============================================================================

function renderApp() {
  checkAccessGate();
  renderAuthUI();
  renderBadges();
  renderRoleUI();
  renderShiftCockpit();
  renderDashboard();
  renderEmployees();
  renderYouths();
  renderTasks();
  renderDamages();
  renderLoginView();
}

function renderAuthUI() {
  const container = document.getElementById('authStatusContainer');
  if (!container) return;

  const user = AppState.currentUser;
  if (!user || !user.id) {
    container.innerHTML = `
      <div class="auth-guest-chip">
        <button id="btnAuthLogin" class="btn-login-trigger" title="Mitarbeiter-Login ?ffnen">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>Anmelden</span>
        </button>
      </div>
    `;
    document.getElementById('btnAuthLogin')?.addEventListener('click', () => checkAccessGate());
    return;
  }

  const isAdmin = isBellaAdmin();
  const initials = user.displayName ? user.displayName.substring(0, 2).toUpperCase() : 'LF';

  container.innerHTML = `
    <div class="auth-user-chip" title="Angemeldet als ${escapeHtml(user.displayName)} (${escapeHtml(user.role)})">
      <div class="auth-avatar ${isAdmin ? 'admin-avatar' : ''}">${initials}</div>
      <div class="auth-details">
        <span class="auth-name">
          ${escapeHtml(user.displayName)}
          ${isAdmin ? '??' : ''}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#86efac" stroke-width="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
        <span class="auth-role-tag">${isAdmin ? 'App Admin ? Schule' : escapeHtml(user.team)}</span>
      </div>
      <button id="btnAuthLogout" class="btn-logout" title="Abmelden und Portal sperren">
        Abmelden
      </button>
    </div>
  `;

  document.getElementById('btnAuthLogout')?.addEventListener('click', logoutUser);
}

function renderBadges() {
  const badgeEmp = document.getElementById('badgeNavEmployees');
  const badgeYouths = document.getElementById('badgeNavYouths');
  const badgeTasks = document.getElementById('badgeNavTasks');
  const badgeDamages = document.getElementById('badgeNavDamages');
  const badgeLogin = document.getElementById('badgeNavLoginStatus');

  if (badgeEmp) {
    badgeEmp.textContent = AppState.employees.length;
  }
  if (badgeYouths) {
    badgeYouths.textContent = AppState.youths.length;
  }
  if (badgeTasks) {
    const openCount = AppState.tasks.filter(t => t.status !== TASK_STATUSES.ERLEDIGT).length;
    badgeTasks.textContent = openCount;
  }
  if (badgeDamages) {
    const openDamagesCount = AppState.damages.filter(d => d.status !== DAMAGE_STATUSES.BEHOBEN).length;
    badgeDamages.textContent = openDamagesCount;
  }
  if (badgeLogin) {
    if (AppState.currentUser && AppState.currentUser.displayName) {
      badgeLogin.textContent = AppState.currentUser.displayName;
      badgeLogin.className = 'nav-badge ' + (isBellaAdmin() ? 'nav-badge-amber' : 'nav-badge-cyan');
    } else {
      badgeLogin.textContent = 'Gesperrt';
      badgeLogin.className = 'nav-badge nav-badge-red';
    }
  }
}

function renderRoleUI() {
  const isAdmin = isBellaAdmin();

  const banner = document.getElementById('roleWarningBanner');
  if (banner) {
    banner.classList.toggle('hidden', isAdmin);
  }

  const mutationButtons = [
    document.getElementById('btnDashNewTask'),
    document.getElementById('btnDashNewEmployee'),
    document.getElementById('btnOpenAddEmployee'),
    document.getElementById('btnOpenAddYouth'),
    document.getElementById('btnOpenAddTask'),
    document.getElementById('btnClearActivityLog'),
    document.getElementById('btnResetSeedData')
  ];

  mutationButtons.forEach(btn => {
    if (btn) {
      btn.disabled = !isAdmin;
      if (!isAdmin) {
        btn.setAttribute('title', 'Nur für Bella (Admin) freigeschaltet');
      } else {
        btn.removeAttribute('title');
      }
    }
  });

  document.querySelectorAll('.admin-action').forEach(el => {
    if (el instanceof HTMLButtonElement || el instanceof HTMLSelectElement) {
      el.disabled = !isAdmin;
      if (!isAdmin) {
        el.setAttribute('title', 'Nur für Bella (Admin) freigeschaltet');
      } else {
        el.removeAttribute('title');
      }
    }
  });
}

function renderShiftCockpit() {
  const container = document.getElementById('dashShiftCockpit');
  if (!container) return;

  const user = AppState.currentUser;
  if (!user || !user.id) {
    container.innerHTML = '';
    return;
  }

  const emp = getLoggedInEmployee();
  const isAdmin = isBellaAdmin();
  const initials = user.displayName ? user.displayName.substring(0, 2).toUpperCase() : 'LF';

  const myTasks = AppState.tasks.filter(t => t.assignedTo === user.id && t.status !== TASK_STATUSES.ERLEDIGT);
  const myYouths = AppState.youths.filter(y => y.bezugsperson === user.id || y.schulbegleitung === user.id);
  const currentStatus = emp ? emp.status : 'anwesend';

  container.innerHTML = `
    <div class="shift-cockpit-card ${isAdmin ? 'is-admin' : ''}">
      <div class="shift-cockpit-user">
        <div class="shift-cockpit-avatar ${isAdmin ? 'admin-avatar' : ''}">${initials}</div>
        <div class="shift-cockpit-info">
          <div class="shift-cockpit-greeting">
            <span>?? Willkommen im Dienst, <strong>${escapeHtml(user.displayName)}</strong>!</span>
            ${isAdmin ? '<span class="badge badge-amber">?? App Admin</span>' : `<span class="badge badge-cyan">${escapeHtml(user.team)}</span>`}
          </div>
          <div class="shift-cockpit-sub">
            <span>Rolle: ${escapeHtml(user.role)}</span>
            <span>?</span>
            <span>?? Meine Aufgaben: <strong>${myTasks.length} offen</strong></span>
            <span>?</span>
            <span>?? Bezugsjugendliche: <strong>${myYouths.length}</strong> (${myYouths.map(y => escapeHtml(y.name)).join(', ') || 'Keine'})</span>
          </div>
        </div>
      </div>

      <div class="shift-cockpit-controls">
        <div class="duty-status-group" title="Deinen Schicht-Status ?ndern">
          <button type="button" class="btn-duty-pill ${currentStatus === 'anwesend' ? 'active-anwesend' : ''}" data-duty-change="anwesend">
            ?? Im Dienst
          </button>
          <button type="button" class="btn-duty-pill ${currentStatus === 'abwesend' ? 'active-abwesend' : ''}" data-duty-change="abwesend">
            ?? Pause
          </button>
          <button type="button" class="btn-duty-pill ${currentStatus === 'frei' ? 'active-frei' : ''}" data-duty-change="frei">
            ? Frei
          </button>
        </div>

        <button type="button" id="btnCockpitSwitchProfile" class="btn btn-sm btn-outline" title="Schicht ?bergeben / Profil wechseln">
          Schicht ?bergeben
        </button>
        <button type="button" id="btnCockpitLogout" class="btn btn-sm btn-outline-danger" title="Abmelden und Portal sperren">
          Abmelden
        </button>
      </div>
    </div>
  `;

  container.querySelectorAll('[data-duty-change]').forEach(btn => {
    btn.addEventListener('click', () => {
      setMyDutyStatus(btn.getAttribute('data-duty-change'));
    });
  });

  document.getElementById('btnCockpitSwitchProfile')?.addEventListener('click', () => {
    switchView('login');
  });

  document.getElementById('btnCockpitLogout')?.addEventListener('click', logoutUser);
}

let loginViewCurrentTeamFilter = 'all';

function renderLoginView() {
  const sessionCard = document.getElementById('loginCurrentSessionCard');
  const staffGrid = document.getElementById('loginStaffGrid');
  const manualSelect = document.getElementById('manualLoginUsername');

  const user = AppState.currentUser;
  const isAdmin = isBellaAdmin();

  if (sessionCard) {
    if (user && user.id) {
      const emp = getLoggedInEmployee();
      const currentStatus = emp ? emp.status : 'anwesend';
      const initials = user.displayName ? user.displayName.substring(0, 2).toUpperCase() : 'LF';

      sessionCard.innerHTML = `
        <div class="session-active-box">
          <div class="session-user-profile">
            <div class="session-avatar-large ${isAdmin ? 'is-admin' : ''}">${initials}</div>
            <div class="session-details">
              <div class="session-title">
                <span>Angemeldet als <strong>${escapeHtml(user.displayName)}</strong></span>
                ${isAdmin ? '<span class="badge badge-amber">?? App Admin</span>' : `<span class="badge badge-cyan">${escapeHtml(user.team)}</span>`}
              </div>
              <div class="session-meta">
                <span>Rolle: ${escapeHtml(user.role)}</span>
                <span>?</span>
                <span class="session-status-badge ${currentStatus === 'anwesend' ? 'status-pill-anwesend' : currentStatus === 'abwesend' ? 'status-pill-abwesend' : 'status-pill-frei'}">
                  ${currentStatus === 'anwesend' ? '?? Im Dienst' : currentStatus === 'abwesend' ? '?? Pause' : '? Frei'}
                </span>
              </div>
            </div>
          </div>
          <div class="shift-cockpit-controls">
            <div class="duty-status-group" title="Deinen Dienststatus ?ndern">
              <button type="button" class="btn-duty-pill ${currentStatus === 'anwesend' ? 'active-anwesend' : ''}" data-duty-change="anwesend">?? Im Dienst</button>
              <button type="button" class="btn-duty-pill ${currentStatus === 'abwesend' ? 'active-abwesend' : ''}" data-duty-change="abwesend">?? Pause</button>
              <button type="button" class="btn-duty-pill ${currentStatus === 'frei' ? 'active-frei' : ''}" data-duty-change="frei">? Frei</button>
            </div>
            <button type="button" id="btnLoginViewLogout" class="btn btn-outline-danger">
              Abmelden & Portal sperren
            </button>
          </div>
        </div>
      `;

      sessionCard.querySelectorAll('[data-duty-change]').forEach(btn => {
        btn.addEventListener('click', () => {
          setMyDutyStatus(btn.getAttribute('data-duty-change'));
        });
      });

      document.getElementById('btnLoginViewLogout')?.addEventListener('click', logoutUser);
    } else {
      sessionCard.innerHTML = `
        <div class="session-empty-box">
          <div class="session-empty-info">
            <div class="session-empty-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <div>
              <div class="text-white font-semibold">Kein Mitarbeiter angemeldet</div>
              <div class="text-muted text-sm">W?hle dein Profil unten aus, um deine Schicht zu starten.</div>
            </div>
          </div>
        </div>
      `;
    }
  }


  if (manualSelect && manualSelect.options.length === 0) {
    manualSelect.innerHTML = AppState.employees.map(emp => {
      const isCardAdmin = emp.isAdmin || emp.name.toLowerCase() === 'bella';
      return `<option value="${emp.id}">${escapeHtml(emp.name)} (${escapeHtml(emp.team)}${isCardAdmin ? ' ? ?? Admin' : ''})</option>`;
    }).join('');
  }
}

function renderDashboard() {
  const totalEmployees = AppState.employees.length;
  const presentEmployees = AppState.employees.filter(e => e.status === EMPLOYEE_STATUSES.ANWESEND).length;
  const absentEmployees = AppState.employees.filter(e => e.status === EMPLOYEE_STATUSES.ABWESEND).length;
  const offEmployees = AppState.employees.filter(e => e.status === EMPLOYEE_STATUSES.FREI).length;

  const totalYouths = AppState.youths.length;
  const inHomeYouths = AppState.youths.filter(y => y.status === YOUTH_STATUSES.IM_HEIM).length;
  const schoolYouths = AppState.youths.filter(y => y.status === YOUTH_STATUSES.SCHULE).length;
  const timeoutYouths = AppState.youths.filter(y => y.status === YOUTH_STATUSES.TIMEOUT).length;
  const vacationYouths = AppState.youths.filter(y => y.status === YOUTH_STATUSES.URLAUB).length;

  const totalTasks = AppState.tasks.length;
  const openTasks = AppState.tasks.filter(t => t.status === TASK_STATUSES.OFFEN).length;
  const inProgressTasks = AppState.tasks.filter(t => t.status === TASK_STATUSES.IN_ARBEIT).length;
  const completedTasks = AppState.tasks.filter(t => t.status === TASK_STATUSES.ERLEDIGT).length;
  const highPriorityTasks = AppState.tasks.filter(t => t.priority === TASK_PRIORITIES.HOCH && t.status !== TASK_STATUSES.ERLEDIGT).length;

  // Stat Card 1: Employees
  const elTotalEmp = document.getElementById('statTotalEmployees');
  const elTeamCount = document.getElementById('statTeamCount');
  if (elTotalEmp) elTotalEmp.textContent = totalEmployees;
  if (elTeamCount) {
    const activeTeamsCount = new Set(AppState.employees.map(e => e.team)).size;
    elTeamCount.textContent = `${activeTeamsCount} Fachbereiche`;
  }

  // Stat Card 2: Presence
  const elPresent = document.getElementById('statPresentEmployees');
  const elPresenceRate = document.getElementById('statPresenceRate');
  const elAbsenceNote = document.getElementById('statAbsenceNote');
  if (elPresent) elPresent.textContent = presentEmployees;
  if (elPresenceRate) {
    const rate = totalEmployees > 0 ? Math.round((presentEmployees / totalEmployees) * 100) : 0;
    elPresenceRate.textContent = `${rate}% Quote`;
  }
  if (elAbsenceNote) {
    elAbsenceNote.textContent = `${absentEmployees} abwesend · ${offEmployees} frei`;
  }

  // Stat Card 3: Youths
  const elTotalYouths = document.getElementById('statTotalYouths');
  const elYouthPresence = document.getElementById('statYouthPresence');
  const elYouthStatusNote = document.getElementById('statYouthStatusNote');
  if (elTotalYouths) elTotalYouths.textContent = totalYouths;
  if (elYouthPresence) {
    elYouthPresence.textContent = `${inHomeYouths} im Heim`;
  }
  if (elYouthStatusNote) {
    elYouthStatusNote.textContent = `${schoolYouths} Schule · ${timeoutYouths} Time-out · ${vacationYouths} Urlaub`;
  }

  // Stat Card 4: Open Tasks
  const elOpen = document.getElementById('statOpenTasks');
  const elHighPrio = document.getElementById('statHighPriorityTasks');
  const elInProgress = document.getElementById('statInProgressTasks');
  if (elOpen) elOpen.textContent = openTasks + inProgressTasks;
  if (elHighPrio) elHighPrio.textContent = `${highPriorityTasks} hohe Prio`;
  if (elInProgress) elInProgress.textContent = `${inProgressTasks} in Bearbeitung`;

  // Stat Card 5: Completed
  const elCompleted = document.getElementById('statCompletedTasks');
  const elCompletionRate = document.getElementById('statCompletionRate');
  if (elCompleted) elCompleted.textContent = completedTasks;
  if (elCompletionRate) {
    const compRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    elCompletionRate.textContent = `${compRate}% Erledigt`;
  }

  // Stat Card 6: Damages
  const openDamages = AppState.damages.filter(d => d.status !== DAMAGE_STATUSES.BEHOBEN).length;
  const urgentDamages = AppState.damages.filter(d => (d.urgency === DAMAGE_URGENCIES.NOTFALL || d.urgency === DAMAGE_URGENCIES.HOCH) && d.status !== DAMAGE_STATUSES.BEHOBEN).length;
  const resolvedDamages = AppState.damages.filter(d => d.status === DAMAGE_STATUSES.BEHOBEN).length;

  const elOpenDamages = document.getElementById('statOpenDamages');
  const elUrgentDamages = document.getElementById('statUrgentDamages');
  const elResolvedDamages = document.getElementById('statResolvedDamages');
  if (elOpenDamages) elOpenDamages.textContent = openDamages;
  if (elUrgentDamages) elUrgentDamages.textContent = `${urgentDamages} Dringend`;
  if (elResolvedDamages) elResolvedDamages.textContent = `${resolvedDamages} behoben`;

  // Damage Alert Banner
  const alertBanner = document.getElementById('dashDamageAlertBanner');
  const alertTitle = document.getElementById('dashDamageAlertTitle');
  const alertDesc = document.getElementById('dashDamageAlertDesc');
  if (alertBanner) {
    if (openDamages > 0) {
      alertBanner.classList.remove('hidden');
      if (alertTitle) {
        alertTitle.textContent = `${openDamages} offene Schadenmeldung${openDamages > 1 ? 'en' : ''} in der Liegenschaft!`;
      }
      if (alertDesc) {
        alertDesc.textContent = urgentDamages > 0
          ? `⚠️ ${urgentDamages} Fall/Fälle mit hoher/Notfall-Dringlichkeit erfordern Massnahmen von Admin Bella.`
          : `Defekte in der Liegenschaft Kanzelstrasse 23 wurden direkt an Admin Bella weitergeleitet.`;
      }
    } else {
      alertBanner.classList.add('hidden');
    }
  }

  // Multi-segment progress bar
  const pctOffen = totalTasks > 0 ? Math.round((openTasks / totalTasks) * 100) : 0;
  const pctInArbeit = totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0;
  const pctErledigt = totalTasks > 0 ? (100 - pctOffen - pctInArbeit) : 0;

  const barOffen = document.getElementById('barOffen');
  const barInArbeit = document.getElementById('barInArbeit');
  const barErledigt = document.getElementById('barErledigt');

  if (barOffen) barOffen.style.width = `${totalTasks > 0 ? pctOffen : 33.3}%`;
  if (barInArbeit) barInArbeit.style.width = `${totalTasks > 0 ? pctInArbeit : 33.3}%`;
  if (barErledigt) barErledigt.style.width = `${totalTasks > 0 ? pctErledigt : 33.4}%`;

  const legOffenVal = document.getElementById('legendOffenVal');
  const legOffenPct = document.getElementById('legendOffenPct');
  const legInArbeitVal = document.getElementById('legendInArbeitVal');
  const legInArbeitPct = document.getElementById('legendInArbeitPct');
  const legErledigtVal = document.getElementById('legendErledigtVal');
  const legErledigtPct = document.getElementById('legendErledigtPct');

  if (legOffenVal) legOffenVal.textContent = openTasks;
  if (legOffenPct) legOffenPct.textContent = `(${pctOffen}%)`;
  if (legInArbeitVal) legInArbeitVal.textContent = inProgressTasks;
  if (legInArbeitPct) legInArbeitPct.textContent = `(${pctInArbeit}%)`;
  if (legErledigtVal) legErledigtVal.textContent = completedTasks;
  if (legErledigtPct) legErledigtPct.textContent = `(${pctErledigt}%)`;

  renderTeamDistribution();
  renderActivityLog();
}

function renderTeamDistribution() {
  const container = document.getElementById('dashTeamCards');
  if (!container) return;

  const teamCardsHtml = TEAMS.map(teamName => {
    const teamMembers = AppState.employees.filter(e => e.team === teamName);
    const memberIds = teamMembers.map(m => m.id);
    const teamOpenTasks = AppState.tasks.filter(t => memberIds.includes(t.assignedTo) && t.status !== TASK_STATUSES.ERLEDIGT).length;

    return `
      <div class="team-summary-card">
        <span class="team-summary-title">${escapeHtml(teamName)}</span>
        <span class="team-summary-stat"><strong>${teamMembers.length}</strong> im Team</span>
        <span class="team-summary-stat"><strong>${teamOpenTasks}</strong> offene Tasks</span>
      </div>
    `;
  }).join('');

  container.innerHTML = teamCardsHtml;
}

function renderActivityLog() {
  const container = document.getElementById('activityFeedList');
  if (!container) return;

  if (AppState.activityLog.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 1.5rem 0;">
        <p style="font-size: 0.8125rem;">Noch keine Aktionen protokolliert.</p>
      </div>
    `;
    return;
  }

  const itemsHtml = AppState.activityLog.map(item => {
    const formattedTime = formatTimestamp(item.timestamp);
    const typeClass = `type-${item.type || 'update'}`;

    return `
      <div class="activity-item ${typeClass}">
        <div class="activity-content">
          <div class="activity-text">
            <strong>${escapeHtml(item.action)}:</strong> ${escapeHtml(item.details)}
          </div>
          <div class="activity-time">${formattedTime}</div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = itemsHtml;
}

function renderEmployees() {
  const grid = document.getElementById('employeesGrid');
  const emptyState = document.getElementById('employeesEmptyState');
  if (!grid) return;

  const { search, team, status } = AppState.filters.employees;
  const normalizedSearch = search.toLowerCase().trim();

  const filtered = AppState.employees.filter(emp => {
    const matchesSearch = !normalizedSearch || 
      emp.name.toLowerCase().includes(normalizedSearch) || 
      emp.role.toLowerCase().includes(normalizedSearch);

    const matchesTeam = !team || emp.team === team;
    const matchesStatus = !status || emp.status === status;

    return matchesSearch && matchesTeam && matchesStatus;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  const isAdmin = isBellaAdmin();

  grid.innerHTML = filtered.map(emp => {
    const assignedTasks = AppState.tasks.filter(t => t.assignedTo === emp.id);
    const pendingTasks = assignedTasks.filter(t => t.status !== TASK_STATUSES.ERLEDIGT);

    // Count youth who have this employee as Bezugsperson
    const assignedYouths = AppState.youths.filter(y => y.bezugsperson === emp.id);

    const initials = getInitials(emp.name);
    const statusBadgeClass = `badge-status-${emp.status}`;
    const statusLabel = emp.status === 'anwesend' ? 'Im Dienst' : capitalizeFirstLetter(emp.status);

    return `
      <article class="employee-card" data-emp-id="${escapeHtml(emp.id)}">
        <div class="employee-card-header">
          <div class="employee-avatar" aria-hidden="true">${escapeHtml(initials)}</div>
          <div class="employee-info">
            <h3 class="employee-name" title="${escapeHtml(emp.name)}">${escapeHtml(emp.name)}</h3>
            <p class="employee-role" title="${escapeHtml(emp.role)}">${escapeHtml(emp.role)}</p>
          </div>
        </div>

        <div class="employee-meta-row">
          <span class="badge ${statusBadgeClass}">
            <span class="legend-color-dot ${emp.status === 'anwesend' ? 'dot-green' : emp.status === 'frei' ? 'dot-amber' : 'dot-red'}"></span>
            ${escapeHtml(statusLabel)}
          </span>
          <span class="badge badge-team">${escapeHtml(emp.team)}</span>
          ${assignedYouths.length > 0 ? `
            <span class="badge badge-youth-im-heim" title="${assignedYouths.length} betreute Jugendliche">
              👤 ${assignedYouths.length} Bezug
            </span>
          ` : ''}
          <span class="badge-assigned-tasks" title="${assignedTasks.length} gesamt, ${pendingTasks.length} offen">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            ${pendingTasks.length} offen (${assignedTasks.length})
          </span>
        </div>

        <div class="employee-card-footer">
          <button class="btn btn-sm btn-outline admin-action btn-edit-employee" 
                  data-emp-id="${escapeHtml(emp.id)}" 
                  ${!isAdmin ? 'disabled title="Nur für Bella (Admin) freigeschaltet"' : ''}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Bearbeiten
          </button>
          <button class="btn-icon btn-icon-danger admin-action btn-delete-employee" 
                  data-emp-id="${escapeHtml(emp.id)}" 
                  aria-label="Mitarbeitenden löschen" 
                  ${!isAdmin ? 'disabled title="Nur für Bella (Admin) freigeschaltet"' : 'title="Mitarbeitenden löschen"'}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </article>
    `;
  }).join('');
}

function renderYouths() {
  const grid = document.getElementById('youthsGrid');
  const emptyState = document.getElementById('youthsEmptyState');
  if (!grid) return;

  updateYouthFilterBezugspersonOptions();

  const { search, status, bezugsperson } = AppState.filters.youths;
  const normalizedSearch = search.toLowerCase().trim();

  const filtered = AppState.youths.filter(y => {
    const matchesSearch = !normalizedSearch || 
      y.name.toLowerCase().includes(normalizedSearch) || 
      (y.fokus && y.fokus.toLowerCase().includes(normalizedSearch)) ||
      (y.room && y.room.toLowerCase().includes(normalizedSearch));

    const matchesStatus = !status || y.status === status;
    const matchesBezug = !bezugsperson || y.bezugsperson === bezugsperson;

    return matchesSearch && matchesStatus && matchesBezug;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  const isAdmin = isBellaAdmin();

  grid.innerHTML = filtered.map(y => {
    const bezugEmp = AppState.employees.find(e => e.id === y.bezugsperson);
    const bezugName = bezugEmp ? bezugEmp.name : 'Nicht zugewiesen';

    const schulEmp = AppState.employees.find(e => e.id === y.schulbegleitung);
    const schulName = schulEmp ? schulEmp.name : 'Keine';

    const youthTasks = AppState.tasks.filter(t => t.youthId === y.id);
    const openTasks = youthTasks.filter(t => t.status !== TASK_STATUSES.ERLEDIGT);

    const initials = getInitials(y.name);

    let statusClass = 'badge-youth-im-heim';
    if (y.status === YOUTH_STATUSES.SCHULE) statusClass = 'badge-youth-schule';
    if (y.status === YOUTH_STATUSES.URLAUB) statusClass = 'badge-youth-urlaub';
    if (y.status === YOUTH_STATUSES.TIMEOUT) statusClass = 'badge-youth-timeout';

    return `
      <article class="youth-card" data-youth-id="${escapeHtml(y.id)}">
        <div class="youth-card-header">
          <div class="youth-avatar" aria-hidden="true">${escapeHtml(initials)}</div>
          <div class="youth-info">
            <h3 class="youth-name">${escapeHtml(y.name)}</h3>
            <span class="youth-room">${escapeHtml(y.room || 'Wohngruppe Egerkingen')}</span>
          </div>
          <span class="badge ${statusClass}">${escapeHtml(y.status)}</span>
        </div>

        <div class="youth-relations">
          <div class="youth-relation-row">
            <span class="youth-relation-label">Bezugsperson:</span>
            <span class="youth-relation-val">🛡️ ${escapeHtml(bezugName)}</span>
          </div>
          <div class="youth-relation-row">
            <span class="youth-relation-label">Schule/Bildung:</span>
            <span class="youth-relation-val">📚 ${escapeHtml(schulName)}</span>
          </div>
        </div>

        ${y.fokus ? `
          <div class="youth-fokus-box" title="Förderfokus">
            🎯 ${escapeHtml(y.fokus)}
          </div>
        ` : ''}

        <div class="youth-card-footer">
          <span class="badge-assigned-tasks">
            📋 ${openTasks.length} offene Tasks (${youthTasks.length})
          </span>

          <div style="display: flex; gap: 0.35rem;">
            <button class="btn btn-sm btn-outline admin-action btn-edit-youth" 
                    data-youth-id="${escapeHtml(y.id)}" 
                    ${!isAdmin ? 'disabled title="Nur für Bella (Admin) freigeschaltet"' : ''}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Bearbeiten
            </button>
            <button class="btn-icon btn-icon-danger admin-action btn-delete-youth" 
                    data-youth-id="${escapeHtml(y.id)}" 
                    aria-label="Jugendlichen löschen" 
                    ${!isAdmin ? 'disabled title="Nur für Bella (Admin) freigeschaltet"' : 'title="Jugendlichen löschen"'}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function updateYouthFilterBezugspersonOptions() {
  const select = document.getElementById('filterYouthBezugsperson');
  if (!select) return;

  const currentVal = select.value;
  let optionsHtml = '<option value="">Alle Bezugspersonen</option>';

  AppState.employees.forEach(emp => {
    optionsHtml += `<option value="${escapeHtml(emp.id)}">${escapeHtml(emp.name)} (${escapeHtml(emp.team)})</option>`;
  });

  select.innerHTML = optionsHtml;
  select.value = currentVal;
}

function renderTasks() {
  const container = document.getElementById('tasksList');
  const emptyState = document.getElementById('tasksEmptyState');
  if (!container) return;

  updateTaskFilterAssigneeOptions();

  const { search, priority, status, assignee } = AppState.filters.tasks;
  const normalizedSearch = search.toLowerCase().trim();

  const filtered = AppState.tasks.filter(task => {
    const matchesSearch = !normalizedSearch || task.title.toLowerCase().includes(normalizedSearch);
    const matchesPriority = !priority || task.priority === priority;
    const matchesStatus = !status || task.status === status;

    let matchesAssignee = true;
    if (assignee === 'unassigned') {
      matchesAssignee = !task.assignedTo;
    } else if (assignee) {
      matchesAssignee = task.assignedTo === assignee;
    }

    return matchesSearch && matchesPriority && matchesStatus && matchesAssignee;
  });

  if (filtered.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  const isAdmin = isBellaAdmin();
  const todayStr = new Date().toISOString().slice(0, 10);

  container.innerHTML = filtered.map(task => {
    const assignedEmp = AppState.employees.find(e => e.id === task.assignedTo);
    const assigneeName = assignedEmp ? assignedEmp.name : 'Nicht zugewiesen';
    const isUnassigned = !assignedEmp;

    // Check linked youth
    const linkedYouth = task.youthId ? AppState.youths.find(y => y.id === task.youthId) : null;

    const isOverdue = task.dueDate < todayStr && task.status !== TASK_STATUSES.ERLEDIGT;
    const formattedDate = formatDate(task.dueDate);

    const prioBadgeClass = `badge-prio-${task.priority}`;
    const prioLabel = task.priority === 'hoch' ? 'Hoch (Dringend)' : capitalizeFirstLetter(task.priority);
    const statusCssClass = `status-${task.status.toLowerCase().replace(/\s+/g, '-')}`;

    return `
      <article class="task-card ${statusCssClass}" data-task-id="${escapeHtml(task.id)}">
        <div class="task-main-col">
          <div class="task-title-row">
            <span class="badge ${prioBadgeClass}">${escapeHtml(prioLabel)}</span>
            <h3 class="task-title">${escapeHtml(task.title)}</h3>
          </div>

          <div class="task-meta-row">
            <span class="task-assignee-chip ${isUnassigned ? 'unassigned' : ''}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              ${escapeHtml(assigneeName)}
            </span>

            ${linkedYouth ? `
              <span class="task-youth-chip" title="Betrifft Jugendlichen: ${escapeHtml(linkedYouth.name)}">
                👤 ${escapeHtml(linkedYouth.name)}
              </span>
            ` : ''}

            <span class="task-due-date ${isOverdue ? 'overdue' : ''}" title="${isOverdue ? 'Überfällig!' : 'Fälligkeitsdatum'}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              ${formattedDate} ${isOverdue ? '⚠️' : ''}
            </span>
          </div>
        </div>

        <div class="task-actions-col">
          <select class="task-status-selector admin-action ${statusCssClass}" 
                  data-task-id="${escapeHtml(task.id)}"
                  ${!isAdmin ? 'disabled title="Nur für Bella (Admin) freigeschaltet"' : ''}>
            <option value="offen" ${task.status === 'offen' ? 'selected' : ''}>Offen</option>
            <option value="in Arbeit" ${task.status === 'in Arbeit' ? 'selected' : ''}>In Arbeit</option>
            <option value="erledigt" ${task.status === 'erledigt' ? 'selected' : ''}>Erledigt</option>
          </select>

          <button class="btn-icon admin-action btn-edit-task" 
                  data-task-id="${escapeHtml(task.id)}" 
                  aria-label="Aufgabe bearbeiten"
                  ${!isAdmin ? 'disabled title="Nur für Bella (Admin) freigeschaltet"' : 'title="Aufgabe bearbeiten"'}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>

          <button class="btn-icon btn-icon-danger admin-action btn-delete-task" 
                  data-task-id="${escapeHtml(task.id)}" 
                  aria-label="Aufgabe löschen"
                  ${!isAdmin ? 'disabled title="Nur für Bella (Admin) freigeschaltet"' : 'title="Aufgabe löschen"'}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </article>
    `;
  }).join('');
}

function updateTaskFilterAssigneeOptions() {
  const select = document.getElementById('filterTaskAssignee');
  if (!select) return;

  const currentVal = select.value;

  let optionsHtml = `
    <option value="">Alle Zuständigen</option>
    <option value="unassigned">Nicht zugewiesen</option>
  `;

  AppState.employees.forEach(emp => {
    optionsHtml += `<option value="${escapeHtml(emp.id)}">${escapeHtml(emp.name)} (${escapeHtml(emp.team)})</option>`;
  });

  select.innerHTML = optionsHtml;
  select.value = currentVal;
}

function renderDamages() {
  const container = document.getElementById('damagesList');
  const emptyState = document.getElementById('damagesEmptyState');
  if (!container) return;

  const { search, urgency, status } = AppState.filters.damages;
  const normalizedSearch = search.toLowerCase().trim();

  const filtered = AppState.damages.filter(damage => {
    const matchesSearch = !normalizedSearch ||
      damage.title.toLowerCase().includes(normalizedSearch) ||
      damage.location.toLowerCase().includes(normalizedSearch) ||
      damage.reporterName.toLowerCase().includes(normalizedSearch) ||
      damage.description.toLowerCase().includes(normalizedSearch);

    const matchesUrgency = !urgency || damage.urgency === urgency;
    const matchesStatus = !status || damage.status === status;

    return matchesSearch && matchesUrgency && matchesStatus;
  });

  if (filtered.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  const isAdmin = isBellaAdmin();

  container.innerHTML = filtered.map(dmg => {
    const linkedYouth = dmg.youthId ? AppState.youths.find(y => y.id === dmg.youthId) : null;
    const linkedTask = dmg.adminTaskId ? AppState.tasks.find(t => t.id === dmg.adminTaskId) : null;

    let urgencyLabel = 'Normal';
    let urgencyBadgeClass = 'badge-urgency-mittel';
    if (dmg.urgency === 'notfall') {
      urgencyLabel = '🚨 Notfall (24h)';
      urgencyBadgeClass = 'badge-urgency-notfall';
    } else if (dmg.urgency === 'hoch') {
      urgencyLabel = '⚠️ Hoch (Dringend)';
      urgencyBadgeClass = 'badge-urgency-hoch';
    } else if (dmg.urgency === 'niedrig') {
      urgencyLabel = '🌱 Niedrig';
      urgencyBadgeClass = 'badge-urgency-niedrig';
    }

    let statusBadgeClass = 'damage-status-gemeldet';
    let statusLabel = 'Gemeldet (Offen)';
    if (dmg.status === 'in Arbeit') {
      statusBadgeClass = 'damage-status-in-arbeit';
      statusLabel = 'In Bearbeitung';
    } else if (dmg.status === 'behoben') {
      statusBadgeClass = 'damage-status-behoben';
      statusLabel = 'Behoben / Erledigt';
    }

    const formattedDate = dmg.createdAt ? new Date(dmg.createdAt).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Heute';

    return `
      <article class="damage-card urgency-${escapeHtml(dmg.urgency)}" data-damage-id="${escapeHtml(dmg.id)}">
        <div class="damage-card-header">
          <div>
            <div class="damage-badges-row">
              <span class="badge ${urgencyBadgeClass}">${escapeHtml(urgencyLabel)}</span>
              <span class="damage-status-badge ${statusBadgeClass}">${escapeHtml(statusLabel)}</span>
            </div>
            <h3 class="damage-card-title" style="margin-top: 0.4rem;">${escapeHtml(dmg.title)}</h3>
            <span class="damage-location-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              ${escapeHtml(dmg.location)}
            </span>
          </div>
        </div>

        <div class="damage-description-text">
          ${escapeHtml(dmg.description)}
        </div>

        <div class="damage-meta-grid">
          <div class="damage-meta-item">
            <span>Gemeldet von:</span>
            <strong>👤 ${escapeHtml(dmg.reporterName)}</strong>
          </div>
          <div class="damage-meta-item">
            <span>Erfassungszeitpunkt:</span>
            <strong>🕒 ${escapeHtml(formattedDate)}</strong>
          </div>
          ${linkedYouth ? `
            <div class="damage-meta-item" style="grid-column: span 2;">
              <span>Betroffener Jugendlicher:</span>
              <strong>🌟 ${escapeHtml(linkedYouth.name)} (${escapeHtml(linkedYouth.room)})</strong>
            </div>
          ` : ''}
        </div>

        <!-- Direct Admin Routing Pill -->
        <div class="damage-admin-routing-pill">
          <span>👉 Weitergeleitet an: <strong>Admin Bella</strong></span>
          ${linkedTask ? `
            <button type="button" class="btn-jump-task" data-task-id="${escapeHtml(linkedTask.id)}" title="Zur verknüpften Aufgabe springen">
              Aufgabe anzeigen (${escapeHtml(linkedTask.status)})
            </button>
          ` : ''}
        </div>

        ${dmg.resolutionNotes ? `
          <div class="damage-resolution-box">
            <strong>Handwerker- / Reparatur-Notiz:</strong><br>
            ${escapeHtml(dmg.resolutionNotes)}
          </div>
        ` : ''}

        <div class="damage-card-actions">
          ${isAdmin ? `
            <div style="display: flex; gap: 0.35rem; align-items: center;">
              ${dmg.status !== 'behoben' ? `
                <button type="button" class="btn btn-sm btn-outline-cyan btn-damage-set-progress" data-damage-id="${escapeHtml(dmg.id)}" title="In Bearbeitung setzen">
                  In Arbeit
                </button>
                <button type="button" class="btn btn-sm btn-primary btn-damage-set-resolved" data-damage-id="${escapeHtml(dmg.id)}" title="Als behoben markieren">
                  ✓ Behoben
                </button>
              ` : `
                <button type="button" class="btn btn-sm btn-outline btn-damage-reopen" data-damage-id="${escapeHtml(dmg.id)}" title="Wieder öffnen">
                  Wieder öffnen
                </button>
              `}
            </div>

            <div style="display: flex; gap: 0.25rem;">
              <button type="button" class="btn-icon btn-edit-damage" data-damage-id="${escapeHtml(dmg.id)}" title="Schaden bearbeiten">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <button type="button" class="btn-icon btn-icon-danger btn-delete-damage" data-damage-id="${escapeHtml(dmg.id)}" title="Schadenmeldung löschen">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          ` : `
            <span class="text-faint" style="font-size: 0.775rem;">Statusänderung exklusiv für Bella (Admin)</span>
          `}
        </div>
      </article>
    `;
  }).join('');

  // Wire action buttons on cards
  container.querySelectorAll('.btn-damage-set-progress').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-damage-id');
      updateDamageStatus(id, 'in Arbeit');
    });
  });

  container.querySelectorAll('.btn-damage-set-resolved').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-damage-id');
      const notes = prompt('Reparatur-Vermerk für Heim Egerkingen (optional):', 'Defekt behoben / repariert');
      updateDamageStatus(id, 'behoben', notes || 'Behoben');
    });
  });

  container.querySelectorAll('.btn-damage-reopen').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-damage-id');
      updateDamageStatus(id, 'gemeldet');
    });
  });

  container.querySelectorAll('.btn-edit-damage').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-damage-id');
      openDamageModal(id);
    });
  });

  container.querySelectorAll('.btn-delete-damage').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-damage-id');
      if (confirm('Schadenmeldung wirklich löschen?')) {
        deleteDamage(id);
      }
    });
  });

  container.querySelectorAll('.btn-jump-task').forEach(btn => {
    btn.addEventListener('click', () => {
      switchView('tasks');
    });
  });
}

// ============================================================================
// 9. MODALS & INTERACTIONS
// ============================================================================

function openEmployeeModal(empId = null) {
  if (!assertAdmin(empId ? 'Mitarbeitenden bearbeiten' : 'Mitarbeitenden anlegen')) return;

  const modal = document.getElementById('modalEmployee');
  const form = document.getElementById('formEmployee');
  const title = document.getElementById('modalEmployeeTitle');
  if (!modal || !form) return;

  form.reset();
  clearFormErrors('formEmployee');

  if (empId) {
    const emp = AppState.employees.find(e => e.id === empId);
    if (!emp) return;
    title.textContent = 'Mitarbeitenden bearbeiten';
    document.getElementById('empId').value = emp.id;
    document.getElementById('empName').value = emp.name;
    document.getElementById('empRole').value = emp.role;
    document.getElementById('empTeam').value = emp.team;
    document.getElementById('empStatus').value = emp.status;
  } else {
    title.textContent = 'Mitarbeitenden anlegen';
    document.getElementById('empId').value = '';
    document.getElementById('empStatus').value = 'anwesend';
  }

  modal.classList.remove('hidden');
  document.getElementById('empName').focus();
}

function openYouthModal(youthId = null) {
  if (!assertAdmin(youthId ? 'Jugendlichen bearbeiten' : 'Jugendlichen erfassen')) return;

  const modal = document.getElementById('modalYouth');
  const form = document.getElementById('formYouth');
  const title = document.getElementById('modalYouthTitle');
  const bezugSelect = document.getElementById('youthBezugsperson');
  const schulSelect = document.getElementById('youthSchulbegleitung');
  if (!modal || !form) return;

  form.reset();
  clearFormErrors('formYouth');

  // Populate Bezugsperson options
  let bezugHtml = '<option value="">Bezugsperson wählen...</option>';
  AppState.employees.forEach(emp => {
    bezugHtml += `<option value="${escapeHtml(emp.id)}">${escapeHtml(emp.name)} (${escapeHtml(emp.team)})</option>`;
  });
  bezugSelect.innerHTML = bezugHtml;

  // Populate Schulbegleitung options (Bella & Steffi preferred)
  let schulHtml = '<option value="">Keine zugewiesen</option>';
  AppState.employees
    .filter(e => e.team === 'Schule & Bildung' || e.name === 'Bella' || e.name === 'Steffi')
    .forEach(emp => {
      schulHtml += `<option value="${escapeHtml(emp.id)}">${escapeHtml(emp.name)} (${escapeHtml(emp.role)})</option>`;
    });
  schulSelect.innerHTML = schulHtml;

  if (youthId) {
    const youth = AppState.youths.find(y => y.id === youthId);
    if (!youth) return;
    title.textContent = 'Jugendlichen bearbeiten';
    document.getElementById('youthId').value = youth.id;
    document.getElementById('youthName').value = youth.name;
    document.getElementById('youthStatus').value = youth.status;
    document.getElementById('youthRoom').value = youth.room || '';
    document.getElementById('youthBezugsperson').value = youth.bezugsperson || '';
    document.getElementById('youthSchulbegleitung').value = youth.schulbegleitung || '';
    document.getElementById('youthFokus').value = youth.fokus || '';
  } else {
    title.textContent = 'Jugendlichen erfassen';
    document.getElementById('youthId').value = '';
    document.getElementById('youthStatus').value = 'im Heim';
  }

  modal.classList.remove('hidden');
  document.getElementById('youthName').focus();
}

function openTaskModal(taskId = null) {
  if (!assertAdmin(taskId ? 'Aufgabe bearbeiten' : 'Aufgabe anlegen')) return;

  const modal = document.getElementById('modalTask');
  const form = document.getElementById('formTask');
  const title = document.getElementById('modalTaskTitle');
  const assigneeSelect = document.getElementById('taskAssignee');
  const youthSelect = document.getElementById('taskYouth');
  if (!modal || !form) return;

  form.reset();
  clearFormErrors('formTask');

  let assigneeHtml = '<option value="">(Nicht zugewiesen)</option>';
  AppState.employees.forEach(emp => {
    assigneeHtml += `<option value="${escapeHtml(emp.id)}">${escapeHtml(emp.name)} (${escapeHtml(emp.team)})</option>`;
  });
  assigneeSelect.innerHTML = assigneeHtml;

  let youthHtml = '<option value="">(Allgemein / Kein Jugendlicher)</option>';
  AppState.youths.forEach(y => {
    youthHtml += `<option value="${escapeHtml(y.id)}">${escapeHtml(y.name)} (${escapeHtml(y.status)})</option>`;
  });
  youthSelect.innerHTML = youthHtml;

  if (taskId) {
    const task = AppState.tasks.find(t => t.id === taskId);
    if (!task) return;
    title.textContent = 'Aufgabe bearbeiten';
    document.getElementById('taskId').value = task.id;
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskAssignee').value = task.assignedTo || '';
    document.getElementById('taskYouth').value = task.youthId || '';
    document.getElementById('taskPriority').value = task.priority;
    document.getElementById('taskDueDate').value = task.dueDate;
    document.getElementById('taskStatus').value = task.status;
  } else {
    title.textContent = 'Neue Aufgabe erfassen';
    document.getElementById('taskId').value = '';
    const inThreeDays = new Date();
    inThreeDays.setDate(inThreeDays.getDate() + 3);
    document.getElementById('taskDueDate').value = inThreeDays.toISOString().slice(0, 10);
    document.getElementById('taskPriority').value = 'mittel';
    document.getElementById('taskStatus').value = 'offen';
  }

  modal.classList.remove('hidden');
  document.getElementById('taskTitle').focus();
}

function openDamageModal(damageId = null) {
  const modal = document.getElementById('modalDamage');
  const form = document.getElementById('formDamage');
  const title = document.getElementById('modalDamageTitle');
  const reporterSelect = document.getElementById('damageReporter');
  const youthSelect = document.getElementById('damageYouth');
  const adminSection = document.getElementById('damageAdminSection');
  if (!modal || !form) return;

  form.reset();
  clearFormErrors('formDamage');

  // Populate reporters with the 12 employees
  let reporterHtml = '<option value="">(Mitarbeitenden auswählen)</option>';
  AppState.employees.forEach(emp => {
    reporterHtml += `<option value="${escapeHtml(emp.name)}">${escapeHtml(emp.name)} (${escapeHtml(emp.role)})</option>`;
  });
  reporterSelect.innerHTML = reporterHtml;

  // Populate youths with the 10 youths
  let youthHtml = '<option value="">(Kein bestimmter Jugendlicher)</option>';
  AppState.youths.forEach(y => {
    youthHtml += `<option value="${escapeHtml(y.id)}">${escapeHtml(y.name)} (${escapeHtml(y.room)})</option>`;
  });
  youthSelect.innerHTML = youthHtml;

  const isAdmin = isBellaAdmin();

  if (damageId) {
    if (!assertAdmin('Schadenmeldung bearbeiten')) return;

    const dmg = AppState.damages.find(d => d.id === damageId);
    if (!dmg) return;

    title.textContent = 'Schadenmeldung bearbeiten';
    document.getElementById('damageId').value = dmg.id;
    document.getElementById('damageTitle').value = dmg.title;
    document.getElementById('damageLocation').value = dmg.location;
    document.getElementById('damageReporter').value = dmg.reporterName;
    document.getElementById('damageUrgency').value = dmg.urgency;
    document.getElementById('damageYouth').value = dmg.youthId || '';
    document.getElementById('damageDescription').value = dmg.description;

    if (adminSection) {
      adminSection.classList.remove('hidden');
      document.getElementById('damageStatus').value = dmg.status;
      document.getElementById('damageResolutionNotes').value = dmg.resolutionNotes || '';
    }
  } else {
    title.textContent = 'Schadenmeldung erfassen (Direkt an Admin Bella)';
    document.getElementById('damageId').value = '';
    document.getElementById('damageUrgency').value = 'hoch';
    if (adminSection) {
      adminSection.classList.add('hidden');
    }

    if (isAdmin) {
      document.getElementById('damageReporter').value = 'Bella';
    }
  }

  modal.classList.remove('hidden');
  document.getElementById('damageTitle').focus();
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('hidden');
}

let pendingDeleteAction = null;

function promptDeleteEmployee(empId) {
  if (!assertAdmin('Mitarbeitenden löschen')) return;

  const emp = AppState.employees.find(e => e.id === empId);
  if (!emp) return;

  const modal = document.getElementById('modalConfirmDelete');
  const msg = document.getElementById('confirmDeleteMessage');
  const noticeBox = document.getElementById('confirmDeleteSafetyNotice');
  const noticeText = document.getElementById('confirmDeleteSafetyText');

  const linkedTasks = AppState.tasks.filter(t => t.assignedTo === empId);

  msg.textContent = `Möchten Sie "${emp.name}" wirklich aus dem System entfernen?`;

  if (linkedTasks.length > 0) {
    noticeBox.classList.remove('hidden');
    noticeText.textContent = `Sicherheitsregel aktiv: ${linkedTasks.length} zugewiesene Betreuungsaufgabe(n) werden automatisch freigegeben (nicht gelöscht).`;
  } else {
    noticeBox.classList.add('hidden');
  }

  pendingDeleteAction = () => deleteEmployee(empId);
  modal.classList.remove('hidden');
}

function promptDeleteYouth(youthId) {
  if (!assertAdmin('Jugendlichen löschen')) return;

  const youth = AppState.youths.find(y => y.id === youthId);
  if (!youth) return;

  const modal = document.getElementById('modalConfirmDelete');
  const msg = document.getElementById('confirmDeleteMessage');
  const noticeBox = document.getElementById('confirmDeleteSafetyNotice');
  const noticeText = document.getElementById('confirmDeleteSafetyText');

  const linkedTasks = AppState.tasks.filter(t => t.youthId === youthId);

  msg.textContent = `Möchten Sie den Jugendlichen "${youth.name}" wirklich aus dem System entfernen?`;

  if (linkedTasks.length > 0) {
    noticeBox.classList.remove('hidden');
    noticeText.textContent = `Sicherheitsregel: ${linkedTasks.length} verknüpfte Betreuungsaufgabe(n) bleiben erhalten und werden entkoppelt.`;
  } else {
    noticeBox.classList.add('hidden');
  }

  pendingDeleteAction = () => deleteYouth(youthId);
  modal.classList.remove('hidden');
}

function promptDeleteTask(taskId) {
  if (!assertAdmin('Aufgabe löschen')) return;

  const task = AppState.tasks.find(t => t.id === taskId);
  if (!task) return;

  const modal = document.getElementById('modalConfirmDelete');
  const msg = document.getElementById('confirmDeleteMessage');
  const noticeBox = document.getElementById('confirmDeleteSafetyNotice');

  msg.textContent = `Möchten Sie die Aufgabe "${task.title}" wirklich endgültig löschen?`;
  noticeBox.classList.add('hidden');

  pendingDeleteAction = () => deleteTask(taskId);
  modal.classList.remove('hidden');
}

function clearFormErrors(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
  form.querySelectorAll('.form-error').forEach(el => el.textContent = '');
}

// ============================================================================
// 10. TOAST NOTIFICATIONS MANAGER
// ============================================================================

function showToast(message, type = 'info', duration = 3200) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'status');

  const icons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  };

  toast.innerHTML = `
    <span>${icons[type] || 'ℹ️'}</span>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-hide');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 200);
  }, duration);
}

// ============================================================================
// 11. THEME SWITCHER
// ============================================================================

function applyTheme(theme) {
  AppState.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);

  const sunIcon = document.querySelector('.icon-sun');
  const moonIcon = document.querySelector('.icon-moon');

  if (sunIcon && moonIcon) {
    if (theme === 'dark') {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  }

  saveState();
}

function toggleTheme() {
  const nextTheme = AppState.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  showToast(`Design gewechselt auf ${nextTheme === 'dark' ? 'Dunkelmodus' : 'Hellmodus'}.`, 'info');
}

// ============================================================================
// 12. PWA & ADD TO HOME SCREEN SUPPORT
// ============================================================================

let deferredInstallPrompt = null;

function setupPwa() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => {
          console.log('Lebensfunke ServiceWorker registriert:', reg.scope);
        })
        .catch(err => {
          console.warn('ServiceWorker Registrierung nicht möglich:', err);
        });
    });
  }

  const installBtn = document.getElementById('btnInstallPwa');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    if (installBtn) {
      installBtn.classList.remove('hidden');
    }
  });

  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        const choice = await deferredInstallPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          showToast('Lebensfunke wurde zum Startbildschirm hinzugefügt!', 'success');
        }
        deferredInstallPrompt = null;
        installBtn.classList.add('hidden');
      } else {
        const modal = document.getElementById('modalPwaGuide');
        if (modal) modal.classList.remove('hidden');
      }
    });
  }

  window.addEventListener('appinstalled', () => {
    if (installBtn) installBtn.classList.add('hidden');
    showToast('Lebensfunke App erfolgreich installiert!', 'success');
  });

  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  if (isIos && !isStandalone && installBtn) {
    installBtn.classList.remove('hidden');
  }
}

// ============================================================================
// 13. UTILITIES
// ============================================================================

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getInitials(name) {
  if (!name) return 'LF';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function capitalizeFirstLetter(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(dateStr) {
  if (!dateStr) return 'Kein Datum';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}.${parts[1]}.${parts[0]}`;
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}

function formatTimestamp(isoStr) {
  if (!isoStr) return '';
  try {
    const d = new Date(isoStr);
    const day = String(d.getDate()).padStart(2, '0');
    const mon = String(d.getMonth() + 1).padStart(2, '0');
    const yr = d.getFullYear();
    const hrs = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${day}.${mon}.${yr} ${hrs}:${min}`;
  } catch {
    return isoStr;
  }
}

function updateStorageStatusText() {
  const el = document.getElementById('storageInfo');
  if (!el) return;
  const totalItems = AppState.employees.length + AppState.youths.length + AppState.tasks.length;
  el.textContent = `${totalItems} Einträge synchronisiert`;
}

// ============================================================================
// 14. EVENT LISTENERS & SETUP
// ============================================================================

function setupEventListeners() {
  // Navigation Links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetNav = link.dataset.nav;
      window.location.hash = targetNav;
      switchView(targetNav);
    });
  });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');

  if (mobileToggle && sidebar && backdrop) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      backdrop.classList.toggle('open');
    });

    backdrop.addEventListener('click', closeMobileSidebar);
  }

  // Hash change routing
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '') || 'dashboard';
    switchView(hash);
  });

  // Theme Toggle
  document.getElementById('btnThemeToggle')?.addEventListener('click', toggleTheme);

  // Login Trigger from Warning Banner
  document.getElementById('btnBannerLogin')?.addEventListener('click', openLoginModal);

  // Login Form Submission (Modal)
  const formLogin = document.getElementById('formLogin');
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('loginUsername').value;
      const pass = document.getElementById('loginPassword').value;
      const errorBox = document.getElementById('loginAuthError');

      const result = loginAsEmployee(user, pass);
      if (result.success) {
        closeModal('modalLogin');
      } else {
        if (errorBox) {
          errorBox.textContent = result.message;
          errorBox.classList.remove('hidden');
        }
      }
    });
  }

  // Continue / Close Button in Login Modal
  document.getElementById('btnContinueAsGuest')?.addEventListener('click', () => {
    closeModal('modalLogin');
  });



  // Gatekeeper Form Submission
  document.getElementById('formGateLogin')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const userVal = document.getElementById('gateSelectUser')?.value;
    const passVal = document.getElementById('gateInputPassword')?.value;
    const errorBox = document.getElementById('gateAuthError');

    const result = loginAsEmployee(userVal, passVal);
    if (!result.success) {
      if (errorBox) {
        errorBox.textContent = result.message;
        errorBox.classList.remove('hidden');
      }
    } else {
      if (errorBox) errorBox.classList.add('hidden');
    }
  });


  // Manual Login Form on view-login
  document.getElementById('formManualLogin')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const userVal = document.getElementById('manualLoginUsername')?.value;
    const passVal = document.getElementById('manualLoginPassword')?.value;
    const errorBox = document.getElementById('manualLoginError');

    const result = loginAsEmployee(userVal, passVal);
    if (!result.success) {
      if (errorBox) {
        errorBox.textContent = result.message;
        errorBox.classList.remove('hidden');
      }
    } else {
      if (errorBox) errorBox.classList.add('hidden');
      switchView('dashboard');
    }
  });

// Login View Help Button
  document.getElementById('btnViewLoginHelp')?.addEventListener('click', () => {
    alert('Zugangsinformationen Heim Egerkingen:\n\nBitte wenden Sie sich für Ihre persönlichen Zugangsdaten an die Heimleitung oder die Administration.\n\nDas Portal ist geschützt und erfordert eine gültige Schicht-Anmeldung.');
  });

  // Data Export & Import
  document.getElementById('btnExportJson')?.addEventListener('click', exportStateAsJson);
  document.getElementById('importJsonFile')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) {
      importStateFromJson(file);
      e.target.value = '';
    }
  });

  // Reset Demo Data
  document.getElementById('btnResetSeedData')?.addEventListener('click', () => {
    if (confirm('Möchten Sie wirklich alle Daten auf den Heim Egerkingen Standardzustand zurücksetzen?')) {
      resetStateToSeed();
    }
  });

  // Clear Activity Log
  document.getElementById('btnClearActivityLog')?.addEventListener('click', clearActivityLog);

  // Dashboard & Damage Buttons
  document.getElementById('btnOpenDamageModal')?.addEventListener('click', () => openDamageModal());
  document.getElementById('btnDashNewDamage')?.addEventListener('click', () => openDamageModal());
  document.getElementById('btnDashViewDamages')?.addEventListener('click', () => switchView('damages'));
  document.getElementById('btnOpenAddDamage')?.addEventListener('click', () => openDamageModal());

  document.getElementById('btnDashNewEmployee')?.addEventListener('click', () => openEmployeeModal());
  document.getElementById('btnDashNewTask')?.addEventListener('click', () => openTaskModal());

  // Employees View Buttons
  document.getElementById('btnOpenAddEmployee')?.addEventListener('click', () => openEmployeeModal());

  // Youths View Buttons
  document.getElementById('btnOpenAddYouth')?.addEventListener('click', () => openYouthModal());

  // Tasks View Buttons
  document.getElementById('btnOpenAddTask')?.addEventListener('click', () => openTaskModal());

  // Employee Filters & Search
  const empSearch = document.getElementById('employeeSearchInput');
  const empClear = document.getElementById('btnClearEmpSearch');
  const empTeam = document.getElementById('filterEmpTeam');
  const empStatus = document.getElementById('filterEmpStatus');
  const empReset = document.getElementById('btnResetEmpFilters');

  if (empSearch) {
    empSearch.addEventListener('input', (e) => {
      AppState.filters.employees.search = e.target.value;
      if (empClear) empClear.classList.toggle('hidden', !e.target.value);
      renderEmployees();
    });
  }

  if (empClear) {
    empClear.addEventListener('click', () => {
      empSearch.value = '';
      AppState.filters.employees.search = '';
      empClear.classList.add('hidden');
      renderEmployees();
      empSearch.focus();
    });
  }

  if (empTeam) {
    empTeam.addEventListener('change', (e) => {
      AppState.filters.employees.team = e.target.value;
      renderEmployees();
    });
  }

  if (empStatus) {
    empStatus.addEventListener('change', (e) => {
      AppState.filters.employees.status = e.target.value;
      renderEmployees();
    });
  }

  if (empReset) {
    empReset.addEventListener('click', () => {
      if (empSearch) empSearch.value = '';
      if (empClear) empClear.classList.add('hidden');
      if (empTeam) empTeam.value = '';
      if (empStatus) empStatus.value = '';
      AppState.filters.employees = { search: '', team: '', status: '' };
      renderEmployees();
    });
  }

  // Youth Filters & Search
  const youthSearch = document.getElementById('youthSearchInput');
  const youthClear = document.getElementById('btnClearYouthSearch');
  const youthStatus = document.getElementById('filterYouthStatus');
  const youthBezug = document.getElementById('filterYouthBezugsperson');
  const youthReset = document.getElementById('btnResetYouthFilters');

  if (youthSearch) {
    youthSearch.addEventListener('input', (e) => {
      AppState.filters.youths.search = e.target.value;
      if (youthClear) youthClear.classList.toggle('hidden', !e.target.value);
      renderYouths();
    });
  }

  if (youthClear) {
    youthClear.addEventListener('click', () => {
      youthSearch.value = '';
      AppState.filters.youths.search = '';
      youthClear.classList.add('hidden');
      renderYouths();
      youthSearch.focus();
    });
  }

  if (youthStatus) {
    youthStatus.addEventListener('change', (e) => {
      AppState.filters.youths.status = e.target.value;
      renderYouths();
    });
  }

  if (youthBezug) {
    youthBezug.addEventListener('change', (e) => {
      AppState.filters.youths.bezugsperson = e.target.value;
      renderYouths();
    });
  }

  if (youthReset) {
    youthReset.addEventListener('click', () => {
      if (youthSearch) youthSearch.value = '';
      if (youthClear) youthClear.classList.add('hidden');
      if (youthStatus) youthStatus.value = '';
      if (youthBezug) youthBezug.value = '';
      AppState.filters.youths = { search: '', status: '', bezugsperson: '' };
      renderYouths();
    });
  }

  // Task Filters & Search
  const taskSearch = document.getElementById('taskSearchInput');
  const taskClear = document.getElementById('btnClearTaskSearch');
  const taskPrio = document.getElementById('filterTaskPriority');
  const taskStatus = document.getElementById('filterTaskStatus');
  const taskAssignee = document.getElementById('filterTaskAssignee');
  const taskReset = document.getElementById('btnResetTaskFilters');

  if (taskSearch) {
    taskSearch.addEventListener('input', (e) => {
      AppState.filters.tasks.search = e.target.value;
      if (taskClear) taskClear.classList.toggle('hidden', !e.target.value);
      renderTasks();
    });
  }

  if (taskClear) {
    taskClear.addEventListener('click', () => {
      taskSearch.value = '';
      AppState.filters.tasks.search = '';
      taskClear.classList.add('hidden');
      renderTasks();
      taskSearch.focus();
    });
  }

  if (taskPrio) {
    taskPrio.addEventListener('change', (e) => {
      AppState.filters.tasks.priority = e.target.value;
      renderTasks();
    });
  }

  if (taskStatus) {
    taskStatus.addEventListener('change', (e) => {
      AppState.filters.tasks.status = e.target.value;
      renderTasks();
    });
  }

  if (taskAssignee) {
    taskAssignee.addEventListener('change', (e) => {
      AppState.filters.tasks.assignee = e.target.value;
      renderTasks();
    });
  }

  if (taskReset) {
    taskReset.addEventListener('click', () => {
      if (taskSearch) taskSearch.value = '';
      if (taskClear) taskClear.classList.add('hidden');
      if (taskPrio) taskPrio.value = '';
      if (taskStatus) taskStatus.value = '';
      if (taskAssignee) taskAssignee.value = '';
      AppState.filters.tasks = { search: '', priority: '', status: '', assignee: '' };
      renderTasks();
    });
  }

  // Damage Filters & Search
  const dmgSearch = document.getElementById('damageSearchInput');
  const dmgClear = document.getElementById('btnClearDamageSearch');
  const dmgUrgency = document.getElementById('filterDamageUrgency');
  const dmgStatus = document.getElementById('filterDamageStatus');

  if (dmgSearch) {
    dmgSearch.addEventListener('input', (e) => {
      AppState.filters.damages.search = e.target.value;
      if (dmgClear) dmgClear.classList.toggle('hidden', !e.target.value);
      renderDamages();
    });
  }

  if (dmgClear) {
    dmgClear.addEventListener('click', () => {
      dmgSearch.value = '';
      AppState.filters.damages.search = '';
      dmgClear.classList.add('hidden');
      renderDamages();
      dmgSearch.focus();
    });
  }

  if (dmgUrgency) {
    dmgUrgency.addEventListener('change', (e) => {
      AppState.filters.damages.urgency = e.target.value;
      renderDamages();
    });
  }

  if (dmgStatus) {
    dmgStatus.addEventListener('change', (e) => {
      AppState.filters.damages.status = e.target.value;
      renderDamages();
    });
  }

  // Delegated events for Employee Cards
  document.getElementById('employeesGrid')?.addEventListener('click', (e) => {
    const editBtn = e.target.closest('.btn-edit-employee');
    if (editBtn) {
      const empId = editBtn.dataset.empId;
      openEmployeeModal(empId);
      return;
    }

    const deleteBtn = e.target.closest('.btn-delete-employee');
    if (deleteBtn) {
      const empId = deleteBtn.dataset.empId;
      promptDeleteEmployee(empId);
      return;
    }
  });

  // Delegated events for Youth Cards
  document.getElementById('youthsGrid')?.addEventListener('click', (e) => {
    const editBtn = e.target.closest('.btn-edit-youth');
    if (editBtn) {
      const youthId = editBtn.dataset.youthId;
      openYouthModal(youthId);
      return;
    }

    const deleteBtn = e.target.closest('.btn-delete-youth');
    if (deleteBtn) {
      const youthId = deleteBtn.dataset.youthId;
      promptDeleteYouth(youthId);
      return;
    }
  });

  // Delegated events for Task Cards
  const tasksContainer = document.getElementById('tasksList');
  if (tasksContainer) {
    tasksContainer.addEventListener('click', (e) => {
      const editBtn = e.target.closest('.btn-edit-task');
      if (editBtn) {
        const taskId = editBtn.dataset.taskId;
        openTaskModal(taskId);
        return;
      }

      const deleteBtn = e.target.closest('.btn-delete-task');
      if (deleteBtn) {
        const taskId = deleteBtn.dataset.taskId;
        promptDeleteTask(taskId);
        return;
      }
    });

    tasksContainer.addEventListener('change', (e) => {
      const statusSelect = e.target.closest('.task-status-selector');
      if (statusSelect) {
        const taskId = statusSelect.dataset.taskId;
        const newStatus = statusSelect.value;
        updateTaskStatus(taskId, newStatus);
      }
    });
  }

  // Employee Form Submit
  const formEmployee = document.getElementById('formEmployee');
  if (formEmployee) {
    formEmployee.addEventListener('submit', (e) => {
      e.preventDefault();
      clearFormErrors('formEmployee');

      const formData = {
        id: document.getElementById('empId').value || null,
        name: document.getElementById('empName').value,
        role: document.getElementById('empRole').value,
        team: document.getElementById('empTeam').value,
        status: document.getElementById('empStatus').value
      };

      const validation = validateEmployeeForm(formData);
      if (!validation.isValid) {
        Object.entries(validation.errors).forEach(([fieldId, errMsg]) => {
          const inputEl = document.getElementById(fieldId);
          const errorEl = document.getElementById(`${fieldId}Error`);
          if (inputEl) inputEl.classList.add('is-invalid');
          if (errorEl) errorEl.textContent = errMsg;
        });
        return;
      }

      const success = saveEmployee(formData);
      if (success) {
        closeModal('modalEmployee');
      }
    });
  }

  // Youth Form Submit
  const formYouth = document.getElementById('formYouth');
  if (formYouth) {
    formYouth.addEventListener('submit', (e) => {
      e.preventDefault();
      clearFormErrors('formYouth');

      const formData = {
        id: document.getElementById('youthId').value || null,
        name: document.getElementById('youthName').value,
        status: document.getElementById('youthStatus').value,
        room: document.getElementById('youthRoom').value,
        bezugsperson: document.getElementById('youthBezugsperson').value,
        schulbegleitung: document.getElementById('youthSchulbegleitung').value || null,
        fokus: document.getElementById('youthFokus').value
      };

      const validation = validateYouthForm(formData);
      if (!validation.isValid) {
        Object.entries(validation.errors).forEach(([fieldId, errMsg]) => {
          const inputEl = document.getElementById(fieldId);
          const errorEl = document.getElementById(`${fieldId}Error`);
          if (inputEl) inputEl.classList.add('is-invalid');
          if (errorEl) errorEl.textContent = errMsg;
        });
        return;
      }

      const success = saveYouth(formData);
      if (success) {
        closeModal('modalYouth');
      }
    });
  }

  // Task Form Submit
  const formTask = document.getElementById('formTask');
  if (formTask) {
    formTask.addEventListener('submit', (e) => {
      e.preventDefault();
      clearFormErrors('formTask');

      const formData = {
        id: document.getElementById('taskId').value || null,
        title: document.getElementById('taskTitle').value,
        assignedTo: document.getElementById('taskAssignee').value || null,
        youthId: document.getElementById('taskYouth').value || null,
        priority: document.getElementById('taskPriority').value,
        dueDate: document.getElementById('taskDueDate').value,
        status: document.getElementById('taskStatus').value
      };

      const validation = validateTaskForm(formData);
      if (!validation.isValid) {
        Object.entries(validation.errors).forEach(([fieldId, errMsg]) => {
          const inputEl = document.getElementById(fieldId);
          const errorEl = document.getElementById(`${fieldId}Error`);
          if (inputEl) inputEl.classList.add('is-invalid');
          if (errorEl) errorEl.textContent = errMsg;
        });
        return;
      }

      const success = saveTask(formData);
      if (success) {
        closeModal('modalTask');
      }
    });
  }

  // Damage Form Submit
  const formDamage = document.getElementById('formDamage');
  if (formDamage) {
    formDamage.addEventListener('submit', (e) => {
      e.preventDefault();
      clearFormErrors('formDamage');

      const formData = {
        id: document.getElementById('damageId').value || null,
        title: document.getElementById('damageTitle').value,
        location: document.getElementById('damageLocation').value,
        reporterName: document.getElementById('damageReporter').value,
        urgency: document.getElementById('damageUrgency').value,
        youthId: document.getElementById('damageYouth').value || null,
        description: document.getElementById('damageDescription').value,
        status: document.getElementById('damageStatus')?.value,
        resolutionNotes: document.getElementById('damageResolutionNotes')?.value
      };

      const validation = validateDamageForm(formData);
      if (!validation.isValid) {
        Object.entries(validation.errors).forEach(([fieldId, errMsg]) => {
          const inputEl = document.getElementById(fieldId);
          const errorEl = document.getElementById(`${fieldId}Error`);
          if (inputEl) inputEl.classList.add('is-invalid');
          if (errorEl) errorEl.textContent = errMsg;
        });
        return;
      }

      const success = saveDamage(formData);
      if (success) {
        closeModal('modalDamage');
      }
    });
  }

  // Modal Close buttons
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      closeModal(modalId);
    });
  });

  // Modal Backdrop Click
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });

  // Confirm Delete Action
  document.getElementById('btnConfirmDeleteAction')?.addEventListener('click', () => {
    if (typeof pendingDeleteAction === 'function') {
      pendingDeleteAction();
      pendingDeleteAction = null;
    }
    closeModal('modalConfirmDelete');
  });

  // Escape Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop:not(.hidden)').forEach(modal => {
        modal.classList.add('hidden');
      });
      closeMobileSidebar();
    }
  });
}

// ============================================================================
// 15. BOOTSTRAP INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', async () => {
  const loaded = loadState();
  AppState.employees = loaded.employees;
  AppState.youths = loaded.youths;
  AppState.tasks = loaded.tasks;
  AppState.damages = loaded.damages || [];
  AppState.activityLog = loaded.activityLog;
  AppState.currentUser = null; // LOGIN MUST BE ON START SCREEN ALWAYS
  AppState.theme = loaded.theme;

  applyTheme(AppState.theme);
  setupPwa();

  setupEventListeners();

  const initialHash = window.location.hash.replace('#', '') || 'dashboard';
  switchView(initialHash);

  renderApp();
  updateStorageStatusText();

  // Cross-device sync: check if server already has a shared state
  try {
    const serverData = await fetchStateFromServer();
    if (serverData) {
      AppState.employees = serverData.employees || AppState.employees;
      AppState.youths = serverData.youths || AppState.youths;
      AppState.tasks = serverData.tasks || AppState.tasks;
      AppState.damages = serverData.damages || AppState.damages;
      if (Array.isArray(serverData.activityLog)) AppState.activityLog = serverData.activityLog;
      saveState();
      renderApp();
    } else {
      // First boot: push initial seed data to the shared server
      syncStateToServer({
        employees: AppState.employees,
        youths: AppState.youths,
        tasks: AppState.tasks,
        damages: AppState.damages,
        activityLog: AppState.activityLog,
        currentUser: AppState.currentUser,
        theme: AppState.theme
      });
    }
  } catch (e) {
    console.debug('Init sync notice:', e);
  }

  // Periodic background sync every 4 seconds (syncs damages & tasks across devices in real time)
  setInterval(async () => {
    const openModal = document.querySelector('.modal-backdrop:not(.hidden)');
    if (openModal) return;

    const remote = await fetchStateFromServer();
    if (!remote) return;

    const localSerialized = JSON.stringify({
      e: AppState.employees,
      y: AppState.youths,
      t: AppState.tasks,
      d: AppState.damages
    });
    const remoteSerialized = JSON.stringify({
      e: remote.employees,
      y: remote.youths,
      t: remote.tasks,
      d: remote.damages
    });

    if (localSerialized !== remoteSerialized) {
      AppState.employees = remote.employees || AppState.employees;
      AppState.youths = remote.youths || AppState.youths;
      AppState.tasks = remote.tasks || AppState.tasks;
      AppState.damages = remote.damages || AppState.damages;
      if (Array.isArray(remote.activityLog)) AppState.activityLog = remote.activityLog;

      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        employees: AppState.employees,
        youths: AppState.youths,
        tasks: AppState.tasks,
        damages: AppState.damages,
        activityLog: AppState.activityLog,
        currentUser: AppState.currentUser,
        theme: AppState.theme
      }));

      renderApp();
    }
  }, 4000);

  console.log('Lebensfunke Heim Egerkingen Dashboard bereit (12 Mitarbeitende, 10 Jugendliche). Angemeldet als:', AppState.currentUser ? AppState.currentUser.displayName : 'Startbildschirm (Login erforderlich)');
});
