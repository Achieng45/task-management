import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot,Router} from '@angular/router';
import { UsersService } from './users.service';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
 
 if (inject(UsersService).loggedin()){
    return true
 }else{
  inject(Router).navigate(['/auth']);
  return false
 }
  
}
