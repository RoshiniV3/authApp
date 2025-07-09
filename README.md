# Vue 3 Auth App with Next.js Backend

## Setup

```bash
#Frontend -Vue Js
1. Using Node 20.19
2. npm create vite@latest vue3-auth-app -- --template vue-ts
3. Using Vite 7.0.1 (Accept: y)
4. cd vue3-auth-app
5. npm install
6. npm install vue-router@4 pinia axios
7. npm run dev



#Backend -Next Js
7. npx create-next-app@latest vue-auth-api-backend --ts
8. cd vue-auth-api-backend
9. npm install
10. npm run dev
11. cd ..
12. npm run dev



# Implementation Overview

## Authentication Flow

- Next.js backend is implemented to demonstrate how Axios interceptors function.
- Users log in using username and password.
- API returns an encrypted token and role.
- Based on the role, dashboard redirection occurs.
- The token is stored in localStorage to ensure persistence across page refreshes.

## Routing Behavior

### If user is logged in:
- Accessing an invalid route → Redirects to default route based on role.
- Accessing a restricted route → Shows an unauthorized error.

### If user is not logged in:
- Accessing an invalid route → Redirects to Page Not Found.
- Accessing a valid route → Redirects to Login Page.

## User Roles

- Admin
- Student
- NormalUser (Can access only the dashboard)

## Environment & Configuration

### .env file handles:
- Logging (`VITE_ENABLE_LOGGING`)
- API Base URL (`VITE_API_BASE_URL`)
- Timeout (`VITE_API_TIMEOUT`)

### vite.config.ts handles:
- Port, environment settings, build configuration

### router-meta.d.ts:
- Enables custom route meta typing for per-role route access

### vite-env.d.ts:
- Enables type-safe usage of environment variables

## Logging

- Logging behavior varies based on the environment:
  - dev → More verbose logging
  - prod → Minimal logging

## FrontEnd Validations

- Submit will be disabled unless valid data is provided or no error message on screen
- If there is an error message , it goes away once user starts typing (cleared using watch)
- Form button validations are done using computed properties to enhance reactivity





