import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/AuthService';

@Component({
	selector: 'auth-component',
  	templateUrl: 'auth.component.html',
  	providers: [AuthService]
})

export class AuthComponent {

	login: any = {};
	register: any = {};
	
	constructor(private _AuthService:AuthService){}

	loginFn():void {
		this._AuthService.login(this.login.username, this.login.password);
	}

	registerFn():void {
		this._AuthService.register(this.register.username, this.register.password);
	}

	logout(){
		this._AuthService.logout();
	}

}