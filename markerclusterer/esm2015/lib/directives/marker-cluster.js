import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { InfoWindowManager, MarkerManager } from '@agm/core';
import { ClusterManager } from '../services/managers/cluster-manager';
// tslint:disable: jsdoc-format
/**
 * AgmMarkerCluster clusters map marker if they are near together
 *
 * ### Example
```typescript
import { Component } from '@angular/core';

@Component({
 selector: 'my-map-cmp',
 styles: [`
   agm-map {
     height: 300px;
   }
 `],
 template: `
   <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
     <agm-marker-cluster>
       <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
       </agm-marker>
       <agm-marker [latitude]="lat2" [longitude]="lng2" [label]="'N'">
       </agm-marker>
     </agm-marker-cluster>
   </agm-map>
 `
})
```
 */
// tslint:enable: jsdoc-format
export class AgmMarkerCluster {
    constructor(_clusterManager) {
        this._clusterManager = _clusterManager;
        this.clusterClick = new EventEmitter();
        this._observableSubscriptions = [];
    }
    /** @internal */
    ngOnDestroy() {
        this._clusterManager.clearMarkers();
        this._observableSubscriptions.forEach((s) => s.unsubscribe());
    }
    /** @internal */
    ngOnChanges(changes) {
        // tslint:disable: no-string-literal
        if (changes['gridSize']) {
            this._clusterManager.setGridSize(this);
        }
        if (changes['maxZoom']) {
            this._clusterManager.setMaxZoom(this);
        }
        if (changes['zoomOnClick']) {
            this._clusterManager.setZoomOnClick(this);
        }
        if (changes['averageCenter']) {
            this._clusterManager.setAverageCenter(this);
        }
        if (changes['minimumClusterSize']) {
            this._clusterManager.setMinimumClusterSize(this);
        }
        if (changes['imagePath']) {
            this._clusterManager.setImagePath(this);
        }
        if (changes['imageExtension']) {
            this._clusterManager.setImageExtension(this);
        }
        if (changes['calculator']) {
            this._clusterManager.setCalculator(this);
        }
        if (changes['styles']) {
            this._clusterManager.setStyles(this);
        }
        if (changes['clusterClass']) {
            this._clusterManager.setClusterClass(this);
        }
        if (changes['enableRetinaIcons']) {
            this._clusterManager.setEnableRetinaIcons(this);
        }
        if (changes['ignoreHidden']) {
            this._clusterManager.setIgnoreHidden(this);
        }
        if (changes['imageSizes']) {
            this._clusterManager.setImageSizes(this);
        }
        if (changes['title']) {
            this._clusterManager.setTitle(this);
        }
        // tslint:enable: no-string-literal
    }
    _addEventListeners() {
        const handlers = [
            {
                name: 'clusterclick',
                handler: () => this.clusterClick.emit(),
            },
        ];
        handlers.forEach((obj) => {
            const os = this._clusterManager.createClusterEventObservable(obj.name).subscribe(obj.handler);
            this._observableSubscriptions.push(os);
        });
    }
    /** @internal */
    ngOnInit() {
        this._addEventListeners();
        this._clusterManager.init({
            averageCenter: this.averageCenter,
            calculator: this.calculator,
            clusterClass: this.clusterClass,
            enableRetinaIcons: this.enableRetinaIcons,
            gridSize: this.gridSize,
            ignoreHidden: this.ignoreHidden,
            imageExtension: this.imageExtension,
            imagePath: this.imagePath,
            imageSizes: this.imageSizes,
            maxZoom: this.maxZoom,
            minimumClusterSize: this.minimumClusterSize,
            styles: this.styles,
            title: this.title,
            zoomOnClick: this.zoomOnClick,
        });
    }
}
AgmMarkerCluster.decorators = [
    { type: Directive, args: [{
                selector: 'agm-marker-cluster',
                providers: [
                    ClusterManager,
                    { provide: MarkerManager, useExisting: ClusterManager },
                    InfoWindowManager,
                ],
            },] }
];
AgmMarkerCluster.ctorParameters = () => [
    { type: ClusterManager }
];
AgmMarkerCluster.propDecorators = {
    gridSize: [{ type: Input }],
    maxZoom: [{ type: Input }],
    zoomOnClick: [{ type: Input }],
    averageCenter: [{ type: Input }],
    minimumClusterSize: [{ type: Input }],
    styles: [{ type: Input }],
    calculator: [{ type: Input }],
    imagePath: [{ type: Input }],
    imageExtension: [{ type: Input }],
    clusterClass: [{ type: Input }],
    enableRetinaIcons: [{ type: Input }],
    ignoreHidden: [{ type: Input }],
    imageSizes: [{ type: Input }],
    title: [{ type: Input }],
    clusterClick: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLWNsdXN0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9tYXJrZXJjbHVzdGVyZXIvc3JjL2xpYi9kaXJlY3RpdmVzL21hcmtlci1jbHVzdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBZ0MsTUFBTSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUluSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUV0RSwrQkFBK0I7QUFDL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsOEJBQThCO0FBUzlCLE1BQU0sT0FBTyxnQkFBZ0I7SUE2RjNCLFlBQW9CLGVBQStCO1FBQS9CLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUp6QyxpQkFBWSxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRTlELDZCQUF3QixHQUFtQixFQUFFLENBQUM7SUFFQyxDQUFDO0lBRXhELGdCQUFnQjtJQUNoQixXQUFXO1FBQ1QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLFdBQVcsQ0FBQyxPQUF3QztRQUNsRCxvQ0FBb0M7UUFDcEMsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN0QixJQUFJ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RSxJQUFJLENBQUMsUUFBUTtZQUN2QixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDL0IsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQ25DLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDM0IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0I7WUFDM0MsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDOUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBOUxGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixTQUFTLEVBQUU7b0JBQ1QsY0FBYztvQkFDZCxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRTtvQkFDdkQsaUJBQWlCO2lCQUNsQjthQUNGOzs7WUF0Q1EsY0FBYzs7O3VCQTJDcEIsS0FBSztzQkFLTCxLQUFLOzBCQUtMLEtBQUs7NEJBS0wsS0FBSztpQ0FLTCxLQUFLO3FCQUtMLEtBQUs7eUJBS0wsS0FBSzt3QkFFTCxLQUFLOzZCQUNMLEtBQUs7MkJBU0wsS0FBSztnQ0FXTCxLQUFLOzJCQVlMLEtBQUs7eUJBU0wsS0FBSztvQkFTTCxLQUFLOzJCQUVMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJbmZvV2luZG93TWFuYWdlciwgTWFya2VyTWFuYWdlciB9IGZyb20gJ0BhZ20vY29yZSc7XG5pbXBvcnQgeyBDbHVzdGVySWNvblN0eWxlLCBNYXJrZXJDbHVzdGVyZXJPcHRpb25zIH0gZnJvbSAnQGdvb2dsZS9tYXJrZXJjbHVzdGVyZXJwbHVzJztcbmltcG9ydCB7IENhbGN1bGF0b3IgfSBmcm9tICdAZ29vZ2xlL21hcmtlcmNsdXN0ZXJlcnBsdXMvZGlzdC9tYXJrZXJjbHVzdGVyZXInO1xuaW1wb3J0IHsgQ2x1c3Rlck1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9jbHVzdGVyLW1hbmFnZXInO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZToganNkb2MtZm9ybWF0XG4vKipcbiAqIEFnbU1hcmtlckNsdXN0ZXIgY2x1c3RlcnMgbWFwIG1hcmtlciBpZiB0aGV5IGFyZSBuZWFyIHRvZ2V0aGVyXG4gKlxuICogIyMjIEV4YW1wbGVcbmBgYHR5cGVzY3JpcHRcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxuIHN0eWxlczogW2BcbiAgIGFnbS1tYXAge1xuICAgICBoZWlnaHQ6IDMwMHB4O1xuICAgfVxuIGBdLFxuIHRlbXBsYXRlOiBgXG4gICA8YWdtLW1hcCBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbem9vbV09XCJ6b29tXCI+XG4gICAgIDxhZ20tbWFya2VyLWNsdXN0ZXI+XG4gICAgICAgPGFnbS1tYXJrZXIgW2xhdGl0dWRlXT1cImxhdFwiIFtsb25naXR1ZGVdPVwibG5nXCIgW2xhYmVsXT1cIidNJ1wiPlxuICAgICAgIDwvYWdtLW1hcmtlcj5cbiAgICAgICA8YWdtLW1hcmtlciBbbGF0aXR1ZGVdPVwibGF0MlwiIFtsb25naXR1ZGVdPVwibG5nMlwiIFtsYWJlbF09XCInTidcIj5cbiAgICAgICA8L2FnbS1tYXJrZXI+XG4gICAgIDwvYWdtLW1hcmtlci1jbHVzdGVyPlxuICAgPC9hZ20tbWFwPlxuIGBcbn0pXG5gYGBcbiAqL1xuLy8gdHNsaW50OmVuYWJsZToganNkb2MtZm9ybWF0XG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdhZ20tbWFya2VyLWNsdXN0ZXInLFxuICBwcm92aWRlcnM6IFtcbiAgICBDbHVzdGVyTWFuYWdlcixcbiAgICB7IHByb3ZpZGU6IE1hcmtlck1hbmFnZXIsIHVzZUV4aXN0aW5nOiBDbHVzdGVyTWFuYWdlciB9LFxuICAgIEluZm9XaW5kb3dNYW5hZ2VyLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBZ21NYXJrZXJDbHVzdGVyIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMsIE9uSW5pdCwgTWFya2VyQ2x1c3RlcmVyT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUaGUgZ3JpZCBzaXplIG9mIGEgY2x1c3RlciBpbiBwaXhlbHNcbiAgICovXG4gIEBJbnB1dCgpIGdyaWRTaXplOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBtYXhpbXVtIHpvb20gbGV2ZWwgdGhhdCBhIG1hcmtlciBjYW4gYmUgcGFydCBvZiBhIGNsdXN0ZXIuXG4gICAqL1xuICBASW5wdXQoKSBtYXhab29tOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGRlZmF1bHQgYmVoYXZpb3VyIG9mIGNsaWNraW5nIG9uIGEgY2x1c3RlciBpcyB0byB6b29tIGludG8gaXQuXG4gICAqL1xuICBASW5wdXQoKSB6b29tT25DbGljazogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgY2VudGVyIG9mIGVhY2ggY2x1c3RlciBzaG91bGQgYmUgdGhlIGF2ZXJhZ2Ugb2YgYWxsIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXIuXG4gICAqL1xuICBASW5wdXQoKSBhdmVyYWdlQ2VudGVyOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgbWluaW11bSBudW1iZXIgb2YgbWFya2VycyB0byBiZSBpbiBhIGNsdXN0ZXIgYmVmb3JlIHRoZSBtYXJrZXJzIGFyZSBoaWRkZW4gYW5kIGEgY291bnQgaXMgc2hvd24uXG4gICAqL1xuICBASW5wdXQoKSBtaW5pbXVtQ2x1c3RlclNpemU6IG51bWJlcjtcblxuICAvKipcbiAgICogQW4gb2JqZWN0IHRoYXQgaGFzIHN0eWxlIHByb3BlcnRpZXMuXG4gICAqL1xuICBASW5wdXQoKSBzdHlsZXM6IENsdXN0ZXJJY29uU3R5bGVbXTtcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB0aGF0IGNhbGN1bGF0ZXMgdGhlIGNsdXN0ZXIgc3R5bGUgYW5kIHRleHQgYmFzZWQgb24gdGhlIG1hcmtlcnMgaW4gdGhlIGNsdXN0ZXIuXG4gICAqL1xuICBASW5wdXQoKSBjYWxjdWxhdG9yOiBDYWxjdWxhdG9yO1xuXG4gIEBJbnB1dCgpIGltYWdlUGF0aDogc3RyaW5nO1xuICBASW5wdXQoKSBpbWFnZUV4dGVuc2lvbjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgQ1NTIGNsYXNzIGRlZmluaW5nIGdlbmVyYWwgc3R5bGVzIGZvciB0aGUgY2x1c3RlciBtYXJrZXJzLlxuICAgKiBVc2UgdGhpcyBjbGFzcyB0byBkZWZpbmUgQ1NTIHN0eWxlcyB0aGF0IGFyZSBub3Qgc2V0IHVwIGJ5IHRoZSBjb2RlIHRoYXRcbiAgICogcHJvY2Vzc2VzIHRoZSBgc3R5bGVzYCBhcnJheS5cbiAgICpcbiAgICogQGRlZmF1bHRWYWx1ZSAnY2x1c3RlcidcbiAgICovXG4gIEBJbnB1dCgpIGNsdXN0ZXJDbGFzczogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGFsbG93IHRoZSB1c2Ugb2YgY2x1c3RlciBpY29ucyB0aGF0IGhhdmUgc2l6ZXMgdGhhdCBhcmUgc29tZVxuICAgKiBtdWx0aXBsZSAodHlwaWNhbGx5IGRvdWJsZSkgb2YgdGhlaXIgYWN0dWFsIGRpc3BsYXkgc2l6ZS4gSWNvbnMgc3VjaCBhc1xuICAgKiB0aGVzZSBsb29rIGJldHRlciB3aGVuIHZpZXdlZCBvbiBoaWdoLXJlc29sdXRpb24gbW9uaXRvcnMgc3VjaCBhcyBBcHBsZSdzXG4gICAqIFJldGluYSBkaXNwbGF5cy4gTm90ZTogaWYgdGhpcyBwcm9wZXJ0eSBpcyBgdHJ1ZWAsIHNwcml0ZXMgY2Fubm90IGJlIHVzZWRcbiAgICogYXMgY2x1c3RlciBpY29ucy5cbiAgICpcbiAgICogQGRlZmF1bHRWYWx1ZSBmYWxzZVxuICAgKi9cbiAgQElucHV0KCkgZW5hYmxlUmV0aW5hSWNvbnM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gaWdub3JlIGhpZGRlbiBtYXJrZXJzIGluIGNsdXN0ZXJzLiBZb3UgbWF5IHdhbnQgdG8gc2V0IHRoaXMgdG9cbiAgICogYHRydWVgIHRvIGVuc3VyZSB0aGF0IGhpZGRlbiBtYXJrZXJzIGFyZSBub3QgaW5jbHVkZWQgaW4gdGhlIG1hcmtlciBjb3VudFxuICAgKiB0aGF0IGFwcGVhcnMgb24gYSBjbHVzdGVyIG1hcmtlciAodGhpcyBjb3VudCBpcyB0aGUgdmFsdWUgb2YgdGhlIGB0ZXh0YFxuICAgKiBwcm9wZXJ0eSBvZiB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWZhdWx0IGBjYWxjdWxhdG9yYCkuIElmIHNldCB0b1xuICAgKiBgdHJ1ZWAgYW5kIHlvdSBjaGFuZ2UgdGhlIHZpc2liaWxpdHkgb2YgYSBtYXJrZXIgYmVpbmcgY2x1c3RlcmVkLCBiZSBzdXJlXG4gICAqIHRvIGFsc28gY2FsbCBgTWFya2VyQ2x1c3RlcmVyLnJlcGFpbnQoKWAuXG4gICAqXG4gICAqIEBkZWZhdWx0VmFsdWUgZmFsc2VcbiAgICovXG4gIEBJbnB1dCgpIGlnbm9yZUhpZGRlbjogYm9vbGVhbjtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgbnVtYmVycyBjb250YWluaW5nIHRoZSB3aWR0aHMgb2YgdGhlIGdyb3VwIG9mXG4gICAqIGA8aW1hZ2VQYXRoPjxuPi48aW1hZ2VFeHRlbnNpb24+YCBpbWFnZSBmaWxlcy4gKFRoZSBpbWFnZXMgYXJlIGFzc3VtZWQgdG9cbiAgICogYmUgc3F1YXJlLilcbiAgICpcbiAgICogQGRlZmF1bHRWYWx1ZSBbNTMsIDU2LCA2NiwgNzgsIDkwXVxuICAgKi9cbiAgQElucHV0KCkgaW1hZ2VTaXplczogbnVtYmVyW107XG5cbiAgLyoqXG4gICAqIFRoZSB0b29sdGlwIHRvIGRpc3BsYXkgd2hlbiB0aGUgbW91c2UgbW92ZXMgb3ZlciBhIGNsdXN0ZXIgbWFya2VyLlxuICAgKiAoQWx0ZXJuYXRpdmVseSwgeW91IGNhbiB1c2UgYSBjdXN0b20gYGNhbGN1bGF0b3JgIGZ1bmN0aW9uIHRvIHNwZWNpZnkgYVxuICAgKiBkaWZmZXJlbnQgdG9vbHRpcCBmb3IgZWFjaCBjbHVzdGVyIG1hcmtlci4pXG4gICAqXG4gICAqIEBkZWZhdWx0VmFsdWUgJydcbiAgICovXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGNsdXN0ZXJDbGljazogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgX29ic2VydmFibGVTdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NsdXN0ZXJNYW5hZ2VyOiBDbHVzdGVyTWFuYWdlcikgeyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5jbGVhck1hcmtlcnMoKTtcbiAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzKSA9PiBzLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtrZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KSB7XG4gICAgLy8gdHNsaW50OmRpc2FibGU6IG5vLXN0cmluZy1saXRlcmFsXG4gICAgaWYgKGNoYW5nZXNbJ2dyaWRTaXplJ10pIHtcbiAgICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLnNldEdyaWRTaXplKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snbWF4Wm9vbSddKSB7XG4gICAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5zZXRNYXhab29tKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snem9vbU9uQ2xpY2snXSkge1xuICAgICAgdGhpcy5fY2x1c3Rlck1hbmFnZXIuc2V0Wm9vbU9uQ2xpY2sodGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydhdmVyYWdlQ2VudGVyJ10pIHtcbiAgICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLnNldEF2ZXJhZ2VDZW50ZXIodGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydtaW5pbXVtQ2x1c3RlclNpemUnXSkge1xuICAgICAgdGhpcy5fY2x1c3Rlck1hbmFnZXIuc2V0TWluaW11bUNsdXN0ZXJTaXplKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snaW1hZ2VQYXRoJ10pIHtcbiAgICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLnNldEltYWdlUGF0aCh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2ltYWdlRXh0ZW5zaW9uJ10pIHtcbiAgICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLnNldEltYWdlRXh0ZW5zaW9uKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snY2FsY3VsYXRvciddKSB7XG4gICAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5zZXRDYWxjdWxhdG9yKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snc3R5bGVzJ10pIHtcbiAgICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLnNldFN0eWxlcyh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2NsdXN0ZXJDbGFzcyddKSB7XG4gICAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5zZXRDbHVzdGVyQ2xhc3ModGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydlbmFibGVSZXRpbmFJY29ucyddKSB7XG4gICAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5zZXRFbmFibGVSZXRpbmFJY29ucyh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2lnbm9yZUhpZGRlbiddKSB7XG4gICAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5zZXRJZ25vcmVIaWRkZW4odGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydpbWFnZVNpemVzJ10pIHtcbiAgICAgIHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLnNldEltYWdlU2l6ZXModGhpcyk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWyd0aXRsZSddKSB7XG4gICAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5zZXRUaXRsZSh0aGlzKTtcbiAgICB9XG4gICAgLy8gdHNsaW50OmVuYWJsZTogbm8tc3RyaW5nLWxpdGVyYWxcblxuICB9XG5cbiAgcHJpdmF0ZSBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgY29uc3QgaGFuZGxlcnMgPSBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdjbHVzdGVyY2xpY2snLFxuICAgICAgICBoYW5kbGVyOiAoKSA9PiB0aGlzLmNsdXN0ZXJDbGljay5lbWl0KCksXG4gICAgICB9LFxuICAgIF07XG4gICAgaGFuZGxlcnMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICBjb25zdCBvcyA9IHRoaXMuX2NsdXN0ZXJNYW5hZ2VyLmNyZWF0ZUNsdXN0ZXJFdmVudE9ic2VydmFibGUob2JqLm5hbWUpLnN1YnNjcmliZShvYmouaGFuZGxlcik7XG4gICAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKG9zKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLl9jbHVzdGVyTWFuYWdlci5pbml0KHtcbiAgICAgIGF2ZXJhZ2VDZW50ZXI6IHRoaXMuYXZlcmFnZUNlbnRlcixcbiAgICAgIGNhbGN1bGF0b3I6IHRoaXMuY2FsY3VsYXRvcixcbiAgICAgIGNsdXN0ZXJDbGFzczogdGhpcy5jbHVzdGVyQ2xhc3MsXG4gICAgICBlbmFibGVSZXRpbmFJY29uczogdGhpcy5lbmFibGVSZXRpbmFJY29ucyxcbiAgICAgIGdyaWRTaXplOiB0aGlzLmdyaWRTaXplLFxuICAgICAgaWdub3JlSGlkZGVuOiB0aGlzLmlnbm9yZUhpZGRlbixcbiAgICAgIGltYWdlRXh0ZW5zaW9uOiB0aGlzLmltYWdlRXh0ZW5zaW9uLFxuICAgICAgaW1hZ2VQYXRoOiB0aGlzLmltYWdlUGF0aCxcbiAgICAgIGltYWdlU2l6ZXM6IHRoaXMuaW1hZ2VTaXplcyxcbiAgICAgIG1heFpvb206IHRoaXMubWF4Wm9vbSxcbiAgICAgIG1pbmltdW1DbHVzdGVyU2l6ZTogdGhpcy5taW5pbXVtQ2x1c3RlclNpemUsXG4gICAgICBzdHlsZXM6IHRoaXMuc3R5bGVzLFxuICAgICAgdGl0bGU6IHRoaXMudGl0bGUsXG4gICAgICB6b29tT25DbGljazogdGhpcy56b29tT25DbGljayxcbiAgICB9KTtcbiAgfVxufVxuIl19