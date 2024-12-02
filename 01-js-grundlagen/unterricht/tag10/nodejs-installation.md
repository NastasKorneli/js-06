## NVM - Node Version Manager

nvm ist ein Versionsmanager für node.js. Über nvm können mehrere unterschiedliche Node Versionen installiert werden. NVM wird über die Konsole aufgerufen und ist mit verschiedenen Shells kompatibel (sh, dash, ksh, zsh, bash).

#### Links

- <https://github.com/coreybutler/nvm-windows> (Win)
- <https://github.com/nvm-sh/nvm> (Mac OS)

#### Installation Windows

1. Lade den NVM-Installer über folgenden Link herunter: <https://github.com/coreybutler/nvm-windows/releases>
2. Installiere NVM über den [Installer](https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.zip)
3. Sollte vorher bereits NodeJS global ohne NVM installiert worden sein, wird empfohlen die vorherige NodeJS Version zu [deinstallieren](https://stackoverflow.com/a/55300310).

### Installation Mac OS

- Installiere NVM über die Konsole mit:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

- Füge den Pfad zum NVM Ordner zur Shell-Config hinzu. (`~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`).

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

- Aktuelle Informationen zur Installation findet man unter folgendem Link: <https://github.com/nvm-sh/nvm>

#### Erste Schritte

Sobald NVM erfolgreich installiert wurde kann man über nvm in der Konsole eine neue Node Version mit folgendem Befehl installieren:

```bash
nvm install [NODE VERSIONSNUMMER]
```

> Hinweis: Die aktuellste Versionsnummer von NodeJS findet man am einfachsten auf der [NodeJS-Seite](https://nodejs.org/en/)

Installierte Node Versionen auflisten

```bash
nvm list
```

Node Version verwenden/wechseln

```bash
nvm use [NODE VERSIONSNUMMER]
```

Node Version als Standard einrichten

```bash
nvm alias default [NODE VERSIONSNUMMER]
```

## Node.js

### Definition

Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.

## Neues Projekt erstellen

- Über die Konsole in den Projektordner gehen.

Projektordner wechsel über "change directory" (cd)

```bash
cd [projektpfad]
```

- Eigene Package.json Datei generieren (nur einmalig bei einem neuen Projekt notwendig.)

```bash
npm init
```

- Module installieren, die nur für die Entwicklung benötigt werden. (devDependicies)

| Befehl                                                                   | Zweck                                                                                                                        |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `npm install Modul@Version`                                              | installiere Modul in der Version Version (semantic versioning)                                                               |
| `npm install Modul@Version --save`<br>`npm install Modul@Version -S`     | Modul wird in der Datei `package.json` unter dependencies hinzugefügt (Mittlerweile default)                                 |
| `npm install Modul@Version --save-dev`<br>`npm install Modul@Version -D` | Modul wird in der Datei `package.json` unter devdependencies hinzugefügt                                                     |
| `npm install Modul@Version --global`<br>`npm install Modul@Version -g`   | Modul wird global installiert. (Von jedem Ordner aus anwendbar)                                                              |
| `npm uninstall Modul@Version`                                            | entfernt Modul aus `node_modules`                                                                                            |
| `npm uninstall Modul@Version --save`                                     | entfernt Modul aus `node_modules` und aus der dependencies- Eigenschaft in der `package.json`.                               |
| `npm update Modul`                                                       | Aktualisiert Modul auf die neueste Version                                                                                   |
| `npm update Modul --save`                                                |  Aktualisiert Modul auf die neueste Version und auch die Versionsnummer der dependencies- Eigenschaft in der `package.json`. |
| `npm init`                                                               | erstellt eine package.json-Datei (der Befehl fragt die Eigenschaften ab)                                                     |
| `npm init --yes` `npm init -y`                                           | erstellt eine package.json-Datei (der Befehl setzt Default-Werte ein)                                                        |
| `npm list`                                                               | listet alle installierten Module auf.                                                                                        |
| `npm search`                                                             | Suchbegriff sucht Module, deren Namen den Suchbegriff enthält                                                                |

## Gulp

### Definition

gulp is a toolkit for automating painful or time-consuming tasks in your development workflow, so you can stop messing around and build something.

### Installation

Globale Installation (einmalig pro Node Version nötig)

```bash
npm install gulp-cli -g
```

Lokae Installation der aktuellen Gulp Version (im Projekt nötig)

```bash
npm install gulp -D
```

Gulpfile im Projekt anlegen

Entweder über die Konsole oder manuell:

```bash
npx -p touch nodetouch gulpfile.js
```

Der erste Gulp Task

```js
const { task } = require('gulp');

task('test', (done) => {
  console.log('Test Gulp Task.');
  done(); // Task fertig
});
```

## SASS

### Definition

> Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.

Sass ist eine CSS-Preprocessor Sprache.

## Liste von verwendeten Modulen
