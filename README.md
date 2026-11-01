# Tueste Dashboard — React + Vite + Tailwind

Tablero interactivo para el Reto Nivel 2 del caso Tueste.

## Requisitos
- Node.js 20.19+ o 22.12+ recomendado.
- npm.

## Instalación y ejecución

```bash
npm install
npm run dev
```

Vite mostrará una dirección local (normalmente `http://localhost:5173`). Ábrela en Chrome o Edge.

## Compilar para producción

```bash
npm run build
npm run preview
```

La carpeta final de producción será `dist/`.

## Estructura

```text
public/
src/
├── assets/
├── components/
│   ├── dashboard/
│   ├── layout/
│   └── ui/
├── context/
├── hooks/
├── lib/
├── pages/
│   └── Dashboard/
│       ├── Dashboard.jsx
│       └── Dashboard.css
├── routes/
├── services/
│   ├── caseData.js
│   └── financialModel.js
├── utils/
│   └── formatters.js
├── App.jsx
├── index.css
└── main.jsx
AGENTS.md
index.html
package.json
vite.config.js
tailwind.config.js
postcss.config.js
```

## Responsabilidad de las carpetas

- `components`: piezas reutilizables de interfaz.
- `pages`: páginas completas; cada una tiene su propio JSX y CSS.
- `routes`: centraliza qué página se muestra.
- `services`: datos y lógica del modelo financiero.
- `hooks`: estado y lógica reutilizable de React.
- `utils`: funciones pequeñas de formato.
- `assets`: imágenes, logos y otros recursos locales.
- `context`: reservado para estado global compartido.
- `lib`: reservado para clientes de librerías o integraciones.

## Cómo funciona

1. `main.jsx` monta React.
2. `App.jsx` llama a `AppRoutes`.
3. `AppRoutes.jsx` muestra `Dashboard`.
4. `Dashboard.jsx` compone las secciones.
5. `useFinancialDashboard.js` guarda los supuestos y recalcula cuando cambian.
6. `financialModel.js` contiene las fórmulas.
7. `ChartsSection.jsx` representa los resultados con Recharts.

## Datos y supuestos

Los datos base están centralizados en `src/services/caseData.js`. Antes de entregar, comparar los supuestos y fórmulas con la hoja oficial de Nivel 1 y con el documento fuente del caso. No afirmar una coincidencia menor al 1% hasta hacer esa validación.

El historial de inversión utilizado es:
- $0 → 0 clientes
- $4.000 → 100 clientes
- $8.000 → 165 clientes
- $12.000 → 210 clientes
- $16.000 → 235 clientes
- $20.000 → 250 clientes

Los clientes entre puntos se estiman mediante interpolación lineal.

## Nota

El proyecto no incluye backend ni requiere Supabase: el reto pide una página interactiva que abra en navegador y use el modelo completo de Tueste. Los datos viven localmente en el código.


## Navegación lateral

El tablero está dividido en seis vistas para evitar una página demasiado larga:
- Resumen
- Supuestos
- Indicadores
- Escenarios
- Gráficos
- Análisis

En escritorio, el sidebar queda fijo a la izquierda. En móvil, se abre como menú deslizable mediante el botón «Menú». El estado de los supuestos se conserva al cambiar de sección porque el hook del modelo vive en la página principal.
