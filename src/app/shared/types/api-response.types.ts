export interface ApiResponse<T> { // Interface générique pour représenter la structure de la réponse d'une API.
  info: InfoResponse; // Propriété qui contient des informations sur la réponse, telles que le nombre total d'éléments, le nombre de pages, etc.
  results: T; // Propriété qui contient les résultats de la requête, typés selon le paramètre générique T.
}

export interface InfoResponse { // Interface pour représenter les informations de pagination dans la réponse d'une API.
  count: number; // Nombre total d'éléments disponibles dans la ressource.
  pages: number; // Nombre total de pages disponibles pour la ressource.
  next: string | null; // URL de la page suivante, ou null si c'est la dernière page.
  prev: string | null; // URL de la page précédente, ou null si c'est la première page.
}
