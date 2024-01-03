import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public state$!: Observable<any>;
  private _state = new Subject<void>();

  constructor() {
    this.state$ = this._state.asObservable();
  }

  /**
   * Trigger all the context menus to close.
   */
  public clearMenu(): void {
    this._state.next();
  }
}
