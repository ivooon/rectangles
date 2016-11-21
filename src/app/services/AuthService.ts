import { Injectable, Inject } from '@angular/core';

import { InteractionFacadeImpl } from "./InteractionFacadeImpl";


@Injectable()
export class AuthService {
	_InteractionFacadeImpl: InteractionFacadeImpl;
	
	constructor(@Inject(InteractionFacadeImpl) _InteractionFacadeImpl:InteractionFacadeImpl){
		this._InteractionFacadeImpl = _InteractionFacadeImpl;
	}

	isAuth(): boolean {
		let user = localStorage.getItem('currentUser');
		if(user) {
			return true;
			//TODO renew session
		}
		return false;
	}

	login(username: string, password: string) {
		return this._InteractionFacadeImpl.login(username, password)
            .then(
                data => {
                	console.log(data)
                    localStorage.setItem('currentUser',  'costamostam');
                    return this.isAuth();
                }
            )
	}

	register(username: string, password: string) {
		return this._InteractionFacadeImpl.register(username, password)
            .then(
                data => {
                	console.log(data)
                    localStorage.setItem('currentUser',  'costamostam');
                    return this.isAuth();
                }
            )
	}

	logout(){
		localStorage.removeItem('currentUser');
    	this._InteractionFacadeImpl.stopGame();
		return this.isAuth();
	}

}