import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  openMobileMenu(){
    if ((document.querySelector('.mobile-menu') as HTMLElement).style.display == 'none' || (document.querySelector('.mobile-menu') as HTMLElement).style.display == '') {
      (document.querySelector('.mobile-menu') as HTMLElement).style.display = 'flex';
    }else{
      (document.querySelector('.mobile-menu') as HTMLElement).style.display = 'none';
    }
  }

  closeMobileMenu(){
    (document.querySelector('.mobile-menu') as HTMLElement).style.display = 'none';
  }
}
