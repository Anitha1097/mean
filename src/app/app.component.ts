import { Component} from '@angular/core';
import { AuthServices } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthServices) {}
  ngOnInit() {
    this.authService.autoAuthUser();
  }
  title = 'mean-course';
  PostInputData = [];
  postInputData(postData) {
    this.PostInputData.push(postData);
  }
}
