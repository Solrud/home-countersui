import {AfterViewInit, Directive, TemplateRef, ViewContainerRef} from '@angular/core';
import {EventService} from "../../data/service/Event/event.service";

@Directive({
  selector: '[appShowSpinner]'
})
export class ShowSpinnerDirective<T> implements AfterViewInit{

  constructor(private eventService: EventService,
              private viewContainerRef: ViewContainerRef,
              private templateRef: TemplateRef<T>) { }


  ngAfterViewInit() {
    this.eventService.spinnerVisibility$
      .subscribe( result => {
        this.viewContainerRef.clear();
        if (result){
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      })
  }
}
