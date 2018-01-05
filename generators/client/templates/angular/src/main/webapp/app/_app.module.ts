<%#
 Copyright 2013-2018 the original author or authors from the JHipster project.

 This file is part of the JHipster project, see http://www.jhipster.tech/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-%>
import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage<%_ if (authenticationType === 'jwt') { _%>, LocalStorageService, SessionStorageService <%_ } _%> } from 'ngx-webstorage';

import { <%=angularXAppName%>SharedModule, UserRouteAccessService } from './shared';
import { <%=angularXAppName%>AppRoutingModule} from './app-routing.module';
import { <%=angularXAppName%>HomeModule } from './home/home.module';
import { <%=angularXAppName%>AdminModule } from './admin/admin.module';
<%_ if (authenticationType !== 'oauth2') { _%>
import { <%=angularXAppName%>AccountModule } from './account/account.module';
<%_ } _%>
import { <%=angularXAppName%>EntityModule } from './entities/entity.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
<%_ if (authenticationType === 'jwt') { _%>
import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { JhiEventManager } from 'ng-jhipster';
<%_ } _%>
<%_ if (authenticationType === 'session' || authenticationType === 'oauth2') { _%>
    <%_ if (authenticationType === 'session') { _%>
import { LoginModalService } from './shared/login/login-modal.service';
    <%_ } _%>
import { StateStorageService } from './shared/auth/state-storage.service';
<%_ } _%>

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    <%=jhiPrefixCapitalized%>MainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    <%_ if (enableTranslation) { _%>
    ActiveMenuDirective,
    <%_ } _%>
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        <%=angularXAppName%>AppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        <%=angularXAppName%>SharedModule,
        <%=angularXAppName%>HomeModule,
        <%=angularXAppName%>AdminModule,
        <%_ if (authenticationType !== 'oauth2') { _%>
        <%=angularXAppName%>AccountModule,
        <%_ } _%>
        <%=angularXAppName%>EntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        <%=jhiPrefixCapitalized%>MainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        <%_ if (enableTranslation) { _%>
        ActiveMenuDirective,
        <%_ } _%>
        FooterComponent
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        <%_ if (authenticationType === 'jwt') { _%>
        {
            provide: HTTP_INTERCEPTORS,
            useFactory: (localStorageService, sessionStorageService) => new AuthInterceptor(localStorageService, sessionStorageService),
            multi: true,
            deps: [
                LocalStorageService,
                SessionStorageService
            ]
        },
        <%_ } _%>
        <%_ if (authenticationType === 'jwt' || authenticationType === 'uaa') { _%>
        {
            provide: HTTP_INTERCEPTORS,
            useFactory: (injector) => new AuthExpiredInterceptor(injector),
            multi: true,
            deps: [
                Injector
            ]
        },
        <%_ } else if (authenticationType === 'session') { _%>
        {
            provide: HTTP_INTERCEPTORS,
            useFactory: (injector, stateStorageService, loginModalService) => new AuthExpiredInterceptor(injector, stateStorageService, loginModalService),
            multi: true,
            deps: [
                Injector,
                StateStorageService,
                LoginModalService
            ]
        },
        <%_ } else if (authenticationType === 'oauth2') { _%>
        {
            provide: HTTP_INTERCEPTORS,
            useFactory: (injector, stateStorageService) => new AuthExpiredInterceptor(injector, stateStorageService),
            multi: true,
            deps: [
                Injector,
                StateStorageService,
            ]
        },
        <%_ } _%>
        {
            provide: HTTP_INTERCEPTORS,
            useFactory: (eventManager) => new ErrorHandlerInterceptor(eventManager),
            multi: true,
            deps: [
                JhiEventManager,
            ]
        },
    ],
    bootstrap: [ <%=jhiPrefixCapitalized%>MainComponent ]
})
export class <%=angularXAppName%>AppModule {}
