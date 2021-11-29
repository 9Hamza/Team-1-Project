import { Component, OnInit } from '@angular/core';

declare var name: any;

@Component({
  selector: 'app-search-function',
  templateUrl: './search-function.component.html',
  styleUrls: ['./search-function.component.css']
})
export class SearchFunctionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    new name();
  }
  title = 'app-js';
}
