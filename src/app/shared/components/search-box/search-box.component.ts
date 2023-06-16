import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input() public placeholder: string = '';
  @Input() public value: string = '';
  @Output() searchData: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchDataPress: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
   this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value => {
      this.searchDataPress.emit(value)
    })
  }

  public searchDataE(value: string): void{
    this.searchData.emit(value);
  }

  onKeyPress(value: string): void{
    this.debouncer.next(value)
  }


  ngOnDestroy(): void {
    console.log('destruido');
    this.debouncerSubscription?.unsubscribe()
  }
 
}
