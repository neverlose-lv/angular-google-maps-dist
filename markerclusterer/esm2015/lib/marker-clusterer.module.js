import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { AgmMarkerCluster } from './directives/marker-cluster';
export class AgmMarkerClustererModule {
}
AgmMarkerClustererModule.decorators = [
    { type: NgModule, args: [{
                imports: [AgmCoreModule],
                declarations: [AgmMarkerCluster],
                exports: [AgmMarkerCluster],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLWNsdXN0ZXJlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tYXJrZXJjbHVzdGVyZXIvc3JjL2xpYi9tYXJrZXItY2x1c3RlcmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFPL0QsTUFBTSxPQUFPLHdCQUF3Qjs7O1lBTHBDLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBQ3hCLFlBQVksRUFBRSxDQUFDLGdCQUFnQixDQUFDO2dCQUNoQyxPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQzthQUM1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFnbUNvcmVNb2R1bGUgfSBmcm9tICdAYWdtL2NvcmUnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFnbU1hcmtlckNsdXN0ZXIgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbWFya2VyLWNsdXN0ZXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQWdtQ29yZU1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0FnbU1hcmtlckNsdXN0ZXJdLFxuICBleHBvcnRzOiBbQWdtTWFya2VyQ2x1c3Rlcl0sXG59KVxuZXhwb3J0IGNsYXNzIEFnbU1hcmtlckNsdXN0ZXJlck1vZHVsZSB7XG59XG4iXX0=