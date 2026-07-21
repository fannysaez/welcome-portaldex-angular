import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [RouterLink],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css',
})
export class PageNotFound {
  @Input() message =
    "Cette page semble avoir été aspirée dans un portail interdimensionnel...\nRick a probablement encore bricolé quelque chose qu'il n'aurait pas dû.";
  @Input() primaryLabel = 'Retour à la Terre C-137';
  // Route utilisée par le bouton principal ; null pour laisser le parent gérer le clic via (primaryAction) au lieu de naviguer.
  @Input() primaryRoute: string | null = '/';
  @Input() showSecondaryButton = true;
  @Input() secondaryLabel = 'Revenir en arrière';

  @Output() primaryAction = new EventEmitter<void>();
}
