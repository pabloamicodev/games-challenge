# 🎮 GamerShop - Frontend Challenge

[![CI Pipeline](https://github.com/pabloamicodev/games-challenge/actions/workflows/ci.yml/badge.svg)](https://github.com/pabloamicodev/games-challenge/actions/workflows/ci.yml)
[![Deploy](https://github.com/pabloamicodev/games-challenge/actions/workflows/deploy.yml/badge.svg)](https://github.com/pabloamicodev/games-challenge/actions/workflows/deploy.yml)

Modern, scalable video game store built with Next.js 15, TypeScript, and a custom state management architecture.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Project Structure](#-project-structure)

## ✨ Features

### Core Functionality

✅ **Server-Side Rendering (SSR)** - Fast initial load with SEO optimization  
✅ **Client-Side State Management** - Custom Redux-like architecture  
✅ **LocalStorage Persistence** - Cart survives page refreshes  
✅ **Responsive Design** - Mobile-first, fully responsive UI  
✅ **Feature Flags** - Dynamic behavior control  
✅ **GTM Integration** - Complete Google Tag Manager tracking  
✅ **Toast Notifications** - User feedback for cart operations  
✅ **TypeScript** - Full type safety across the application

### Additional Features

🎨 **Modern UI/UX** - Clean, accessible design  
⚡ **Optimized Performance** - Lazy loading, code splitting  
🔒 **Type-Safe** - Strict TypeScript configuration  
📱 **PWA Ready** - Manifest and service worker support  
♿ **Accessible** - WCAG compliant components

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4
- **State Management**: Custom implementation (no external libraries)
- **Analytics**: Google Tag Manager
- **CI/CD**: GitHub Actions + Vercel
- **Code Quality**: ESLint, Prettier
- **Package Manager**: npm

## 🏗️ Architecture

The application follows a **4-layer architecture pattern**:

### Layer 1: **Components & UI** (`/components`)

React components with full responsiveness and accessibility

- **UI Components**: Button, Card, Loader, Drawer, Toast
- **Layout**: Header, Footer, MainLayout
- **Domain Components**: GameCard, CartItem, CartSummary, CatalogView
- No hardcoded values - all based on design tokens

### Layer 2: **Store Views** (`/storeViews`)

Simple objects that subscribe to store changes

- `cartStoreView`: Cart state access and computed values
- `gamesStoreView`: Games catalog state
- `featureFlagsStoreView`: Feature flags configuration
- Observer pattern for reactivity

### Layer 3: **Operators** (`/operators`)

Business logic layer (Singleton pattern)

- `cartOperator`: Cart CRUD operations
- `gameOperator`: Games loading and filtering
- Calls abstractors and updates stores
- No direct data return - only store updates

### Layer 4: **Abstractors** (`/abstractor`)

API communication layer (Pure functions)

- `cartAbstractor`: Cart API simulation (localStorage)
- `gameAbstractor`: Games API integration
- Data parsing and validation
- API decoupling

### Data Flow

```
SSR: Page → Abstractor → Data → Initial Props
CSR: Component → useOperator → Operator → Abstractor → Store → StoreView → Component
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone git@github.com:pabloamicodev/games-challenge.git
cd games-challenge

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # Run TypeScript type checking
npm run validate     # Run all checks (type-check + lint + build)
```

## 🔄 CI/CD Pipeline

Automated pipelines using **GitHub Actions** + **Vercel**:

### Workflows

1. **CI Pipeline** - Runs on every push and PR

   - Linting and type checking
   - Build validation
   - Security audit
   - Code quality checks

2. **Production Deploy** - Runs on push to `main`

   - Automatic deployment to Vercel
   - Production environment

3. **Preview Deploy** - Runs on PRs
   - Preview deployments for testing
   - URL commented on PR

### Setup

See [`.github/PIPELINE_SETUP.md`](.github/PIPELINE_SETUP.md) for detailed configuration instructions.

## 📁 Project Structure

## 📁 Project Structure

```
games-challenge/
├── .github/                  # GitHub configuration
│   ├── workflows/           # CI/CD pipelines
│   │   ├── ci.yml          # Continuous Integration
│   │   ├── deploy.yml      # Production deployment
│   │   └── preview.yml     # Preview deployments
│   ├── dependabot.yml      # Dependency updates
│   ├── PIPELINE_SETUP.md   # CI/CD documentation
│   └── PULL_REQUEST_TEMPLATE.md
├── public/                  # Static assets
│   ├── game-images/        # Game thumbnails
│   └── manifest.json       # PWA manifest
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/           # API routes
│   │   ├── cart/          # Cart page
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── abstractor/         # Layer 4: API communication
│   │   ├── cartAbstractor.ts
│   │   └── gameAbstractor.ts
│   ├── operators/          # Layer 3: Business logic
│   │   ├── cartOperator.ts
│   │   └── gameOperator.ts
│   ├── storeViews/         # Layer 2: State access
│   │   ├── cartStoreView.ts
│   │   ├── gamesStoreView.ts
│   │   └── featureFlagsStoreView.ts
│   ├── store/              # Redux-like state management
│   │   ├── cartStore.ts
│   │   ├── gamesStore.ts
│   │   └── featureFlagsStore.ts
│   ├── components/         # Layer 1: UI components
│   │   ├── cartComponents/
│   │   ├── gameComponents/
│   │   ├── layout/
│   │   └── uiComponents/
│   ├── hooks/              # Custom React hooks
│   │   ├── useOperator.ts
│   │   ├── useTagInteraction.ts
│   │   ├── useToast.ts
│   │   └── useToastContext.tsx
│   ├── types/              # TypeScript definitions
│   └── config/             # Configuration files
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
└── package.json
```

## 🎯 Key Features Detail

### GTM Integration

Complete Google Analytics 4 event tracking:

- `add_to_cart` - When adding items
- `remove_from_cart` - When removing items
- `view_item` - Product detail views
- `view_item_list` - Catalog browsing
- `view_cart` - Cart page visits
- `begin_checkout` - Checkout initiation
- `search` - Genre filtering

### Toast Notifications

User-friendly feedback system:

- Success messages (green)
- Error messages (red)
- Info messages (blue)
- Warning messages (yellow)
- Auto-dismiss after 3 seconds
- Multiple toasts support

### State Management

Custom implementation without external libraries:

- Redux-like pattern with actions and reducers
- Observer pattern for reactivity
- Type-safe throughout
- LocalStorage persistence
- Multi-tab synchronization

## 🧪 Testing (Future Implementation)

```bash
npm run test        # Run unit tests
npm run test:e2e    # Run E2E tests
npm run test:watch  # Watch mode
```

## 📊 Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is part of a technical challenge for Apply Digital.

## 👨‍💻 Author

**Pablo Amico**  
GitHub: [@pabloamicodev](https://github.com/pabloamicodev)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Apply Digital for the challenge opportunity
- Vercel for hosting and deployment tools

---

**Built with ❤️ using Next.js 15 and TypeScript**

✅ **Gestión de Carrito**

- Agregar/remover items
- Cálculo automático de totales
- Indicador de items en header

✅ **Feature Flags**

- Sistema de feature flags con JSON
- Feature: Cart Drawer vs Redirect
  - `useDrawer: true` → Abre drawer lateral
  - `useDrawer: false` → Redirect a /cart

## 🚀 Tecnologías

- **Next.js 15** - Framework React con SSR
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Estilos utility-first
- **React 19** - Librería UI
- **LocalStorage** - Persistencia de datos

## 📦 Instalación

```bash
# Clonar repositorio
git clone <repository-url>

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Ejecutar producción
npm start
```

## 🎯 Feature Flags

Edita `/src/config/feature-flags.json` para controlar features:

```json
{
  "cart": {
    "useDrawer": true // true = Drawer | false = Redirect
  }
}
```

## 📁 Estructura del Proyecto

```
src/
├── abstractor/          # Capa 4: Comunicación con API
│   └── game-abstractor.ts
├── operators/           # Capa 3: Lógica de negocio (Singletons)
│   ├── cart-operator.ts
│   └── game-operator.ts
├── store-views/         # Capa 2: Hooks reactivos
│   ├── use-cart-store.ts
│   └── use-feature-flags.ts
├── components/          # Capa 1: Componentes UI
│   ├── ui/              # Componentes base
│   ├── layout/          # Layout components
│   ├── cart/            # Componentes de carrito
│   ├── game/            # Componentes de juegos
│   └── catalog/         # Vista de catálogo
├── app/                 # Next.js App Router
│   ├── api/             # API Routes
│   ├── cart/            # Página de carrito
│   └── page.tsx         # Página principal
├── types/               # TypeScript types
├── config/              # Configuración y constantes
└── utils/               # Utilidades
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests con coverage
npm run test:coverage
```

## 🌐 Deployment

La aplicación está configurada para deployment en Vercel:

1. Conecta tu repositorio de GitHub a Vercel
2. Vercel detectará automáticamente Next.js
3. Las variables de entorno se configuran en el dashboard de Vercel

**Variables de Entorno Necesarias:**

- `NEXT_PUBLIC_API_URL` - URL base de la API (opcional, por defecto usa rutas relativas)

## 📝 Decisiones de Arquitectura

### ¿Por qué 4 capas?

1. **Separación de Responsabilidades**: Cada capa tiene un propósito claro
2. **Testabilidad**: Fácil crear mocks y tests unitarios
3. **Mantenibilidad**: Cambios en una capa no afectan a otras
4. **Escalabilidad**: Fácil agregar nuevas features

### ¿Por qué Singleton Pattern?

- Garantiza una única instancia de operadores
- Estado consistente en toda la aplicación
- Punto único de acceso a la lógica de negocio

### ¿Por qué Parsear los Datos?

Aunque la API interna es confiable, parseamos para:

- Demostrar buenas prácticas
- Validación de tipos en runtime
- Protección contra cambios futuros
- Estructura interna consistente

## 🎨 Sistema de Diseño

Todo el diseño es responsive sin valores hardcodeados:

- **Colores**: Definidos en `/config/constants.ts` y CSS variables
- **Spacing**: Escala consistente (xs, sm, md, lg, xl, 2xl)
- **Breakpoints**: sm, md, lg, xl, 2xl
- **Typography**: Escalas responsive con clamp()

## 📊 Conventional Commits

El proyecto usa Conventional Commits:

- `feat:` - Nueva característica
- `fix:` - Corrección de bug
- `docs:` - Documentación
- `style:` - Cambios de formato
- `refactor:` - Refactorización
- `test:` - Tests
- `chore:` - Tareas de mantenimiento

## 👨‍💻 Autor

Desarrollado como parte del desafío técnico de Frontend para Apply Digital.

## 📄 Licencia

Este proyecto es parte de un desafío técnico y no tiene licencia de distribución.
