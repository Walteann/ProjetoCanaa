import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';

import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthService {
	user: firebase.User;
	listaUsuarios: AngularFireList<any>

	constructor(public afAuth: AngularFireAuth,
		private db: AngularFireDatabase
	) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});

		this.listaUsuarios = this.db.list('listaUsuarios');
	}

	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
	}

	signInWithGoogle() {
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());

			// if (data['additionalUserInfo'].isNewUser) {
			// 	this.listaUsuarios.push({
			// 		uid: data.user.uid,
			// 		email: data.user.email,
			// 		displayName: data.user.displayName,
			// 		phoneNumber: data.user.phoneNumber,
			// 		photoURL: data.user.photoURL
			// 	});
			// }
		// 	console.log(data);
		// });
	}

	get authenticated(): boolean {
		return this.user !== null;
	}

	getEmail() {
		return this.user && this.user.email;
	}

	signOut(): Promise<void> {
		return this.afAuth.auth.signOut();
	  }

	private oauthSignIn(provider: AuthProvider) {
		if (!(<any>window).cordova) {
			return this.afAuth.auth.signInWithPopup(provider);
		} else {
			return this.afAuth.auth.signInWithRedirect(provider)
			.then(() => {
				return this.afAuth.auth.getRedirectResult().then( result => {
					// This gives you a Google Access Token.
					// You can use it to access the Google API.
					let token = result.credential.accessToken;
					// The signed-in user info.
					let user = result.user;
					console.log(token, user);
				}).catch(function(error) {
					// Handle Errors here.
					alert(error.message);
				});
			});
		}
	}

	signUp(credentials) {
		console.log(credentials);
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
    }

    resetPassword(email: string) {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    }

}
