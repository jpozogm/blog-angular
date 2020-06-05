import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginProxyService } from './login-proxy.service';
import { Token } from './types/token';
import { TokenDTO } from './types/tokenDTO';
import { User } from './types/user';
import { UserDTO } from './types/userDTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private proxy: LoginProxyService) { }


  signIn(login): Observable<Token> {
    return this.proxy.signIn(login).pipe(
      map(tokenDTO => this.tokenDTOToModel(tokenDTO))
    );
  }

  signUp(user: User): Observable<User> {
    return this.proxy.signUp(user).pipe(
      map(userDTO => this.userDTOToModel(userDTO))
    );
  }

  checkUserByname(name): Observable<User>{
    return this.proxy.checkUserByname(name).pipe(
      map(userDTO => this.userDTOToModel(userDTO))
    );
  }

  private userDTOToModel(userDTO: UserDTO): User {
    return {
      user: userDTO.user,
      password: userDTO.password,
      role: userDTO.role
    };
  }

  private userModelToDTO(user: User): UserDTO {
    return {
      user: user.user,
      password: user.password,
      role: user.role
    };
  }

  private tokenDTOToModel(postDTO: TokenDTO): Token {
    return {
      message: postDTO.message,
      token: postDTO.token
    };
  }

  private tokenModelToDTO(post: Token): TokenDTO {
    return {
      message: post.message,
      token: post.token
    };
  }
}
