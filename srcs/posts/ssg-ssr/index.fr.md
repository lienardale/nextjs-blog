---
title: 'When to Use Static Generation v.s. Server-side Rendering'
date: '2020-01-02'
---

Nous recommandons d'utiliser la **Génération statique** (avec et sans données) chaque fois que cela est possible, car votre page peut être construite une fois et servie par le CDN, ce qui la rend beaucoup plus rapide que si un serveur devait rendre la page à chaque requête.

Vous pouvez utiliser la génération statique pour de nombreux types de pages, notamment :

- les pages de marketing
- les articles de blog
- les listes de produits de commerce électronique
- Aide et documentation

Vous devez vous demander : "Puis-je pré-rendre cette page **avant** la demande d'un utilisateur ?" Si la réponse est oui, alors vous devriez choisir la génération statique.

En revanche, la génération statique n'est **pas** une bonne idée si vous ne pouvez pas effectuer le rendu préalable d'une page avant la demande de l'utilisateur. Peut-être que votre page affiche des données fréquemment mises à jour et que le contenu de la page change à chaque demande.

Dans ce cas, vous pouvez utiliser le **Rendu côté serveur**. Ce sera plus lent, mais la page pré-rendue sera toujours à jour. Vous pouvez également ignorer le rendu préalable et utiliser le JavaScript côté client pour remplir les données.