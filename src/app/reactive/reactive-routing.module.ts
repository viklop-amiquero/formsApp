import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BasicPageComponent } from './pages/basic-page/basic-page.component'
import { DinamycPageComponent } from './pages/dinamyc-page/dinamyc-page.component'
import { SwitchesPageComponent } from './pages/switches-page/switches-page.component'

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'basic',
                component: BasicPageComponent,
            },
            {
                path: 'dynamic',
                component: DinamycPageComponent,
            },
            {
                path: 'switches',
                component: SwitchesPageComponent,
            },
            {
                path: '**',
                redirectTo: 'basic',
            },
        ],
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReactiveRoutingModule {}
