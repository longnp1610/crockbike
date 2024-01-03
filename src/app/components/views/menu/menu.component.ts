import { Component, HostBinding, Inject } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  host: {
    // '[class.ml-1]': 'true',
  },
})
export class MenuComponent {
  @HostBinding('style.position') public position = 'absolute';
  @HostBinding('style.z-index') public zIndex = 9;

  private activeMenuItem!: MenuItemComponent;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  /**
   * Registers the currently opened menu item.
   * @param {MenuItemComponent} menuItem - The menu item that is currently open.
   * @returns {void}
   */
  public registerOpenedMenu(menuItem: MenuItemComponent): void {
    this.activeMenuItem = menuItem;
  }

  /**
   * Closes the currently opened menu item if it exists.
   * @returns {void}
   */
  public closeOpenedMenuIfExists(): void {
    if (this.activeMenuItem) {
      this.activeMenuItem.clearContainer();
    }
  }
}
