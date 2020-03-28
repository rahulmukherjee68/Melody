import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  AddMusic: any;
  currentRate = 0;
  artistData: any;
  songsData: any;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.AddMusic = false;
    this.getAll();
  }
  addForm() {
    this.AddMusic = true;
  }
  clickstars() {
    console.log(true);

  }
  getAll() {
    this.api.getAll().subscribe(
      (response) => {
        if (response.status == true) {
          console.log(response);
          this.artistData = response.artist;
          this.songsData = response.songs;
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


}
