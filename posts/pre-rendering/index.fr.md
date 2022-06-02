---
title: 'Two Forms of Pre-rendering'
date: '2020-01-01'
---

Next.js propose deux formes de pré-rendu : **Génération statique** et **Rendu côté serveur**. La différence réside dans le **quand** il génère le HTML d'une page.

- La **Génération statique** est la méthode de prérendu qui génère le HTML au **temps de construction**. Le HTML pré-rendu est ensuite _réutilisé_ à chaque requête.
- **Rendu côté serveur** est la méthode de pré-rendu qui génère le HTML à **chaque requête**.

Il est important de noter que Next.js vous permet de **choisir** la forme de pré-rendu à utiliser pour chaque page. Vous pouvez créer une application Next.js "hybride" en utilisant la génération statique pour la plupart des pages et le rendu côté serveur pour les autres.