# Validación del modelo · Tueste Nivel 3

## Reglas implementadas
- Proyección de 24 meses.
- Inversión en Meta entre USD 0 y USD 20.000.
- Clientes de Meta por interpolación lineal entre los puntos históricos: (0,0), (4.000,100), (8.000,165), (12.000,210), (16.000,235), (20.000,250).
- Se agregan 47 clientes orgánicos por mes.
- Cohortes separadas: 85 % pedidos sueltos y 15 % suscripción.
- Pedidos sueltos: patrón de meses 1–12 del caso y 0,10 pedidos mensuales de los meses 13–24.
- Suscriptores activos: retención mensual del 91 %.
- Contribución de clientes actuales: USD 9.000 en el mes 1, disminuye 3 % mensual.
- Salidas: inversión Meta + fee de agencia USD 1.000 si hay inversión + costos fijos USD 6.500.
- Caja inicial USD 35.000; piso de seguridad USD 5.000.
- Desde el mes 13, inversión mensual >= promedio mensual invertido en meses 1–12.

## Revisión manual solicitada: mes 1 del plan de USD 8.000
1. Clientes nuevos Meta: 165 (punto histórico de USD 8.000).
2. Clientes orgánicos: 47.
3. Clientes nuevos totales: 165 + 47 = 212.
4. Contribución por pedido suelto: USD 34 - 10,88 - 4,50 - 1,53 - 1,20 = USD 15,89.
5. Contribución por suscripción: USD 30,60 - 10,88 - 4,50 - 1,377 - 1,20 = USD 12,643.
6. Contribución de la cohorte nueva: (212 x 85 % x 15,89) + (212 x 15 % x 12,643) = USD 3.265,43.
7. Contribución de clientes actuales: USD 9.000.
8. Salidas: USD 8.000 + USD 1.000 + USD 6.500 = USD 15.500.
9. Caja final: USD 35.000 + USD 9.000 + USD 3.265,43 - USD 15.500 = **USD 31.765,43**.

## Comparación de planes con el modelo implementado
Supuesto de planes propios: se elimina el fee de agencia (USD 0), siguiendo la pestaña «Escenarios» del Excel del Reto 1, donde la alternativa propia tiene fee USD 0. El plan actual y la propuesta de agencia mantienen USD 1.000 por mes con inversión, como establece el contrato descrito en el caso. La propuesta de agencia aplica además 30 % de descuento únicamente al primer pedido de los clientes de pedidos sueltos.

| Plan | Caja mínima | Mes mínimo | Caja mes 24 | Suscriptores activos mes 24 |
|---|---:|---:|---:|---:|
| Hoy · USD 8.000 fijos | USD 24.448 | 6 | USD 79.596 | 317 |
| Agencia · USD 16.000 fijos | -USD 82.255 | 24 | -USD 82.255 | 421 |
| Propio · USD 4.000 fijos (sin agencia) | USD 35.000 | Inicial | USD 119.566 | 220 |
| Propio · escalonado (8k/4k/6k, sin agencia) | USD 29.547 | 4 | USD 113.579 | 265 |

**Lectura:** entre estos cuatro planes, el plan propio de USD 4.000 fijos sin fee de agencia termina con la mayor caja y cumple las reglas. La propuesta de agencia rompe el piso de USD 5.000 y no es viable bajo estos supuestos.

Estos son resultados del modelo del caso, no una garantía de resultados reales. El reglamento pide reproducir el plan del equipo con margen de 3 % frente al modelo de referencia del facilitador; esa comprobación externa todavía debe realizarse.


## Alcance de la validación
- La pestaña «Escenarios» del Excel del Reto 1 asigna fee de agencia USD 0 a la alternativa propia. Se aplica el mismo supuesto a los planes propios del nivel 3; debe declararse en la entrega como supuesto de continuidad.
- El fee de USD 1.000 se conserva para «Hoy» y «Agencia» cuando hay inversión, según el contrato del caso.
- La recomendación del comparador sigue ahora la regla literal del nivel 3: filtra planes que cumplen todas las restricciones, maximiza caja al mes 24 y solo usa suscriptores activos para desempatar.
- No se puede certificar el margen de diferencia de 3 % contra el simulador del facilitador porque ese resultado de referencia no fue proporcionado. Los cálculos internos y la revisión manual del mes 1 sí pueden verificarse de forma independiente.
