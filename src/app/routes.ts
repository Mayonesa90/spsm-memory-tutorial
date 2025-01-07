import {Routes} from '@angular/router'
import {HomeComponent} from './home/home.component'
import {PlayComponent} from './play/play.component'

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
    }
];

export default routeConfig;