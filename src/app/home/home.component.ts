import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  AddMusic: any;
  currentRate = 0;
  artistData: any;
  query: any;
  songsData: any;
  searchData: any;
  noData:any;
  constructor(private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit() {
    //localStorage.removeItem('email');
    this.noData=false
    this.searchData = false;
    console.log(localStorage.getItem('email'));

    if (localStorage.getItem('email') == null) {
      this.router.navigate(['/login'])
    }
    this.AddMusic = false;

    this.query = this.route.snapshot.params.query;
    if (this.query == undefined) {
      this.getAll();
    }
    else {
      this.search();
    }



  }
  addForm() {
    this.router.navigate(['/add']);
  }
  clickstars(id) {
    console.log(id);
    console.log(this.currentRate);

    var data = { id: id, total_rating: this.currentRate, total_users_rated: 1 }

    this.api.rateSong(data).subscribe(
      (response) => {
        if (response.status == true) {

          this.currentRate = 0;
          this.getAll();

        }
      }
    )

  }
  getAll() {
    this.api.getAll().subscribe(
      (response) => {
        if (response.status == true) {
          console.log(response);
          if (response.artist.length == 0 && response.songs.length) {
              this.noData=true
          } else {
            this.artistData = response.artist;
            this.songsData = response.songs;
          }
        }
        else {
          alert(response.message);
        }
      }
    )
  }
  artistAppend(data) {
    var i = 0
    var s = "";
    for (i = 0; i < data.length; i++) {
      if (s === "") {
        s = s + data[i].artist_name;
      } else {
        s = s + ", " + data[i].artist_name;
      }
    }
    //console.log(s);
    return (s);
  }
  songsAppend(data) {
    var i = 0
    var s = "";
    for (i = 0; i < data.length; i++) {
      if (s === "") {
        s = s + data[i].song_name;
      } else {
        s = s + ", " + data[i].song_name;
      }
    }
    //console.log(s);
    return (s);
  }
  home() {
    this.getAll()
  }
  search() {
    console.log(this.query);
    this.api.search({ query: this.query }).subscribe(
      (response) => {
        if (response.status == true) {
          console.log(response);
          this.songsData = response.songs;
          this.searchData = true
        }
        else {
          alert(response.message);
        }
      }
    )
  }

  logout(){
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }


}
