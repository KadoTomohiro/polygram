import { Component } from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'pg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'polygram';

  env = environment.type;
}
