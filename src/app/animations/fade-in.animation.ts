import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  state('void', style({ opacity: 0 })),
  transition(':enter', [
    animate('1s ease-in', style({ opacity: 1 }))
  ]),
]);
