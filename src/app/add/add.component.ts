import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {
  NgbCalendar,
  NgbDate,
  NgbDateStruct,
  NgbInputDatepickerConfig
} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [NgbInputDatepickerConfig] 
})
export class AddComponent implements OnInit {
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  artistList: any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  songName: any;
  songDate: NgbDateStruct;
  artistName: any;
  artistDate: NgbDateStruct;
  artistBio: any;
  artistSaved:any;
  songFile: File = null;

  constructor(private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
private calendar: NgbCalendar
  ) {


   }

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
    var date=this.songDate.day+" "+this.dateFilter(this.songDate.month)+" "+this.songDate.year;
    const fd = new FormData();
    fd.append('name', this.songName);
    fd.append('date_of_release', date);
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
    var date=this.artistDate.day+" "+this.dateFilter(this.artistDate.month)+" "+this.artistDate.year;
    const data = { name: this.artistName, date_of_birth: date, Bio: this.artistBio }
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

  dateFilter(monthNumber){
    var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December' ];
        return monthNames[monthNumber - 1];
  }

}
