import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, SharedModule, ButtonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
