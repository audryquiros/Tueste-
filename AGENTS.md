# Reglas del proyecto Tueste Dashboard

## Tecnologías
- React + Vite
- Tailwind CSS
- Recharts
- Lucide React

## Organización obligatoria
- Cada componente vive en su propia carpeta y contiene `NombreComponente.jsx` y `NombreComponente.css`.
- Cada página vive en su propia carpeta y contiene `NombrePagina.jsx` y `NombrePagina.css`.
- No colocar JSX de componentes directamente en carpetas compartidas sin su carpeta propia.
- Mantener nombres de carpetas y archivos en PascalCase para componentes y páginas.
- Los estilos globales van únicamente en `src/index.css`.
- Los estilos específicos pertenecen al CSS junto al JSX correspondiente.

## Responsabilidades
- `components/`: componentes reutilizables, cada uno en su carpeta.
- `pages/`: páginas completas, cada una en su carpeta.
- `routes/`: navegación.
- `services/`: datos y lógica financiera.
- `hooks/`: hooks reutilizables.
- `utils/`: funciones auxiliares.
- `assets/`: recursos estáticos.

## Reglas de código
- No mezclar fórmulas financieras con componentes visuales.
- Centralizar los datos del caso en `src/services/caseData.js`.
- Mantener los controles reactivos y el diseño responsive.
- No inventar datos ni supuestos; documentar lo que falte validar.
