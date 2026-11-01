# Entrega del Reto 2: abrir sin instalar

El tablero es una aplicación web estática y no necesita backend, base de datos ni cuentas externas.

## Opción recomendada: entregar un enlace público

1. En tu computadora, abre la carpeta del proyecto.
2. Ejecuta `npm install` una sola vez para preparar el entorno de desarrollo.
3. Ejecuta `npm run build`.
4. Se genera la carpeta `dist/`.
5. Abre https://app.netlify.com/drop en el navegador.
6. Arrastra la carpeta `dist/` a la página.
7. Netlify genera un enlace público. Comparte ese enlace con la persona evaluadora.

La persona que evalúa solo abre el enlace en su navegador. No instala Node.js, npm ni dependencias.

## Opción de archivo

Se puede entregar la carpeta `dist/` comprimida como ZIP. Para abrir la aplicación, se recomienda publicarla como enlace estático; abrir directamente `index.html` con doble clic puede estar bloqueado por las políticas de módulos JavaScript del navegador.

## Para desarrollo

```bash
npm install
npm run dev
```

## Comprobación antes de entregar

```bash
npm run build
```

La compilación debe terminar sin errores y generar `dist/index.html` junto con los recursos estáticos.
