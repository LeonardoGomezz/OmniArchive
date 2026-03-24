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
- **🗺️ Location Explorer:** Navegación por locaciones con filtrado por tipo y scroll infinito.
- **📺 Episode Archives:** Timeline de episodios con filtrado por temporada y nombres de personajes.
- **🎨 Cyberpunk Terminal UI:** Interfaz con estética glassmorphism, bordes neon green y animaciones fluidas.
- **📋 Detail Modal:** Vista detallada de personajes con datos de location y dimensionales.
- **🗂️ Character Dossier:** Página dedicada con información completa del personaje y análisis dimensional.
- **🚀 Dynamic Routing:** Rutas dinámicas `/dossier/[id]` con Next.js 16+ y params asíncronos.
- **⚡ Performance Optimized:** TanStack Query para caché inteligente y Zustand para estado global.
- **📱 Responsive Design:** Grid adaptativo con skeletons de carga y manejo de errores.
- **🔄 Infinite Scroll:** Intersection Observer para carga automática al hacer scroll.
- **🎯 Type-Safe Architecture:** TypeScript estricto con interfaces centralizadas y validación.
- **🏗️ Enterprise Architecture:** Service layer, hooks personalizados y component composition.
- **🔧 Custom Hooks Architecture:** Hooks reutilizables para data fetching, UI state y navigation.
- **⚙️ Configuration Management:** Configuración centralizada y type-safe.
- **🎨 Component Composition:** Componentes atómicos y reutilizables con separación de responsabilidades.
- **🖥️ Server/Client Components:** Separación óptima entre renderizado server y client.

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
│   ├── dossier/
│   │   └── [id]/
│   │       └── page.tsx          # Página dinámica de Character Dossier
│   ├── locations/
│   │   └── page.tsx              # Página de Locations
│   ├── episodes/
│   │   └── page.tsx              # Página de Episodes
│   ├── QueryProvider.tsx         # Provider de TanStack Query
│   ├── layout.tsx                # Server Component layout principal
│   └── page.tsx                  # Home / Dashboard
├── components/                    # Componentes de UI (Shadcn + Custom)
│   ├── features/                 # Componentes específicos por feature
│   │   ├── characters/           # Feature completa de Characters
│   │   │   ├── CharactersSection.tsx  # Componente contenedor principal
│   │   │   ├── CharacterCard.tsx         # Tarjeta individual con hooks
│   │   │   ├── CharacterStatusBadge.tsx  # Badge de estado reutilizable
│   │   │   ├── CharacterInfo.tsx          # Información del personaje
│   │   │   ├── CharacterActions.tsx       # Acciones del personaje
│   │   │   ├── CharactersList.tsx         # Lista con infinite scroll
│   │   │   ├── CharacterFilters.tsx       # Sistema de búsqueda y filtros
│   │   │   ├── DetailModal.tsx           # Modal detallado con datos
│   │   │   └── CharacterDOssier.tsx      # Página completa de personaje
│   │   ├── locations/            # Feature de Locations
│   │   │   ├── LocationsSection.tsx       # Componente contenedor principal
│   │   │   ├── LocationsFilter.tsx        # Sistema de filtros por tipo
│   │   │   ├── LocationList.tsx          # Lista con infinite scroll
│   │   │   ├── LocationRow.tsx            # Fila individual de location
│   │   │   └── SegmentedFilter.tsx        # Control de filtros segmentado
│   │   └── episodes/             # Feature de Episodes
│   │       ├── EpisodesSection.tsx        # Componente contenedor principal
│   │       ├── EpisodesFilter.tsx         # Sistema de filtros por temporada
│   │       ├── EpisodeEntry.tsx           # Entry individual con timeline
│   │       └── SegmentedFilter.tsx        # Control de filtros segmentado
│   ├── layout/                   # Componentes de layout
│   │   └── LayoutContent.tsx             # Client Component para layout
│   ├── shared/                   # Componentes reutilizables
│   │   └── ImageWithFallback.tsx         # Imagen con fallback
│   └── OmniArchiveSidebar.tsx    # Navegación lateral con Zustand
├── hooks/                        # Custom hooks personalizados
│   ├── api/                      # Hooks de data fetching
│   │   ├── useCharactersWithFilters.ts   # Hook de filtros y fetching
│   │   ├── useCharacterEpisodes.ts        # Hook para obtener episodios
│   │   ├── useLocationsWithFilters.ts    # Hook de filtros y fetching de locations
│   │   └── useEpisodesWithFilters.ts      # Hook de filtros y fetching de episodes
│   ├── ui/                       # Hooks de UI state
│   │   ├── useCharacterSelection.ts        # Estado de modal y selección
│   │   ├── useCharacterNavigation.ts       # Navegación de personajes
│   │   ├── useEpisodeSelection.ts         # Estado de expansión de episodios
│   │   ├── useInfiniteScroll.ts           # Hook de scroll infinito
│   │   └── useSidebarPadding.ts            # Padding dinámico de sidebar
├── lib/                          # Utilidades y configuración centralizada
│   ├── api/
│   │   └── client.ts             # Cliente Axios con interceptors
│   ├── config/
│   │   ├── constants.ts          # Configuración de aplicación
│   │   └── navigation.ts        # Configuración de navegación
│   └── data/
│       └── data.ts               # Datos mock y configuración
├── services/                     # Business logic layer
│   └── api/
│       ├── characters.service.ts # Service layer para personajes
│       ├── locations.service.ts  # Service layer para locations
│       └── episodes.service.ts    # Service layer para episodes
├── queries/                      # Lógica de fetching con TanStack Query
│   ├── characters/
│   │   └── character.keys.ts     # Query keys centralizadas
│   ├── locations/
│   │   └── locations.keys.ts     # Query keys para locations
│   └── episodes/
│       └── episodes.keys.ts      # Query keys para episodes
├── store/                        # Estado global con Zustand
│   └── use-navigation.ts         # Navegación y persistencia
└── types/                        # Definiciones TypeScript
    └── index.ts                  # Interfaces de Character, Location, Episode
```

### Arquitectura de Datos:

```typescript
// Flow de datos optimizado con hooks personalizados
CharacterFilters → useCharactersWithFilters → TanStack Query → CharactersList
     ↓                       ↓                           ↓                    ↓
  UI Input              Custom Hook                    Cache              Render

// Locations flow con enterprise architecture
LocationsFilter → useLocationsWithFilters → TanStack Query → LocationList
     ↓                       ↓                           ↓                    ↓
  Type Filter           Custom Hook                    Cache              Render

// Episodes flow con timeline y character names
EpisodesFilter → useEpisodesWithFilters → TanStack Query → EpisodesSection
     ↓                       ↓                           ↓                    ↓
  Season Filter          Custom Hook                    Cache              Render

// Character Episodes flow con useQueries
CharacterDOssier → useCharacterEpisodes → useQueries → Episode Data
     ↓                       ↓                           ↓                    ↓
  Character ID           Custom Hook                    Parallel Fetch     Render

// Detail Modal flow con hooks específicos
CharacterCard → useCharacterSelection → DetailModal → Character Data
     ↓               ↓                      ↓                   ↓                ↓
  Click Event    Selection Hook         Modal State    Service Layer      Render

// Character Dossier flow con hooks de navegación
CharacterCard → useCharacterNavigation → Router → /dossier/[id] → useQuery → Character Data
     ↓               ↓                      ↓              ↓              ↓              ↓
  Click Event    Navigation Hook         Navigation   Dynamic Route  Service Layer  Render

// Layout flow con Server/Client Components
layout.tsx (Server) → LayoutContent (Client) → useSidebarPadding → Dynamic Layout
     ↓                        ↓                           ↓                    ↓
  Metadata            Client Logic               Hook Personalizado      Render Optimizado
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

#### **Location Explorer System:**

- **Type Filtering:** Filtrado por tipo (Planet, Cluster, Space Station, Microverse, Dimension)
- **Infinite Scroll:** Scroll automático con Intersection Observer
- **Service Layer:** LocationsService con arquitectura enterprise
- **Coordinate Display:** Contador de coordenadas mapeadas en tiempo real
- **Responsive Grid:** Adaptación móvil y desktop

#### **Episode Archives System:**

- **Season Filtering:** Filtrado por temporada (All, S01-S05) con estado inicial "all"
- **Timeline Visualization:** Línea de tiempo vertical con nodos expandibles
- **Character Names:** Nombres reales de personajes en Featured Subjects
- **Typewriter Effect:** Animación de texto en resúmenes de episodios
- **Infinite Scroll:** Carga automática con scroll infinito

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
- **Multi-Service Architecture:** CharactersService, LocationsService, EpisodesService

#### **Detail Modal System:**

- **Framer Motion Animations:** Scale, fade y slide transitions
- **Glassmorphism Design:** Backdrop blur con bordes neon green
- **Dynamic Location Data:** Fetch automático de location details
- **Character Stats:** Appearances, dimension y threat level
- **Activity Log:** Gráficos de barras simulados con datos dinámicos
- **Responsive Layout:** Mobile-first con breakpoints optimizados

#### **Character Dossier System:**

- **Dynamic Routing:** Rutas `/dossier/[id]` con Next.js 15+ params asíncronos
- **Full Character Profile:** Vista completa con stats, episodes y análisis dimensional
- **Advanced UI Components:** Readout cards, stat boxes y activity charts
- **Navigation Integration:** Botón "View Full Dossier" con router.push()
- **Loading States:** Skeletons y spinners para mejor UX
- **Error Boundaries:** Manejo de errores con fallback UI
- **Service Integration:** getCharacterById con TanStack Query
- **React.use() Hook:** Unwrapping de params asíncronos Next.js 15+

#### **Next.js 15+ Compatibility:**

- **Async Params:** `params` como Promise con `React.use()`
- **Type Safety:** Tipado correcto para `Promise<{ id: string }>`
- **Performance:** Optimización de bundle y streaming
- **App Router:** Rutas dinámicas con layouts anidados

#### **Enterprise Architecture Patterns:**

- **Custom Hooks Architecture:** Hooks reutilizables con `useCallback` y memoización
- **Service Layer Pattern:** Separación entre API calls y business logic
- **Component Composition:** Componentes atómicos y reutilizables
- **Configuration Management:** Configuración centralizada y type-safe
- **Dependency Injection:** Services inyectables y testables
- **Single Responsibility Principle:** Cada hook/componente con una responsabilidad clara
- **Server/Client Components:** Separación óptima entre renderizado server y client
- **Error Boundary Pattern:** Manejo de errores con fallback UI
- **Infinite Scroll Hook:** `useInfiniteScroll` reutilizable para scroll automático
- **Type Safety:** Interfaces centralizadas y tipado estricto

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
- [x] Character Dossier página dedicada
- [x] Dynamic routing `/dossier/[id]`
- [x] Next.js 16+ params asíncronos
- [x] getCharacterById service
- [x] CharacterDOssier component
- [x] Navigation integration
- [x] **Location Explorer** con filtrado por tipo y scroll infinito
- [x] **Episode Archives** con timeline y nombres de personajes
- [x] **Enterprise Refactoring Complete**
- [x] **Custom Hooks Architecture** (useInfiniteScroll, useCharacterEpisodes, etc.)
- [x] **Service Layer Pattern** (CharactersService, LocationsService, EpisodesService)
- [x] **Component Composition** (atomic + reusable)
- [x] **Configuration Management** (centralizada + type-safe)
- [x] **Server/Client Components** (separación óptima)
- [x] **Performance Optimizations** (useCallback, memoization)
- [x] **Type Safety Enhanced** (interfaces centralizadas)
- [x] **Architecture Cleanup** (eliminación de código no utilizado)

### 🚧 **Próximas Features:**

- [ ] Favorites system con persistencia
- [ ] Advanced analytics dashboard
- [ ] Character relationships graph
- [ ] Dimensional navigation system
- [ ] Real-time notifications
- [ ] Export dossier functionality

---

Desarrollado por [Leonardo Jose Gomez Gomez] — 2026.
