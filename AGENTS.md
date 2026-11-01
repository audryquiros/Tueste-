# Reglas del proyecto Tueste Dashboard

## Tecnologías
- React + Vite
- Tailwind CSS
- Recharts para gráficos
- Lucide React para iconografía

## Organización
- Cada página vive en su propia carpeta dentro de `src/pages` y contiene su JSX y CSS.
- Componentes reutilizables en `src/components`.
- Cálculos y lógica financiera en `src/services` y `src/utils`.
- Hooks reutilizables en `src/hooks`.
- Navegación centralizada en `src/routes`.
- `App.jsx` solo compone la aplicación; `main.jsx` monta React.

## Reglas
- No mezclar fórmulas financieras con componentes visuales.
- No duplicar valores del caso: centralizarlos en `src/services/caseData.js`.
- Todos los indicadores deben mostrar nombre y unidad.
- Los controles actualizan el tablero en vivo.
- Mantener responsive para móvil, tablet y escritorio.
- Conservar la paleta Tueste: naranja tostado, coral y crema.
- No inventar datos de referencia; documentar supuestos y fuentes.
