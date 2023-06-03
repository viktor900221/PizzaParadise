# PizzaParadise_v1.0

- Inhaltsverzeichnis
- Einleitung
- Systemanforderungen
- Installation
- Verwendung
- API-Schnittstelle
- Backend-Funktionalitäten
- Datenbank
- Erweiterte Funktionen
- Kontakt

# 1. Einleitung
Willkommen zu PizzaParadise, einer Webanwendung, die es Kunden ermöglicht, Pizzen auszuwählen, in den Warenkorb zu legen, Bestellungen aufzugeben und vergangene Bestellungen einzusehen. Die Anwendung verfügt über ein Frontend, das sowohl eine Benutzeroberfläche für Kunden als auch eine Benutzeroberfläche für Mitarbeiter bietet. Das Backend dient der Verwaltung der Anwendung und enthält die API-Schnittstelle, die mit Node.js und Express.js entwickelt wurde.

# 2. Systemanforderungen
## Um PizzaParadise erfolgreich zu nutzen, müssen folgende Systemanforderungen erfüllt sein:

- Webbrowser mit JavaScript-Unterstützung
- Internetverbindung
- Unterstützung für moderne Webtechnologien wie HTML5, CSS3 und Vue.js
- Node.js und NPM (Node Package Manager)
- Datenbank mit Unterstützung für SQL (z.B. Oracle, MySQL, PostgreSQL)

# 3. Installation
## Folgende Schritte sind erforderlich, um PizzaParadise lokal aufzusetzen:

- Stellen Sie sicher, dass die erforderlichen Systemanforderungen erfüllt sind.
- Laden Sie das PizzaParadise-ZIP-Archiv herunter oder klonen Sie das Projekt aus dem GitHub-Repository.
- Entpacken Sie das Archiv und öffnen Sie das Hauptverzeichnis des Projekts.
- Stellen Sie sicher, dass eine geeignete Datenbank vorhanden ist und die Verbindungsinformationen vorliegen.
- Konfigurieren Sie die Datenbankverbindung, indem Sie die entsprechenden Einstellungen des Backends also index.js anpassen.
- Öffnen Sie eine Kommandozeile im Hauptverzeichnis des Projekts und führen Sie den Befehl npm install aus, um alle erforderlichen Abhängigkeiten zu installieren.
- Starten Sie das Backend, indem Sie den Befehl npm start oder node app.js im Backend-Verzeichnis ausführen.
- Öffnen Sie eine neue Kommandozeile im Hauptverzeichnis des Projekts und navigieren Sie in das Frontend-Verzeichnis.
- Führen Sie den Befehl npm install aus, um die erforderlichen Abhängigkeiten für das Frontend zu installieren.
- Starten Sie das Frontend, indem Sie den Befehl npm run serve im Frontend-Verzeichnis ausführen.
- Öffnen Sie einen Webbrowser und greifen Sie über http://localhost:8080 auf die Anwendung zu.

# 4. Verwendung

## Nachdem Sie die Anwendung erfolgreich gestartet haben, können Sie je nach Benutzerrolle verschiedene Aktionen durchführen:

### Kunden

- Registrieren Sie sich, um ein Konto zu erstellen und auf die Kundenoberfläche zuzugreifen.
- Durchsuchen Sie die Produktauswahl, fügen Sie Artikel zum Warenkorb hinzu und schließen Sie die Bestellung ab.
- Überprüfen Sie vergangene Bestellungen und laden Sie die generierten Rechnungen als PDF herunter.

### Mitarbeiter von PizzaParadise

- Registrieren Sie sich, um ein Konto zu erstellen und auf die Adminoberfläche zuzugreifen.
- Verwalten Sie Bestellungen, indem Sie den Status ändern und die Bestelldetails bearbeiten.
- Erstellen, aktualisieren und löschen Sie Produkte.
- Laden Sie Rechnungen für alle Kunden herunter.
- Nutzen Sie erweiterte Funktionen wie ABC-Kundenanalyse und Einnahmeübersichten.
- Bitte beachten Sie, dass für den Zugriff auf die Kundenoberfläche und die Adminoberfläche separate Anmeldeinformationen erforderlich sind.

# 5. API-Schnittstelle
PizzaParadise bietet eine API-Schnittstelle, die es Entwicklern ermöglicht, auf die Funktionalitäten der Anwendung zuzugreifen. Die API ist mit Node.js und Express.js implementiert und unterstützt HTTP-Anfragen für verschiedene Aktionen wie das Abrufen von Produkten, das Aufgeben von Bestellungen und das Verwalten von Bestelldetails. Eine detaillierte Dokumentation der API-Endpunkte und ihrer Verwendung finden Sie in der bereitgestellten API-Dokumentation.

# 6. Backend-Funktionalitäten
Das Backend von PizzaParadise bietet umfangreiche Funktionen zur Verwaltung der Anwendung. Hier sind einige der wichtigsten Funktionen:

- Verwaltung von Kunden: Registrierung, Anmeldung und Verwaltung von Kundendaten.
- Produktverwaltung: Erstellen, Aktualisieren und Löschen von Produkten.
- Bestellverwaltung: Erfassen und Verarbeiten von Bestellungen, Verwalten des Bestellstatus.
- Rechnungsgenerierung: Automatische Erstellung von Rechnungen für abgeschlossene Bestellungen und Möglichkeit zum Herunterladen als PDF.
- Mitarbeiterverwaltung: Anmeldung und Verwaltung von Mitarbeiterkonten mit unterschiedlichen Berechtigungen.

# 7. Datenbank
PizzaParadise verwendet eine SQL-Datenbank (z.B. MySQL oder PostgreSQL) zur Speicherung von Daten wie Kundeninformationen, Produktdetails, Bestellungen und Rechnungen. Die Datenbanktabellen und -schemata sind im Backend definiert und werden automatisch beim Start der Anwendung erstellt, sofern sie nicht bereits vorhanden sind. Stellen Sie sicher, dass die Verbindungsinformationen zur Datenbank in der Konfigurationsdatei des Backends korrekt angegeben sind.

# 8. Erweiterte Funktionen
Zusätzlich zu den grundlegenden Funktionen bietet PizzaParadise auch erweiterte Funktionen, um die Verwaltung und Analyse der Anwendung zu erleichtern:

- ABC-Kundenanalyse: Analysieren Sie Kunden nach Umsatz und Häufigkeit der Bestellungen, um wertvolle Erkenntnisse über die wichtigsten Kunden zu gewinnen.
- Einnahmeübersicht: Sehen Sie sich die Einnahmen an, die auf täglicher, wöchentlicher und monatlicher Basis generiert werden. Dadurch erhalten Sie einen Überblick über die finanzielle Leistung der Anwendung.
- Registrierung und Authentifizierung: Kunden und Mitarbeiter müssen sich registrieren und authentifizieren, um auf die entsprechenden Benutzeroberflächen und Funktionen zugreifen zu können. Dadurch wird die Sicherheit der Anwendung gewährleistet.
- Datenbankverbindung: Die Anwendung stellt eine Verbindung zu einer SQL-Datenbank her, um Daten dauerhaft zu speichern und abzurufen. Stellen Sie sicher, dass die Verbindungsinformationen korrekt konfiguriert sind.
- Frontend mit Vue.js: Die Benutzeroberfläche wird mit Vue.js entwickelt, einem leistungsstarken JavaScript-Framework. Dadurch wird eine reaktive und benutzerfreundliche Erfahrung für Kunden und Mitarbeiter ermöglicht.
- Echtzeitaktualisierung: Die Änderungen an Bestellungen und deren Status werden in Echtzeit über das Frontend aktualisiert. Dadurch werden Kunden sofort über Änderungen informiert und der Bestellprozess optimiert.

# Videos:


https://github.com/viktor900221/PizzaParadiseV1.0/assets/79362660/a00d7365-88fe-4646-9238-d4d0b52043c9




https://github.com/viktor900221/PizzaParadiseV1.0/assets/79362660/50cbf594-4f06-4ac1-afe0-bbf0a33fe819



# Screenshots:

![12222](https://github.com/viktor900221/PizzaParadiseV1.0/assets/79362660/13506734-45d6-4a54-bcbc-94d787b4478b)

![4343](https://github.com/viktor900221/PizzaParadiseV1.0/assets/79362660/2468fa13-c321-4e2d-9fef-3fec911e6122)

![ProdukteVerwalten](https://github.com/viktor900221/PizzaParadiseV1.0/assets/79362660/5bef9cc4-d8d2-4ade-88bf-80f891ab32d2)
![ProdukteVerwalten (2)](https://github.com/viktor900221/PizzaParadiseV1.0/assets/79362660/ef238204-45ec-4f7f-8396-774c6a0f0e03)


# 9. Author 
Viktor Legradi-Göhring

Guten Appetit!
