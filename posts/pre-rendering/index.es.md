---
title: 'Dos formas de pre-renderización'
date: '2020-01-01'
---

Next.js tiene dos formas de pre-renderización: **Generación estática** y **Renderización del lado del servidor**. La diferencia está en **cuándo** se genera el HTML de una página.

- La **Generación Estática** es el método de pre-renderización que genera el HTML en **tiempo de construcción**. El HTML pre-renderizado es entonces _reutilizado_ en cada petición.
- Renderizado del lado del servidor** es el método de pre-renderizado que genera el HTML en **cada petición**.

Es importante destacar que Next.js te permite **elegir** qué forma de pre-renderización utilizar para cada página. Puedes crear una aplicación Next.js "híbrida" utilizando Generación Estática para la mayoría de las páginas y utilizando Renderización del Lado del Servidor para otras.