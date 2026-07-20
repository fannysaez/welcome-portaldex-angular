import type { Route } from '@angular/router';
import { Episodes } from './pages/episodes/episodes'; // Composant de la page des épisodes

export const EPISODES_ROUTES: Route[] = [
  { path: '', component: Episodes }, // Route par défaut vers la page Episodes
];
