import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  AddMusic: any;
  currentRate = 8;
  artistData:any;
  songsData:any;
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
          this.artistData=response.artist;
          this.songsData=response.songs;
        }
        else {
          alert(response.message);
        }
      }
    )
  }



}
