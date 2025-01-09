import {Routes} from '@angular/router'
import {HomeComponent} from './home/home.component'
import {PlayComponent} from './play/play.component'
import { HelloWorldComponent } from './hello-world/hello-world.component';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'spela',
        component: PlayComponent,
        title: 'Spela'
    },
    {
        path: 'hello',
        loadComponent: () => import('./hello-world/hello-world.component').then(m => m.HelloWorldComponent),
        title: 'Hello World'
    }
];

export default routeConfig;