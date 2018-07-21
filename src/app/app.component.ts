import { Component, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  public viewContainerRef: ViewContainerRef;
  public constructor(
    public toastr: ToastsManager, 
    translate: TranslateService,
    viewContainerRef: ViewContainerRef
  ) {
    this.viewContainerRef = viewContainerRef;
    this.toastr.setRootViewContainerRef(viewContainerRef);
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }
}
