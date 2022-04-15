import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Directive } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.css'],

})

export class PageLoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
