import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { NavBarItem } from '../../view-models/navbar.model';
import { _nav } from './_nav';
import { RouterLink } from '@angular/router';
import { plainToInstance } from 'class-transformer';
import { InputTextModule } from 'primeng/inputtext';
import { GetClassDirective } from '../../../directives/get-class.directive';
import { MenuComponent } from '../../../components/views/menu/menu.component';
import { MenuItemComponent } from '../../../components/views/menu-item/menu-item.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MenuComponent,
    MenuItemComponent,
    InputTextModule,
    GetClassDirective,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected navItems: NavBarItem[] = [];
  @ViewChild('subMenu') subMenuElement!: ElementRef;
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.navItems = plainToInstance(NavBarItem, _nav);
  }

  protected toggleMenu(classElement: string): void {
    if (classElement.includes('active')) {
      this.renderer.removeClass(this.subMenuElement.nativeElement, 'active');
    } else {
      this.renderer.addClass(this.subMenuElement.nativeElement, 'active');
    }
  }
}
