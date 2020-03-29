import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'melody-front';
  loginDone = false;
  username: any;
  useremail: any;
  back:any;
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router

  ) { }
  ngOnInit(): void {
    this.loginDone = false;
    this.back=true;

  }

  home() {
    this.back=false
    this.router.navigate(['/home']);
  }

}
