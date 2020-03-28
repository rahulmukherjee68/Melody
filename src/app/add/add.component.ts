import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  artistList: any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getAllArtist();
    
  }
  getAllArtist() {
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
            classes: "myclass custom-class",
            searchBy:["itemName"]
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


}
