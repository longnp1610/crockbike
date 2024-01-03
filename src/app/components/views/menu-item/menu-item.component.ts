import {
  Component,
  Inject,
  Input,
  Optional,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';
import { RouterLink } from '@angular/router';
import { EventManager } from '@angular/platform-browser';
import { MenuService } from '../../../services/menu/menu.service';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, RouterLink],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
  host: {
    '[class.mr-3]': 'isRoot()',
  },
})
export class MenuItemComponent {
  @Input() // Define the menu template
  public menuFor!: TemplateRef<MenuComponent> | null;

  @Input()
  public linkTo?: string;

  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  public viewContainerRef!: ViewContainerRef;

  private removeGlobalEventListener!: Function;

  constructor(
    @Optional() private parent: MenuComponent,
    @Inject(DOCUMENT) private document: Document,
    private eventManager: EventManager,
    private menuStateService: MenuService
  ) {}

  protected isRoot(): boolean {
    // return true if parent is null or undefined
    return this.parent === null || this.parent === undefined;
  }

  protected isLeaf(): boolean {
    // A leaf node is a node that is not a root and has no nested sub menu
    return !this.isRoot() && !this.hasNestedSubMenu();
  }

  protected hasNestedSubMenu(): boolean {
    // Returns true if the menuFor property exists, false otherwise.
    return !!this.menuFor;
  }

  private containerIsEmpty(): boolean {
    return this.viewContainerRef.length === 0;
  }

  private addTemplateToContainer(template: TemplateRef<any>): void {
    this.viewContainerRef.createEmbeddedView(template);
  }

  public clearContainer(): void {
    this.viewContainerRef.clear();
  }

  public onClick(): void {
    if (this.containerIsEmpty()) {
      this.addHandlersForRootElement();
      // Close already opened menu in the same subtree
      this.closeAlreadyOpenedMenuInTheSameSubtree();
      this.registerOpenedMenu();
      if (this.menuFor) {
        // Add menuFor template to the container
        this.addTemplateToContainer(this.menuFor);
      }
    } else {
      this.clearContainer();
    }
  }

  private closeAlreadyOpenedMenuInTheSameSubtree(): void {
    if (this.parent) {
      this.parent.closeOpenedMenuIfExists();
    }
  }

  private registerOpenedMenu(): void {
    if (this.parent) {
      // Register this menu-item in the parent menu
      this.parent.registerOpenedMenu(this);
    }
  }

  private addHandlersForRootElement() {
    if (this.isRoot()) {
      this.subscribeToClearMenuMessages();
      this.addClickOutsideListener();
    }
  }

  /**
   * Private helper function to add click event listener to the document body.
   * This listener will close the menu when the user clicks outside the menu.
   * @private
   * @returns {void}
   */
  private addClickOutsideListener(): void {
    this.removeGlobalEventListener = this.eventManager.addEventListener(
      document.body,
      'click',
      this.closeMenuOnOutsideClick.bind(this)
    );
  }

  private removeClickOutsideListener(): void {
    if (this.removeGlobalEventListener) {
      this.removeGlobalEventListener();
    }
  }

  /**
   * Closes the context menu and clears the menu items when the target of a click event is not within the menu item or if it's a right-click.
   * @param {Object} event - The click event object with a target property.
   * @private
   */
  private closeMenuOnOutsideClick({ target }: any): void {
    const appMenuItem = this.document.querySelector('app-menu-item > app-menu');
    if (appMenuItem && !appMenuItem.parentElement?.contains(target)) {
      this.removeClickOutsideListener();
      this.broadcastMenuClear();
    }
  }

  /**
   * Broadcast a menu clear event to the menu state service.
   * @private
   * @method broadcastMenuClear
   * @returns {void}
   */
  private broadcastMenuClear(): void {
    this.menuStateService.clearMenu();
  }

  /**
   * Subscribe to the menu state service's state$ observable.
   * When the state changes, clear the container.
   * @private
   * @method subscribeToClearMenuMessages
   * @returns {void}
   */
  private subscribeToClearMenuMessages(): void {
    this.menuStateService.state$.subscribe(() => {
      this.clearContainer();
    });
  }
}
