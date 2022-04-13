import {AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
let config = new AuthServiceConfig([
{
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('1034106151498-vl3of684msfvgu399buonplgkv93b9jd.apps.googleusercontent.com')
   },
{
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('678807696604546')
}
]);
export function provideConfig(){
    return config;
}