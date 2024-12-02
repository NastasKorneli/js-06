# Windows Terminal Settings

## First Steps

- Installation of Bash with default Settings: [https://git-scm.com/](https://git-scm.com/)
- Installation of Windows Terminal [Windows Terminal](https://learn.microsoft.com/en-us/windows/terminal/install)
- Open Windows Terminal
- Install "Hack" Font (opztional) [Hack Font Download](https://github.com/source-foundry/Hack-windows-installer/archive/refs/tags/v1.6.0.zip)

- Put the following JSON in the "list" Array.

> **Hint:** Insert a comma "," at the end or before the object if there are other entries

```json
{
  "opacity": 90,
  "closeOnExit": "graceful",
  "colorScheme": "One Half Dark",
  "commandline": "C:/Program Files/Git/bin/bash.exe -i -l",
  "cursorColor": "#FFFFFF",
  "cursorShape": "bar",
  "font": {
    "face": "Hack",
    "size": 16
  },
  "guid": "{00000000-0000-0000-ba54-000000000001}",
  "historySize": 9001,
  "icon": "%PROGRAMFILES%\\git\\mingw64\\share\\git\\git-for-windows.ico",
  "name": "Git Bash",
  "padding": "0, 0, 0, 10",
  "snapOnInput": true,
  "startingDirectory": "%USERPROFILE%",
  "useAcrylic": true
}
```
