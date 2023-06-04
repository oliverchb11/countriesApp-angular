import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  @Input() public placeholder: string = '';
  @Output() searchData: EventEmitter<string> = new EventEmitter<string>();

  public searchDataE(value: string): void{
    this.searchData.emit(value);
  }
}
