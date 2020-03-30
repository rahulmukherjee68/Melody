import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginDone = false;
  username: any;
  useremail: any;
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit() {
    this.loginDone = false;
  }
  Home() {
    this.router.navigate(['/home']);
  }
  login() {
    if (this.useremail == undefined || this.username == undefined || this.useremail == "" || this.username == "")
      alert("please enter name and Email!");
    else {
      localStorage.setItem('email', this.useremail);
      var data = { name: this.username, email: this.useremail };
      this.api.addUser(data).subscribe(
        (response) => {
          console.log(response);

          if (response.status == true) {
            this.router.navigate(['/home']);
          }
          else {
            alert(response.message);
          }
        }
      )
    }
  }

}
