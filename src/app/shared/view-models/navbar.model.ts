export class NavBarItem {
  label?: string;
  url?: string; // Path ("/anything")
  href?: string; // Url ("https://example.com")
  icon?: string;
  items?: NavBarItem[]; // For nested menu
}
