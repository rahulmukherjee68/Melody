import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  artistList: any;
  query:any;
  constructor(private api: ApiService,
    private route: ActivatedRoute,
    private router: Router, ) { }

  ngOnInit(): void {
    if (localStorage.getItem('email') == null) {
      this.router.navigate(['/login'])
    }
    this.getAllArtist();

  }
  getAllArtist() {
    // this.artistSaved=false;
    this.api.getArtistOrderByName().subscribe(
      (response) => {
        if (response.status == true) {
          console.log(response);
          this.artistList = response.doc;




        }
      }
    )
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
    return(s);

  }
  search() {
    this.router.navigate(['/home/'+this.query]);
  }
  logout(){
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }
}
