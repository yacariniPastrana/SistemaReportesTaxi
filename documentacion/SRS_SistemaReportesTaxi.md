# Documento de Especificación de Requerimientos del Sistema (SRS)

## Visión General
El sistema tiene como objetivo digitalizar el control financiero de la operación de un taxi, permitiendo registrar ingresos diarios, gastos de combustible, alquiler del vehículo, mantenimientos, préstamos y metas personales de los conductores. El sistema permitirá administrar múltiples autos, propietarios y conductores, generando reportes automáticos y visuales para evaluar la rentabilidad del negocio.

---

## Reglas de Negocio Principales

1. **Registro Diario del Conductor:**
   - El conductor registra el **monto total generado** por plataformas como InDriver.
   - Registra el **gasto en combustible**, el cual **se descuenta directamente del ingreso**.
   - Se aplica un **descuento fijo de S/ 60** por concepto de alquiler del vehículo.

2. **Distribución del Alquiler (S/ 60):**
   - S/ 30 → para el **propietario** (ejemplo: Tío Lucho).
   - S/ 30 → para el **vehículo** (fondo de mantenimiento).

3. **Cálculo de Ganancia Neta del Conductor:**
   ```
   Ganancia neta = Ingreso total - Gasto combustible - 60 (alquiler)
   ```
   Luego, el sistema aplica **descuentos personales configurables**, como el pago de pensión o metas de ahorro.

4. **Acumulados Globales:**
   - El sistema muestra el total acumulado del **propietario**, **vehículo** y **conductor**.
   - Permite deducir la rentabilidad del negocio en tiempo real.

5. **Gestión de Múltiples Entidades:**
   - Permite registrar varios **vehículos**, **propietarios** y **conductores**.
   - Cada conductor puede definir metas personales opcionales.

6. **Historial de Préstamos:**
   - Se registra cada préstamo entre conductor y propietario, aunque estos ocurran ocasionalmente.

---

## Autenticación
- El sistema tendrá login con roles: **Administrador**, **Propietario**, **Conductor**.
- Autenticación basada en JWT.
- Cada usuario verá solo la información correspondiente a su rol.

---

## Reportes y Visualizaciones
- Reportes diarios, semanales y mensuales.
- Gráficos de ingreso vs gasto.
- Balance general de propietario, vehículo y conductor.
- Exportación de reportes a PDF y Excel.

---

## Base de Datos (PostgreSQL)
Tablas principales:
- `usuario` (id, nombre, correo, contraseña, rol)
- `propietario` (id, nombre, contacto)
- `vehiculo` (id, placa, marca, modelo, propietario_id)
- `conductor` (id, nombre, usuario_id, metas_json)
- `registro_diario` (id, fecha, ingreso_total, gasto_combustible, alquiler, conductor_id, vehiculo_id)
- `prestamo` (id, fecha, monto, descripcion, propietario_id, conductor_id)
- `historial` (id, usuario_id, accion, fecha)

---

## Stack Tecnológico
- **Frontend:** Next.js + TailwindCSS + Chart.js
- **Backend:** Spring Boot (Java) + JPA + JWT
- **Base de Datos:** PostgreSQL
- **Control de Versiones:** GitHub (repositorio público para portafolio)

---

## Roadmap Inicial
**Sprint 1:** Modelado y configuración de base de datos.  
**Sprint 2:** Backend con autenticación y CRUD de registros diarios.  
**Sprint 3:** Frontend con login y formulario de registro.  
**Sprint 4:** Reportes gráficos y exportación PDF/Excel.  
**Sprint 5:** Testing y despliegue (Netlify + Render o Railway).

---

## Plan de Pruebas
- Validar registro diario con descuento automático de combustible y alquiler.
- Comprobación de acumulados por propietario, vehículo y conductor.
- Verificación de autenticación por rol.
- Prueba de exportación de reportes.

---


