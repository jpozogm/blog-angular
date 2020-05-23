import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginProxyService } from './login/login-proxy.service';

export class CommonValidator {

    static startWithNumber(control: FormControl) {
        const value = control.value;
        const firstChar = value.charAt(0);
        if (firstChar && !isNaN(firstChar)) {
            return {startWithNumber : true};
        } else {
            return null;
        }
    }

    static compareValidator(controlNameToCompare: string){
        return (c: FormControl) => {
            const controlToCompare = c.root.get(controlNameToCompare);

            if (controlToCompare) {
                const subs: Subscription = controlToCompare.valueChanges.subscribe(() =>
                {
                    c.updateValueAndValidity();
                    subs.unsubscribe();
                });
            }
            return controlToCompare && controlToCompare.value !== c.value ? {compare: true} : null;
        };
    }

    static userTaken(service: LoginProxyService){
        return(control: FormControl) => {
            return new Promise((resolve) => { service.checkUserByname(control.value).subscribe(
                    (response) => {
                        resolve({ userTaken: true });
                    },
                    (error) => {
                        resolve(null);
                    }
                );
            });
        };
    }
}
