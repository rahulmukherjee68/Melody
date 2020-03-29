import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  artistList: any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  songName: any;
  songDate: any;
  artistName: any;
  artistDate: any;
  artistBio: any;
  artistSaved:any;
  songFile: File = null;

  constructor(private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllArtist();
    this.artistSaved=false;
  }
  getAllArtist() {
    // this.artistSaved=false;
    this.api.getAllArtist().subscribe(
      (response) => {
        if (response.status == true) {
          console.log(response);
          this.artistList = response.doc;
          this.dropdownList = this.artistList;
          this.selectedItems = [

          ];
          this.dropdownSettings = {
            singleSelection: false,
            text: "Select Artists",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            classes: "myclass custom-class-example",
            searchBy: ["itemName"],
            badgeShowLimit: 3
          };

        }
      }
    )
  }
  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
  cancel() {
    this.router.navigate(['/home']);
  }
  saveSong() {
    this.artistSaved=false;
    console.log(this.songName);
    console.log(this.songDate);
    console.log(this.songFile);
    console.log(this.selectedItems);
    const fd = new FormData();
    fd.append('name', this.songName);
    fd.append('date_of_release', this.songDate);
    fd.append('artwork', this.songFile, this.songFile.name);
    this.api.addSong(fd).subscribe(
      (response) => {
        if (response.status === true) {
          var map = { id: response.id, artist: this.selectedItems }
          this.api.addMap(map).subscribe(
            (response) => {
              console.log(response);
              if (response.status === true)
                alert("data saved")
            }
          )
        }
      }
    )



  }
  handleFileInput(event) {
    this.songFile = <File>event.target.files[0];

  }
  saveArtist() {
    const data = { name: this.artistName, date_of_birth: this.artistDate, Bio: this.artistBio }
    this.api.addArtist(data).subscribe(
      (response) => {
        console.log(response);
        if (response.status === true)
          {
            this.artistSaved=true;
            this.getAllArtist();
            this.artistName="";
            this.artistDate=null;
            this.selectedItems=[];
            this.artistBio="";
          }
      }
    )
  }

}
