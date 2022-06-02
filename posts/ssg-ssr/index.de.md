---
title: 'Wann sollte man statische Generierung und wann serverseitiges Rendering verwenden?'
date: '2020-01-02'
---

Wir empfehlen die **Statische Generierung** (mit und ohne Daten), wann immer dies möglich ist, da Ihre Seite einmal erstellt und über das CDN bereitgestellt werden kann, was viel schneller ist, als wenn ein Server die Seite bei jeder Anfrage rendert.

Sie können die statische Generierung für viele Arten von Seiten verwenden, darunter:

- Marketing-Seiten
- Blog-Beiträge
- E-Commerce-Produktauflistungen
- Hilfe und Dokumentation

Sie sollten sich fragen: "Kann ich diese Seite **vor** der Anfrage eines Benutzers rendern?" Wenn die Antwort ja lautet, sollten Sie sich für die statische Generierung entscheiden.

Andererseits ist die statische Generierung **keine** gute Idee, wenn Sie eine Seite nicht vor der Anfrage eines Benutzers rendern können. Vielleicht zeigt Ihre Seite häufig aktualisierte Daten, und der Seiteninhalt ändert sich bei jeder Anfrage.

In diesem Fall können Sie **Server-Side Rendering** verwenden. Das ist zwar langsamer, aber die vorgerenderte Seite ist dann immer auf dem neuesten Stand. Oder Sie können das Pre-Rendering überspringen und Client-seitiges JavaScript zum Auffüllen der Daten verwenden.