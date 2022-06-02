---
title: 'Two Forms of Pre-rendering'
date: '2020-01-01'
---

Next.js verfügt über zwei Formen des Pre-Rendering: **Statische Generierung** und **Server-seitiges Rendering**. Der Unterschied liegt darin, **wann** das HTML für eine Seite generiert wird.

- **Statische Generierung** ist die Pre-Rendering-Methode, die das HTML zur **Erstellungszeit** generiert. Das vorgerenderte HTML wird dann bei jeder Anfrage _wiederverwendet_.
- **Server-side Rendering** ist die Vor-Rendering-Methode, die das HTML bei **jeder Anfrage** generiert.

Wichtig ist, dass Sie mit Next.js **wählen** können, welche Form des Pre-Rendering Sie für jede Seite verwenden möchten. Sie können eine "hybride" Next.js-Anwendung erstellen, indem Sie für die meisten Seiten die statische Generierung und für andere das serverseitige Rendering verwenden.