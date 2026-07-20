import { Routes } from '@angular/router';
import { ERROR_URLS } from './core/constants/urls.constants';
import { CHARACTERS_PATHS, EPISODES_PATHS, ERROR_PATHS, LOCATIONS_PATHS, ROOT_PATHS } from './core/constants/paths.constants';
import { Home } from './features/home/home';

export const routes: Routes = [
  {
    path: ROOT_PATHS.base,
    // Route racine vers le module Home
    loadChildren: async () =>
      import('./features/home/home.routes').then((module) => module.HOME_ROUTES),
  },
  {
    path: 'home',
    // Route directe vers le composant Home
    component: Home,
  },
  {
    path: CHARACTERS_PATHS.base,
    // Chargement paresseux des personnages
    loadChildren: async () =>
      import('./features/characters/characters.routes').then((module) => module.CHARACTERS_ROUTES),
  },
  {
    path: EPISODES_PATHS.base,
    // Chargement paresseux des épisodes
    loadChildren: async () =>
      import('./features/episodes/episodes.routes').then((module) => module.EPISODES_ROUTES),
  },
  {
    path: LOCATIONS_PATHS.base,
    // Chargement paresseux des lieux
    loadChildren: async () =>
      import('./features/locations/locations.routes').then((m) => m.LOCATIONS_ROUTES),
  },
  {
    path: ERROR_PATHS.base,
    // Page d'erreur dédiée
    loadChildren: async () =>
      import('./features/error/error.routes').then((module) => module.ERROR_ROUTES),
  },
  {
    path: '**',
    // Redirection des routes inconnues vers la page 404
    redirectTo: ERROR_URLS.notFound,
  },
];
