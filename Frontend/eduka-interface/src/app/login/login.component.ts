import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {HTTPCustomResponse} from '../../models/response.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  response: HTTPCustomResponse = null;
  errorMsg = '';
  message = '';

  constructor(private api: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.message = this.route.snapshot.paramMap.get('message');
  }

  doLogin() {
    this.response = null;
    this.errorMsg = '';
    this.message = '';

    const data = {
      email: this.email,
      password: this.password
    };

    if (!data.email || !data.password) {
      this.errorMsg = 'Email and Password must be filled';
      return;
    }

    this.api.doAuthentication(data)
      .subscribe(res => {
        this.response = res;

        if (!res.success) {
          this.errorMsg = res.message;
          return;
        }

        this.router.navigate(['/classrooms']);
      }, err => {
        console.log('error:' + err.json);
        this.response = null;
        this.errorMsg = err.message;
      });
  }

}
