# 🛸 OmniArchive | Citadel Intelligence Terminal

**OmniArchive** es una plataforma de análisis y auditoría de datos multiversales basada en la **Rick and Morty API**. Diseñada bajo una estética de terminal cyberpunk, la aplicación transforma datos planos en una experiencia de inteligencia operativa, permitiendo navegar de forma relacional por la jerarquía de personajes, locaciones y episodios.

---

## 📝 Introducción

En el vasto multiverso, la información es el activo más valioso. **OmniArchive** nace como una herramienta de visualización avanzada para exploradores y científicos de la Ciudadela. Este proyecto no es solo una lista de personajes; es un sistema interconectado que permite rastrear unidades biológicas, analizar coordenadas dimensionales y auditar registros cronológicos de eventos (episodios) con una interfaz de alta fidelidad.

## 📖 Descripción del Proyecto

El proyecto se centra en la **Navegación Relacional**. El usuario puede iniciar su búsqueda en un personaje, saltar a su planeta de origen, descubrir otros residentes de esa misma localización y finalmente explorar los episodios donde interactuaron. Todo esto bajo una interfaz inmersiva que utiliza efectos de _glassmorphism_, _scanlines_ y micro-interacciones fluidas.

### Características Clave:

- **🔍 Advanced Search System:** Búsqueda en tiempo real por nombre, status y gender con debounce de 300ms.
- **📊 Character Database:** Navegación por más de 800 personajes con infinite scroll optimizado.
- **🎨 Cyberpunk Terminal UI:** Interfaz con estética glassmorphism, bordes neon green y animaciones fluidas.
- **📋 Detail Modal:** Vista detallada de personajes con datos de location y dimensionales.
- **⚡ Performance Optimized:** TanStack Query para caché inteligente y Zustand para estado global.
- **📱 Responsive Design:** Grid adaptativo con skeletons de carga y manejo de errores.
- **🔄 Infinite Scroll:** Intersection Observer para carga automática al hacer scroll.
- **🎯 Type-Safe Architecture:** TypeScript estricto con interfaces centralizadas y validación.
- **🏗️ Service Layer Architecture:** Separación clara entre API, services y queries.

## 🏗️ Arquitectura y Stack Tecnológico

Para garantizar un rendimiento de nivel profesional y un código mantenible, el proyecto utiliza la siguiente arquitectura:

- **Framework:** `Next.js 16` (App Router) para un renderizado híbrido y rutas optimizadas.
- **Lenguaje:** `TypeScript` para un tipado estricto de los contratos de la API.
- **Estilos:** `Tailwind CSS` + `Shadcn UI` para una construcción de interfaces atómica y consistente.
- **Manejo de Estado:**
  - `TanStack Query (React Query):` Para el manejo de caché asíncrono y estados de carga (Skeletons).
  - `Zustand:` Para el estado global ligero y persistencia en `localStorage`.
- **Animaciones:** `Framer Motion` para orquestación de entradas _staggered_ y efectos de terminal.

### Estructura de Directorios:

```text
src/
├── app/                          # Rutas dinámicas y layouts (Next.js App Router)
├── components/                    # Componentes de UI (Shadcn + Custom)
│   ├── CharacterCard.tsx         # Tarjeta individual de personaje con animaciones
│   ├── CharacterFilters.tsx      # Sistema de búsqueda y filtros cyberpunk
│   ├── CharactersSection.tsx     # Grid principal con infinite scroll
│   ├── DetailModal.tsx            # Modal detallado con datos de location
│   └── OmniArchiveSidebar.tsx    # Navegación lateral con Zustand
├── lib/                          # Utilidades y configuración
│   ├── api/
│   │   └── api.ts                # Cliente Axios configurado
│   ├── services/
│   │   ├── characters.ts         # Service layer para personajes
│   │   └── locations.ts          # Service layer para locations
│   └── utils.ts                  # Utilidades cn() y helpers
├── queries/                      # Lógica de fetching con TanStack Query
│   ├── characters/
│   │   ├── character.keys.ts     # Query keys centralizadas
│   │   └── character.queries.ts  # Hooks personalizados con filtros
│   └── locations/
│       ├── locations.keys.ts     # Query keys para locations
│       └── locations.queries.ts  # Hooks para location details
├── store/                        # Estado global con Zustand
│   └── use-navigation.ts         # Navegación y persistencia
└── types/                        # Definiciones TypeScript
    └── index.ts                  # Interfaces de Character, Location, Episode
```

### Arquitectura de Datos:

```typescript
// Flow de datos optimizado
CharacterFilters → character.queries.ts → TanStack Query → CharactersSection
     ↓                       ↓                      ↓                    ↓
  UI Input              Service Layer           Cache              Render

// Detail Modal flow
CharacterCard → DetailModal → useLocationById → TanStack Query → Location Data
     ↓               ↓              ↓                   ↓                ↓
  Click Event    Modal State    Service Layer      Cache          Render
```

---

## 🛠️ Instalación

Clonar repositorio:

```bash
git clone https://github.com/LeonardoGomezz/OmniArchive.git
```

Instalar dependencias:

```bash
npm install
```

Configurar variables de entorno (.env.local):

```env
NEXT_PUBLIC_API_URL=https://rickandmortyapi.com/api
```

Iniciar terminal:

```bash
npm run dev
```

### 🚀 Características Técnicas Implementadas:

#### **Character Database System:**

- **Infinite Scroll:** Intersection Observer con `rootMargin: "100px"` para carga anticipada
- **Advanced Filtering:** Búsqueda por nombre, status (`Alive|Dead|unknown`) y gender (`Female|Male|Genderless|unknown`)
- **Debounced Search:** 300ms delay para optimizar llamadas API
- **Loading States:** Skeleton cards y indicadores de progreso granulares
- **Error Handling:** Estados de error con retry automático

#### **UI/UX Cyberpunk Terminal:**

- **Glassmorphism:** `backdrop-blur-sm` con `bg-background/50`
- **Neon Green Borders:** `border-primary/50` con focus glow effects
- **Terminal Typography:** `font-mono` con `tracking-wider` y `uppercase`
- **Micro-interactions:** Hover states, transitions suaves y Framer Motion animations
- **Responsive Grid:** `grid-cols-1 md:grid-cols-3 lg:grid-cols-4`

#### **Performance Optimizations:**

- **TanStack Query:** Caché inteligente con `staleTime` y `cacheTime`
- **Zustand:** Estado global lightweight con persistencia `localStorage`
- **TypeScript:** Tipado estricto con interfaces centralizadas
- **Component Memoization:** `useCallback` para handlers optimizados

#### **API Integration:**

- **Axios Client:** Configurado con `baseURL` y headers estándar
- **Service Layer:** Separación clara entre API calls y business logic
- **Query Keys Pattern:** Keys jerárquicas para invalidación precisa
- **Error Boundaries:** Manejo de errores de red con AxiosError handling
- **Data Transformation:** Mapeo de respuestas API a interfaces TypeScript
- **Location Integration:** Fetch automático de datos dimensionales en DetailModal

#### **Detail Modal System:**

- **Framer Motion Animations:** Scale, fade y slide transitions
- **Glassmorphism Design:** Backdrop blur con bordes neon green
- **Dynamic Location Data:** Fetch automático de location details
- **Character Stats:** Appearances, dimension y threat level
- **Activity Log:** Gráficos de barras simulados con datos dinámicos
- **Responsive Layout:** Mobile-first con breakpoints optimizados

---

## 📊 Estado Actual del Proyecto

### ✅ **Implementado:**

- [x] Character Database con infinite scroll
- [x] Advanced search y filtros cyberpunk
- [x] Responsive grid con skeletons
- [x] API layer con TanStack Query
- [x] TypeScript strict mode
- [x] Zustand para estado global
- [x] Framer Motion animations
- [x] DetailModal con location data dinámica
- [x] Service layer architecture
- [x] Error handling con AxiosError
- [x] Query keys centralizadas
- [x] Sidebar fixed con padding dinámico
- [x] Modal transitions optimizadas

### 🚧 **Próximas Features:**

- [ ] Location database explorer
- [ ] Episode timeline viewer
- [ ] Favorites system con persistencia
- [ ] Advanced analytics dashboard
- [ ] Character relationships graph
- [ ] Dimensional navigation system

---

Desarrollado por [Leonardo Jose Gomez Gomez] — 2026.
