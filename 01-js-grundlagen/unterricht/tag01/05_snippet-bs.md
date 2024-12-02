# VSCode "Code-Snippet" anlegen

Um in VSCode einen globalen "Code-Snippet" anzulegen, gehe wie folgt vor:

- Öffne die VSCode-Befehlszeile mit `STRG + SHIFT + P` | `CMD + SHIFT + P` (Mac Os).
- Tippe ein: `Snippets: Configure Use Snippets`
- Wähle in der folgenden Befehlszeile `New Global Snippets File...` aus.
- Tippe anschließend den Namen ein wie der "Code-Snippet" heißen soll.

Es öffnet sich ein neues Fenster mit einer JSON-Struktur. In der Datei wird über Kommentare
erklärt wie ein "Code-Snippet" aufgebaut ist.

## `!bs`

```json
{
  "Bootstrap html": {
    "scope": "html",
    "prefix": "!bs",
    "body": [
      "<!DOCTYPE html>",
      "<html lang=\"de\">",
      "\t<head>",
      "\t\t<meta charset=\"UTF-8\" />",
      "\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />",
      "\t\t<title>$0</title>",
      "\t\t<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css\" rel=\"stylesheet\" />",
      "\t</head>",
      "\t<body>",
      "\t\t<main>",
      "\t\t\t<div class=\"container py-5\">",
      "\t\t\t\t<h1>$0</h1>",
      "\t\t\t</div>",
      "\t\t</main>",
      "\t\t<script>",
      "\t\t\t'use strict';",
      "\t\t\t",
      "\t\t</script>",
      "\t</body>",
      "</html>"
    ],
    "description": "Generate HTML with Bootstrap CDN and script-tag"
  }
}
```
