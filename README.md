
# Tecnologías Utilizadas

- **React 18+**: Biblioteca de interfaz de usuario
- **TypeScript**: Superset tipado de JavaScript
- **Tailwind CSS 5**: Framework CSS
- **Vite/Create React App**: Build tools
- **Redux Toolkit**: Gestión de estado
- **React Router**: Enrutamiento
- **Formik + Yup**: Validación de formularios
- **Axios**: Cliente HTTP
- **i18next**: Internacionalización

---

## 📋 Tabla de Contenidos

- [Requisitos Previos](#-requisitos-previos)
- [Instalación Rápida](#-instalación-rápida)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Scripts Disponibles](#-scripts-disponibles)
- [Configuración](#️-configuración)
- [Despliegue](#-despliegue)
- [Solución de Problemas](#-solución-de-problemas)
- [Recursos Adicionales](#-recursos-adicionales)

---

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

| Herramienta | Versión Recomendada | Enlace de Descarga |
|-------------|--------------------|--------------------|
| **Node.js** | 14.x LTS o superior | [Descargar](https://nodejs.org/) |
| **npm** | 6.x o superior | Incluido con Node.js |
| **Git** | Última versión | [Descargar](https://git-scm.com/) |

### Verificar Instalación

```bash
npm --version    # Debe mostrar 6.x o superior
```

---

## 🚀 Instalación Rápida

### Paso 1: Clonar desde Git
En el repositorio Git de **nov-ene-pf-selecciónfrontend**:

Clona el repositorio

git clone **https://github.com/IDS326-Construccion-de-Software/nov-ene-pf-seleccion-frontend.git**

# Navega al directorio del proyecto donde sera clonado

cd  nombre carpeta tu-proyecto(monolithic.frontend.react)

💡 Nota: Asegúrate de tener acceso al repositorio y haber configurado tus credenciales Git.

git clone **https://github.com/IDS326-Construccion-de-Software/nov-ene-pf-seleccion-frontend.git**

# Navega al proyecto
cd tu-proyecto-metronic

# Clonar una rama específica:

Clona solo la rama de desarrollo

git clone -b dev **https://github.com/IDS326-Construccion-de-Software/nov-ene-pf-seleccion-frontend.git**

### Paso 2: Navegar al Proyecto React

```bash (Terminal)
# Navega a la carpeta del demo React (ejemplo: demo1)
cd monolithic.frontend.react
```

### Paso 3: Instalar Dependencias

Elige tu gestor de paquetes preferido:

#### Usando npm:
```bash (Terminal)
npm install
```

#### Usando Yarn:
```bash
yarn install
```

> 💡 **Consejo**: Si encuentras errores de peer dependencies, puedes usar `npm install --legacy-peer-deps`

### Paso 4: Iniciar el Servidor de Desarrollo

#### Usando npm:
```bash
npm run dev
```

#### Usando Yarn:
```bash
yarn dev
# o
yarn start
```

### Paso 5: Abrir en el Navegador

El proyecto se abrirá automáticamente en:

```
  VITE v5.4.11  ready in 266 ms

  ➜  Local:   http://localhost:5173/onsightlens/intec
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

> 🎉 **¡Listo!** La aplicación está corriendo correctamente.

---

## 📁 Estructura del Proyecto

```
monolithic.frontend.react/
├── dist/                   
├── public/                   # Archivos públicos estáticos
│   ├── index.html            # Plantilla HTML principal
│   └── media/                # Imágenes y recursos
│
├── src/                      # Código fuente   
│   ├── auth/             
│   ├── components/        
│   ├── config/          
│   ├── hooks/
│   ├── i18n/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   ├── partials/
│   ├── plugins/
│   ├── providers/
│   ├── routing/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   ├── App
│   ├── main
│   └── vite-env.d.ts           
│   │
│
├── .env                      # Variables de entorno
├── package.json              # Dependencias del proyecto
├── tailwind.config.js
├── tsconfig.json             # Configuración TypeScript
├── vite.config.ts            # Configuración Vite (o craco.config.js)
└── README.md                 # Este archivo

monolithic.frontend.react/
├── dist/                      # Build de producción (generado)
│
├── public/                    # Archivos públicos estáticos
│   ├── index.html            # Plantilla HTML principal
│   └── media/                # Imágenes y recursos
│
├── src/                      # Código fuente principal
│   ├── auth/                 # Autenticación y autorización
│   │   ├── components/       # Componentes de auth (Login, Register)
│   │   ├── services/         # Servicios de autenticación
│   │   └── guards/           # Guards de rutas protegidas
│   │
│   ├── components/           # Componentes reutilizables
│   │   ├── ui/               # Componentes de UI (Buttons, Cards, etc)
│   │   └── shared/           # Componentes compartidos
│   │
│   ├── config/               # Configuración de la aplicación
│   │   ├── api.config.ts     # Configuración de APIs
│   │   └── general.config.ts     # Configuración general
|   |
│   ├── errors/               # Pantallas de errores
|   |
│   ├── hooks/                # Custom React Hooks
│   │
│   ├── i18n/                 # Internacionalización archivos de traducción (es, en, etc)
│   │
│   ├── layouts/              # Layouts de la aplicación
│   │   ├── AuthLayout.tsx    # Layout para auth
│   │   └── applayout/        # Componentes de layout (Header, Sidebar)
│   │
│   ├── lib/                  # Librerías y utilidades externas
│   │
│   ├── pages/                # Páginas de la aplicación
│   │   ├── Dashboard/        # Página de dashboard
│   │   ├── Users/            # Gestión de usuarios
│   │   └── Settings/         # Configuraciones
│   │
│   ├── partials/             # Componentes parciales
│   │
│   ├── plugins/              # Plugins y extensiones
│   │
│   ├── providers/            # Context Providers
│   │
│   ├── routing/              # Configuración de rutas
│   │
│   ├── styles/               # Estilos globales
│   │
│   ├── types/                # Tipos TypeScript
│   │
│   ├── utils/                # Funciones utilitarias
│   │   ├── helpers.ts        # Funciones auxiliares
│   │   └── validators.ts     # Validadores
│   │
│   ├── App.tsx               # Componente raíz de la aplicación
│   ├── main.tsx              # Punto de entrada principal
│   └── vite-env.d.ts         # Tipos de Vite
│
├── .env                      # Variables de entorno (local)
├── .env.example              # Ejemplo de variables de entorno
├── .gitignore                # Archivos ignorados por Git
├── package.json              # Dependencias del proyecto
├── tailwind.config.js        # Configuración de Tailwind CSS
├── tsconfig.json             # Configuración TypeScript
├── vite.config.ts            # Configuración de Vite
└── README.md                 # Este archivo
```

---

## 🛠️ Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### Desarrollo

```bash
# Inicia el servidor de desarrollo con hot-reload
npm run dev
# o
npm start
```

 VITE v5.4.11  ready in 266 ms

  ➜  Local:   http://localhost:5173/onsightlens/intec
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

## ⚙️ Configuración

### Variables de Entorno

El archivo `.env` contine las varibles de entorno:

```env
# URL base de la API
BASE_URL=https://api.tudominio.com

```

## 🔍 Solución de Problemas

### Error: "Module not found"

```bash
# Limpia node_modules y reinstala
rm -rf node_modules
rm package-lock.json
npm install
```

### Error de TypeScript

```bash
# Verifica tu versión de TypeScript
npm list typescript

# Si es necesario, instala una versión compatible
npm install typescript@4.9.5 --save-dev
```

### Errores de Peer Dependencies

```bash
# Usa el flag legacy-peer-deps
npm install --legacy-peer-deps
```

### Problemas con la Versión de Node

```bash
# Usa nvm para cambiar de versión
nvm install 14.21.3
nvm use 14.21.3
```

### Errores 404 en Rutas

Asegúrate de que tu servidor está configurado para servir `index.html` en todas las rutas (SPA fallback).

---

## 📚 Recursos Adicionales

### Documentación Oficial

- [📖 Documentación Metronic React](https://preview.keenthemes.com/metronic8/react/docs/quick-start)
- [🎨 Preview Demo 1](https://preview.keenthemes.com/metronic8/react/demo1/dashboard)
- [💬 Foro de Soporte](https://devs.keenthemes.com/)
- [📹 Video Tutoriales](https://www.youtube.com/c/KeenThemes)



Desarrollado con ❤️ por Lab. Construcción de software
