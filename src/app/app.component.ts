import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'melody-front';
  constructor(
    private route: ActivatedRoute, 
    private router: Router
    ) { }

    Home(){
      this.router.navigate(['/home']);
    }
}
