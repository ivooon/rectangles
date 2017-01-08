import { Injectable, Inject } from '@angular/core';

import { CookieService } from 'angular2-cookie/core';

import { InteractionFacadeImpl } from "./InteractionFacadeImpl";


@Injectable()
export class AuthService {
	_InteractionFacadeImpl: InteractionFacadeImpl;
	
	constructor(@Inject(InteractionFacadeImpl) _InteractionFacadeImpl:InteractionFacadeImpl,
		private _cookieService:CookieService){
		this._InteractionFacadeImpl = _InteractionFacadeImpl;
	}

	isAuth(): boolean {
		if(this._cookieService.get('PHPSESSID')) {
			return true;
		}
		return false;
	}

	login(username: string, password: string) {
		return this._InteractionFacadeImpl.login(username, password)
            .then(
                data => {
                    return this.isAuth();
                }
            )
	}

	register(username: string, password: string) {
		return this._InteractionFacadeImpl.register(username, password)
            .then(
                data => {
                    this.login(username, password);
                    return this.isAuth();
                }
            )
	}

	logout(){
		this._cookieService.remove('PHPSESSID');
    	this._InteractionFacadeImpl.stopGame();
		return this.isAuth();
	}

}