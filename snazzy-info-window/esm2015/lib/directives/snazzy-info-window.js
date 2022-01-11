import { AgmMarker, GoogleMapsAPIWrapper, MapsAPILoader, MarkerManager } from '@agm/core';
import { Component, ContentChild, ElementRef, EventEmitter, Host, Input, Optional, Output, SkipSelf, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
export class AgmSnazzyInfoWindow {
    constructor(_marker, _wrapper, _manager, _loader) {
        this._marker = _marker;
        this._wrapper = _wrapper;
        this._manager = _manager;
        this._loader = _loader;
        /**
         * Changes the open status of the snazzy info window.
         */
        this.isOpen = false;
        /**
         * Emits when the open status changes.
         */
        this.isOpenChange = new EventEmitter();
        /**
         * Choose where you want the info window to be displayed, relative to the marker.
         */
        this.placement = 'top';
        /**
         * The max width in pixels of the info window.
         */
        this.maxWidth = 200;
        /**
         * The max height in pixels of the info window.
         */
        this.maxHeight = 200;
        /**
         * Determines if the info window will open when the marker is clicked.
         * An internal listener is added to the Google Maps click event which calls the open() method.
         */
        this.openOnMarkerClick = true;
        /**
         * Determines if the info window will close when the map is clicked. An internal listener is added to
         * the Google Maps click event which calls the close() method.
         * This will not activate on the Google Maps drag event when the user is panning the map.
         */
        this.closeOnMapClick = true;
        /**
         * Determines if the info window will close when any other Snazzy Info Window is opened.
         */
        this.closeWhenOthersOpen = false;
        /**
         * Determines if the info window will show a close button.
         */
        this.showCloseButton = true;
        /**
         * Determines if the info window will be panned into view when opened.
         */
        this.panOnOpen = true;
        /**
         * Emits before the info window opens.
         */
        this.beforeOpen = new EventEmitter();
        /**
         * Emits before the info window closes.
         */
        this.afterClose = new EventEmitter();
        this._snazzyInfoWindowInitialized = null;
    }
    /**
     * @internal
     */
    ngOnChanges(changes) {
        if (this._nativeSnazzyInfoWindow == null) {
            return;
        }
        if ('isOpen' in changes && this.isOpen) {
            this._openInfoWindow();
        }
        else if ('isOpen' in changes && !this.isOpen) {
            this._closeInfoWindow();
        }
        if (('latitude' in changes || 'longitude' in changes) && this._marker == null) {
            this._updatePosition();
        }
    }
    /**
     * @internal
     */
    ngAfterViewInit() {
        const m = this._manager != null ? this._manager.getNativeMarker(this._marker) : null;
        this._snazzyInfoWindowInitialized = this._loader.load()
            .then(() => require('snazzy-info-window'))
            .then((module) => Promise.all([module, m, this._wrapper.getNativeMap()]))
            .then((elems) => {
            const options = {
                map: elems[2],
                content: '',
                placement: this.placement,
                maxWidth: this.maxWidth,
                maxHeight: this.maxHeight,
                backgroundColor: this.backgroundColor,
                padding: this.padding,
                border: this.border,
                borderRadius: this.borderRadius,
                fontColor: this.fontColor,
                pointer: this.pointer,
                shadow: this.shadow,
                closeOnMapClick: this.closeOnMapClick,
                openOnMarkerClick: this.openOnMarkerClick,
                closeWhenOthersOpen: this.closeWhenOthersOpen,
                showCloseButton: this.showCloseButton,
                panOnOpen: this.panOnOpen,
                wrapperClass: this.wrapperClass,
                callbacks: {
                    beforeOpen: () => {
                        this._createViewContent();
                        this.beforeOpen.emit();
                    },
                    afterOpen: () => {
                        this.isOpenChange.emit(this.openStatus());
                    },
                    afterClose: () => {
                        this.afterClose.emit();
                        this.isOpenChange.emit(this.openStatus());
                    },
                },
            };
            if (elems[1] != null) {
                options.marker = elems[1];
            }
            else {
                options.position = {
                    lat: this.latitude,
                    lng: this.longitude,
                };
            }
            this._nativeSnazzyInfoWindow = new elems[0](options);
        });
        this._snazzyInfoWindowInitialized.then(() => {
            if (this.isOpen) {
                this._openInfoWindow();
            }
        });
    }
    _openInfoWindow() {
        this._snazzyInfoWindowInitialized.then(() => {
            this._createViewContent();
            this._nativeSnazzyInfoWindow.open();
        });
    }
    _closeInfoWindow() {
        this._snazzyInfoWindowInitialized.then(() => {
            this._nativeSnazzyInfoWindow.close();
        });
    }
    _createViewContent() {
        if (this._viewContainerRef.length === 1) {
            return;
        }
        const evr = this._viewContainerRef.createEmbeddedView(this._templateRef);
        this._nativeSnazzyInfoWindow.setContent(this._outerWrapper.nativeElement);
        // we have to run this in a separate cycle.
        setTimeout(() => {
            evr.detectChanges();
        });
    }
    _updatePosition() {
        this._nativeSnazzyInfoWindow.setPosition({
            lat: this.latitude,
            lng: this.longitude,
        });
    }
    /**
     * Returns true when the Snazzy Info Window is initialized and open.
     */
    openStatus() {
        return this._nativeSnazzyInfoWindow && this._nativeSnazzyInfoWindow.isOpen();
    }
    /**
     * @internal
     */
    ngOnDestroy() {
        if (this._nativeSnazzyInfoWindow) {
            this._nativeSnazzyInfoWindow.destroy();
        }
    }
}
AgmSnazzyInfoWindow.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'agm-snazzy-info-window',
                template: '<div #outerWrapper><div #viewContainer></div></div><ng-content></ng-content>'
            },] }
];
AgmSnazzyInfoWindow.ctorParameters = () => [
    { type: AgmMarker, decorators: [{ type: Optional }, { type: Host }, { type: SkipSelf }] },
    { type: GoogleMapsAPIWrapper },
    { type: MarkerManager },
    { type: MapsAPILoader }
];
AgmSnazzyInfoWindow.propDecorators = {
    latitude: [{ type: Input }],
    longitude: [{ type: Input }],
    isOpen: [{ type: Input }],
    isOpenChange: [{ type: Output }],
    placement: [{ type: Input }],
    maxWidth: [{ type: Input }],
    maxHeight: [{ type: Input }],
    backgroundColor: [{ type: Input }],
    padding: [{ type: Input }],
    border: [{ type: Input }],
    borderRadius: [{ type: Input }],
    fontColor: [{ type: Input }],
    fontSize: [{ type: Input }],
    pointer: [{ type: Input }],
    shadow: [{ type: Input }],
    openOnMarkerClick: [{ type: Input }],
    closeOnMapClick: [{ type: Input }],
    wrapperClass: [{ type: Input }],
    closeWhenOthersOpen: [{ type: Input }],
    showCloseButton: [{ type: Input }],
    panOnOpen: [{ type: Input }],
    beforeOpen: [{ type: Output }],
    afterClose: [{ type: Output }],
    _outerWrapper: [{ type: ViewChild, args: ['outerWrapper', { read: ElementRef, static: false },] }],
    _viewContainerRef: [{ type: ViewChild, args: ['viewContainer', { read: ViewContainerRef, static: false },] }],
    _templateRef: [{ type: ContentChild, args: [TemplateRef, { static: false },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25henp5LWluZm8td2luZG93LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvc25henp5LWluZm8td2luZG93L3NyYy9saWIvZGlyZWN0aXZlcy9zbmF6enktaW5mby13aW5kb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzFGLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQXdCLFFBQVEsRUFBRSxNQUFNLEVBQWlCLFFBQVEsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBU3pOLE1BQU0sT0FBTyxtQkFBbUI7SUFnSjlCLFlBQzBDLE9BQWtCLEVBQ2xELFFBQThCLEVBQzlCLFFBQXVCLEVBQ3ZCLE9BQXNCO1FBSFUsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQUNsRCxhQUFRLEdBQVIsUUFBUSxDQUFzQjtRQUM5QixhQUFRLEdBQVIsUUFBUSxDQUFlO1FBQ3ZCLFlBQU8sR0FBUCxPQUFPLENBQWU7UUF2SWhDOztXQUVHO1FBQ00sV0FBTSxHQUFHLEtBQUssQ0FBQztRQUV4Qjs7V0FFRztRQUNPLGlCQUFZLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFFNUU7O1dBRUc7UUFDTSxjQUFTLEdBQXdDLEtBQUssQ0FBQztRQUVoRTs7V0FFRztRQUNNLGFBQVEsR0FBb0IsR0FBRyxDQUFDO1FBRXpDOztXQUVHO1FBQ00sY0FBUyxHQUFvQixHQUFHLENBQUM7UUE4QzFDOzs7V0FHRztRQUNNLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUVsQzs7OztXQUlHO1FBQ00sb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFRaEM7O1dBRUc7UUFDTSx3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFFckM7O1dBRUc7UUFDTSxvQkFBZSxHQUFHLElBQUksQ0FBQztRQUVoQzs7V0FFRztRQUNNLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFMUI7O1dBRUc7UUFDTyxlQUFVLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7UUFFcEU7O1dBRUc7UUFDTyxlQUFVLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7UUFrQjFELGlDQUE0QixHQUF3QixJQUFJLENBQUM7SUFPaEUsQ0FBQztJQUVKOztPQUVHO0lBQ0gsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksSUFBSSxDQUFDLHVCQUF1QixJQUFJLElBQUksRUFBRTtZQUN4QyxPQUFPO1NBQ1I7UUFDRCxJQUFJLFFBQVEsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN0QyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDeEI7YUFBTSxJQUFJLFFBQVEsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzlDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsSUFBSSxDQUFDLFVBQVUsSUFBSSxPQUFPLElBQUksV0FBVyxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1lBQzdFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN4QjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILGVBQWU7UUFDYixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDckYsSUFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO2FBQ3BELElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQzthQUN6QyxJQUFJLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzdFLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2QsTUFBTSxPQUFPLEdBQVE7Z0JBQ25CLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNiLE9BQU8sRUFBRSxFQUFFO2dCQUNYLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0JBQ3pCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtnQkFDckMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNyQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtnQkFDL0IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO2dCQUN6QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ3JCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO2dCQUNyQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCO2dCQUN6QyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CO2dCQUM3QyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7Z0JBQ3JDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDekIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO2dCQUMvQixTQUFTLEVBQUU7b0JBQ1QsVUFBVSxFQUFFLEdBQUcsRUFBRTt3QkFDZixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzt3QkFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDekIsQ0FBQztvQkFDRCxTQUFTLEVBQUUsR0FBRyxFQUFFO3dCQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO29CQUM1QyxDQUFDO29CQUNELFVBQVUsRUFBRSxHQUFHLEVBQUU7d0JBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7b0JBQzVDLENBQUM7aUJBQ0Y7YUFDRixDQUFDO1lBQ0YsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFO2dCQUNwQixPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMzQjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsUUFBUSxHQUFHO29CQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVE7b0JBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUztpQkFDcEIsQ0FBQzthQUNIO1lBQ0QsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO1FBQ0wsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDeEMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNmLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzthQUN4QjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVTLGVBQWU7UUFDdkIsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDMUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVTLGdCQUFnQjtRQUN4QixJQUFJLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUMxQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVMsa0JBQWtCO1FBQzFCLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdkMsT0FBTztTQUNSO1FBQ0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDMUUsMkNBQTJDO1FBQzNDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVMsZUFBZTtRQUN2QixJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxDQUFDO1lBQ3ZDLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUNsQixHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDcEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixJQUFJLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMvRSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDaEMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQzs7O1lBdFJGLFNBQVMsU0FBQztnQkFDVCw4Q0FBOEM7Z0JBQzlDLFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLFFBQVEsRUFBRSw4RUFBOEU7YUFDekY7OztZQVRRLFNBQVMsdUJBMkpiLFFBQVEsWUFBSSxJQUFJLFlBQUksUUFBUTtZQTNKYixvQkFBb0I7WUFBaUIsYUFBYTtZQUE1QixhQUFhOzs7dUJBZXBELEtBQUs7d0JBTUwsS0FBSztxQkFLTCxLQUFLOzJCQUtMLE1BQU07d0JBS04sS0FBSzt1QkFLTCxLQUFLO3dCQUtMLEtBQUs7OEJBS0wsS0FBSztzQkFLTCxLQUFLO3FCQU1MLEtBQUs7MkJBS0wsS0FBSzt3QkFLTCxLQUFLO3VCQUtMLEtBQUs7c0JBT0wsS0FBSztxQkFNTCxLQUFLO2dDQU1MLEtBQUs7OEJBT0wsS0FBSzsyQkFNTCxLQUFLO2tDQUtMLEtBQUs7OEJBS0wsS0FBSzt3QkFLTCxLQUFLO3lCQUtMLE1BQU07eUJBS04sTUFBTTs0QkFLTixTQUFTLFNBQUMsY0FBYyxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDO2dDQUszRCxTQUFTLFNBQUMsZUFBZSxFQUFFLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUM7MkJBS2xFLFlBQVksU0FBQyxXQUFXLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWdtTWFya2VyLCBHb29nbGVNYXBzQVBJV3JhcHBlciwgTWFwc0FQSUxvYWRlciwgTWFya2VyTWFuYWdlciB9IGZyb20gJ0BhZ20vY29yZSc7XG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsIFNraXBTZWxmLCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmRlY2xhcmUgdmFyIHJlcXVpcmU6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdhZ20tc25henp5LWluZm8td2luZG93JyxcbiAgdGVtcGxhdGU6ICc8ZGl2ICNvdXRlcldyYXBwZXI+PGRpdiAjdmlld0NvbnRhaW5lcj48L2Rpdj48L2Rpdj48bmctY29udGVudD48L25nLWNvbnRlbnQ+Jyxcbn0pXG5leHBvcnQgY2xhc3MgQWdtU25henp5SW5mb1dpbmRvdyBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIFRoZSBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIHdoZXJlIHRoZSBpbmZvIHdpbmRvdyBpcyBhbmNob3JlZC5cbiAgICogVGhlIG9mZnNldCB3aWxsIGRlZmF1bHQgdG8gMHB4IHdoZW4gdXNpbmcgdGhpcyBvcHRpb24uIE9ubHkgcmVxdWlyZWQvdXNlZCBpZiB5b3UgYXJlIG5vdCB1c2luZyBhIGFnbS1tYXJrZXIuXG4gICAqL1xuICBASW5wdXQoKSBsYXRpdHVkZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgbG9uZ2l0dWRlIHdoZXJlIHRoZSBpbmZvIHdpbmRvdyBpcyBhbmNob3JlZC5cbiAgICogVGhlIG9mZnNldCB3aWxsIGRlZmF1bHQgdG8gMHB4IHdoZW4gdXNpbmcgdGhpcyBvcHRpb24uIE9ubHkgcmVxdWlyZWQvdXNlZCBpZiB5b3UgYXJlIG5vdCB1c2luZyBhIGFnbS1tYXJrZXIuXG4gICAqL1xuICBASW5wdXQoKSBsb25naXR1ZGU6IG51bWJlcjtcblxuICAvKipcbiAgICogQ2hhbmdlcyB0aGUgb3BlbiBzdGF0dXMgb2YgdGhlIHNuYXp6eSBpbmZvIHdpbmRvdy5cbiAgICovXG4gIEBJbnB1dCgpIGlzT3BlbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRoZSBvcGVuIHN0YXR1cyBjaGFuZ2VzLlxuICAgKi9cbiAgQE91dHB1dCgpIGlzT3BlbkNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8qKlxuICAgKiBDaG9vc2Ugd2hlcmUgeW91IHdhbnQgdGhlIGluZm8gd2luZG93IHRvIGJlIGRpc3BsYXllZCwgcmVsYXRpdmUgdG8gdGhlIG1hcmtlci5cbiAgICovXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogJ3RvcCcgfCAnYm90dG9tJyB8ICdsZWZ0JyB8ICdyaWdodCcgPSAndG9wJztcblxuICAvKipcbiAgICogVGhlIG1heCB3aWR0aCBpbiBwaXhlbHMgb2YgdGhlIGluZm8gd2luZG93LlxuICAgKi9cbiAgQElucHV0KCkgbWF4V2lkdGg6IG51bWJlciB8IHN0cmluZyA9IDIwMDtcblxuICAvKipcbiAgICogVGhlIG1heCBoZWlnaHQgaW4gcGl4ZWxzIG9mIHRoZSBpbmZvIHdpbmRvdy5cbiAgICovXG4gIEBJbnB1dCgpIG1heEhlaWdodDogbnVtYmVyIHwgc3RyaW5nID0gMjAwO1xuXG4gIC8qKlxuICAgKiBUaGUgY29sb3IgdG8gdXNlIGZvciB0aGUgYmFja2dyb3VuZCBvZiB0aGUgaW5mbyB3aW5kb3cuXG4gICAqL1xuICBASW5wdXQoKSBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcblxuICAvKipcbiAgICogQSBjdXN0b20gcGFkZGluZyBzaXplIGFyb3VuZCB0aGUgY29udGVudCBvZiB0aGUgaW5mbyB3aW5kb3cuXG4gICAqL1xuICBASW5wdXQoKSBwYWRkaW5nOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIGJvcmRlciBhcm91bmQgdGhlIGluZm8gd2luZG93LiBTZXQgdG8gZmFsc2UgdG8gY29tcGxldGVseSByZW1vdmUgdGhlIGJvcmRlci5cbiAgICogVGhlIHVuaXRzIHVzZWQgZm9yIGJvcmRlciBzaG91bGQgYmUgdGhlIHNhbWUgYXMgcG9pbnRlci5cbiAgICovXG4gIEBJbnB1dCgpIGJvcmRlcjoge3dpZHRoOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmd9IHwgYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBjdXN0b20gQ1NTIGJvcmRlciByYWRpdXMgcHJvcGVydHkgdG8gc3BlY2lmeSB0aGUgcm91bmRlZCBjb3JuZXJzIG9mIHRoZSBpbmZvIHdpbmRvdy5cbiAgICovXG4gIEBJbnB1dCgpIGJvcmRlclJhZGl1czogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZm9udCBjb2xvciB0byB1c2UgZm9yIHRoZSBjb250ZW50IGluc2lkZSB0aGUgYm9keSBvZiB0aGUgaW5mbyB3aW5kb3cuXG4gICAqL1xuICBASW5wdXQoKSBmb250Q29sb3I6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGZvbnQgc2l6ZSB0byB1c2UgZm9yIHRoZSBjb250ZW50IGluc2lkZSB0aGUgYm9keSBvZiB0aGUgaW5mbyB3aW5kb3cuXG4gICAqL1xuICBASW5wdXQoKSBmb250U2l6ZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSBwb2ludGVyIGZyb20gdGhlIGluZm8gd2luZG93IHRvIHRoZSBtYXJrZXIuXG4gICAqIFNldCB0byBmYWxzZSB0byBjb21wbGV0ZWx5IHJlbW92ZSB0aGUgcG9pbnRlci5cbiAgICogVGhlIHVuaXRzIHVzZWQgZm9yIHBvaW50ZXIgc2hvdWxkIGJlIHRoZSBzYW1lIGFzIGJvcmRlci5cbiAgICovXG4gIEBJbnB1dCgpIHBvaW50ZXI6IHN0cmluZyB8IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBDU1MgcHJvcGVydGllcyBmb3IgdGhlIHNoYWRvdyBvZiB0aGUgaW5mbyB3aW5kb3cuXG4gICAqIFNldCB0byBmYWxzZSB0byBjb21wbGV0ZWx5IHJlbW92ZSB0aGUgc2hhZG93LlxuICAgKi9cbiAgQElucHV0KCkgc2hhZG93OiBib29sZWFuIHwge2g/OiBzdHJpbmcsIHY/OiBzdHJpbmcsIGJsdXI6IHN0cmluZywgc3ByZWFkOiBzdHJpbmcsIG9wYWNpdHk6IG51bWJlciwgY29sb3I6IHN0cmluZ307XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgdGhlIGluZm8gd2luZG93IHdpbGwgb3BlbiB3aGVuIHRoZSBtYXJrZXIgaXMgY2xpY2tlZC5cbiAgICogQW4gaW50ZXJuYWwgbGlzdGVuZXIgaXMgYWRkZWQgdG8gdGhlIEdvb2dsZSBNYXBzIGNsaWNrIGV2ZW50IHdoaWNoIGNhbGxzIHRoZSBvcGVuKCkgbWV0aG9kLlxuICAgKi9cbiAgQElucHV0KCkgb3Blbk9uTWFya2VyQ2xpY2sgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBpbmZvIHdpbmRvdyB3aWxsIGNsb3NlIHdoZW4gdGhlIG1hcCBpcyBjbGlja2VkLiBBbiBpbnRlcm5hbCBsaXN0ZW5lciBpcyBhZGRlZCB0b1xuICAgKiB0aGUgR29vZ2xlIE1hcHMgY2xpY2sgZXZlbnQgd2hpY2ggY2FsbHMgdGhlIGNsb3NlKCkgbWV0aG9kLlxuICAgKiBUaGlzIHdpbGwgbm90IGFjdGl2YXRlIG9uIHRoZSBHb29nbGUgTWFwcyBkcmFnIGV2ZW50IHdoZW4gdGhlIHVzZXIgaXMgcGFubmluZyB0aGUgbWFwLlxuICAgKi9cbiAgQElucHV0KCkgY2xvc2VPbk1hcENsaWNrID0gdHJ1ZTtcblxuICAvKipcbiAgICogQW4gb3B0aW9uYWwgQ1NTIGNsYXNzIHRvIGFzc2lnbiB0byB0aGUgd3JhcHBlciBjb250YWluZXIgb2YgdGhlIGluZm8gd2luZG93LlxuICAgKiBDYW4gYmUgdXNlZCBmb3IgYXBwbHlpbmcgY3VzdG9tIENTUyB0byB0aGUgaW5mbyB3aW5kb3cuXG4gICAqL1xuICBASW5wdXQoKSB3cmFwcGVyQ2xhc3M6IHN0cmluZztcblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiB0aGUgaW5mbyB3aW5kb3cgd2lsbCBjbG9zZSB3aGVuIGFueSBvdGhlciBTbmF6enkgSW5mbyBXaW5kb3cgaXMgb3BlbmVkLlxuICAgKi9cbiAgQElucHV0KCkgY2xvc2VXaGVuT3RoZXJzT3BlbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBpbmZvIHdpbmRvdyB3aWxsIHNob3cgYSBjbG9zZSBidXR0b24uXG4gICAqL1xuICBASW5wdXQoKSBzaG93Q2xvc2VCdXR0b24gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBpbmZvIHdpbmRvdyB3aWxsIGJlIHBhbm5lZCBpbnRvIHZpZXcgd2hlbiBvcGVuZWQuXG4gICAqL1xuICBASW5wdXQoKSBwYW5Pbk9wZW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBiZWZvcmUgdGhlIGluZm8gd2luZG93IG9wZW5zLlxuICAgKi9cbiAgQE91dHB1dCgpIGJlZm9yZU9wZW46IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKipcbiAgICogRW1pdHMgYmVmb3JlIHRoZSBpbmZvIHdpbmRvdyBjbG9zZXMuXG4gICAqL1xuICBAT3V0cHV0KCkgYWZ0ZXJDbG9zZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ291dGVyV3JhcHBlcicsIHtyZWFkOiBFbGVtZW50UmVmLCBzdGF0aWM6IGZhbHNlfSkgX291dGVyV3JhcHBlcjogRWxlbWVudFJlZjtcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBAVmlld0NoaWxkKCd2aWV3Q29udGFpbmVyJywge3JlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogZmFsc2V9KSBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZjtcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmLCB7c3RhdGljOiBmYWxzZX0pIF90ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PjtcblxuICBwcm90ZWN0ZWQgX25hdGl2ZVNuYXp6eUluZm9XaW5kb3c6IGFueTtcbiAgcHJvdGVjdGVkIF9zbmF6enlJbmZvV2luZG93SW5pdGlhbGl6ZWQ6IFByb21pc2U8YW55PiB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBIb3N0KCkgQFNraXBTZWxmKCkgcHJpdmF0ZSBfbWFya2VyOiBBZ21NYXJrZXIsXG4gICAgcHJpdmF0ZSBfd3JhcHBlcjogR29vZ2xlTWFwc0FQSVdyYXBwZXIsXG4gICAgcHJpdmF0ZSBfbWFuYWdlcjogTWFya2VyTWFuYWdlcixcbiAgICBwcml2YXRlIF9sb2FkZXI6IE1hcHNBUElMb2FkZXIsXG4gICkge31cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKHRoaXMuX25hdGl2ZVNuYXp6eUluZm9XaW5kb3cgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoJ2lzT3BlbicgaW4gY2hhbmdlcyAmJiB0aGlzLmlzT3Blbikge1xuICAgICAgdGhpcy5fb3BlbkluZm9XaW5kb3coKTtcbiAgICB9IGVsc2UgaWYgKCdpc09wZW4nIGluIGNoYW5nZXMgJiYgIXRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLl9jbG9zZUluZm9XaW5kb3coKTtcbiAgICB9XG4gICAgaWYgKCgnbGF0aXR1ZGUnIGluIGNoYW5nZXMgfHwgJ2xvbmdpdHVkZScgaW4gY2hhbmdlcykgJiYgdGhpcy5fbWFya2VyID09IG51bGwpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZVBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IG0gPSB0aGlzLl9tYW5hZ2VyICE9IG51bGwgPyB0aGlzLl9tYW5hZ2VyLmdldE5hdGl2ZU1hcmtlcih0aGlzLl9tYXJrZXIpIDogbnVsbDtcbiAgICB0aGlzLl9zbmF6enlJbmZvV2luZG93SW5pdGlhbGl6ZWQgPSB0aGlzLl9sb2FkZXIubG9hZCgpXG4gICAgICAudGhlbigoKSA9PiByZXF1aXJlKCdzbmF6enktaW5mby13aW5kb3cnKSlcbiAgICAgIC50aGVuKChtb2R1bGU6IGFueSkgPT4gUHJvbWlzZS5hbGwoW21vZHVsZSwgbSwgdGhpcy5fd3JhcHBlci5nZXROYXRpdmVNYXAoKV0pKVxuICAgICAgLnRoZW4oKGVsZW1zKSA9PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IGFueSA9IHtcbiAgICAgICAgICBtYXA6IGVsZW1zWzJdLFxuICAgICAgICAgIGNvbnRlbnQ6ICcnLFxuICAgICAgICAgIHBsYWNlbWVudDogdGhpcy5wbGFjZW1lbnQsXG4gICAgICAgICAgbWF4V2lkdGg6IHRoaXMubWF4V2lkdGgsXG4gICAgICAgICAgbWF4SGVpZ2h0OiB0aGlzLm1heEhlaWdodCxcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmFja2dyb3VuZENvbG9yLFxuICAgICAgICAgIHBhZGRpbmc6IHRoaXMucGFkZGluZyxcbiAgICAgICAgICBib3JkZXI6IHRoaXMuYm9yZGVyLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogdGhpcy5ib3JkZXJSYWRpdXMsXG4gICAgICAgICAgZm9udENvbG9yOiB0aGlzLmZvbnRDb2xvcixcbiAgICAgICAgICBwb2ludGVyOiB0aGlzLnBvaW50ZXIsXG4gICAgICAgICAgc2hhZG93OiB0aGlzLnNoYWRvdyxcbiAgICAgICAgICBjbG9zZU9uTWFwQ2xpY2s6IHRoaXMuY2xvc2VPbk1hcENsaWNrLFxuICAgICAgICAgIG9wZW5Pbk1hcmtlckNsaWNrOiB0aGlzLm9wZW5Pbk1hcmtlckNsaWNrLFxuICAgICAgICAgIGNsb3NlV2hlbk90aGVyc09wZW46IHRoaXMuY2xvc2VXaGVuT3RoZXJzT3BlbixcbiAgICAgICAgICBzaG93Q2xvc2VCdXR0b246IHRoaXMuc2hvd0Nsb3NlQnV0dG9uLFxuICAgICAgICAgIHBhbk9uT3BlbjogdGhpcy5wYW5Pbk9wZW4sXG4gICAgICAgICAgd3JhcHBlckNsYXNzOiB0aGlzLndyYXBwZXJDbGFzcyxcbiAgICAgICAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgICAgIGJlZm9yZU9wZW46ICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlVmlld0NvbnRlbnQoKTtcbiAgICAgICAgICAgICAgdGhpcy5iZWZvcmVPcGVuLmVtaXQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZnRlck9wZW46ICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pc09wZW5DaGFuZ2UuZW1pdCh0aGlzLm9wZW5TdGF0dXMoKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWZ0ZXJDbG9zZTogKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmFmdGVyQ2xvc2UuZW1pdCgpO1xuICAgICAgICAgICAgICB0aGlzLmlzT3BlbkNoYW5nZS5lbWl0KHRoaXMub3BlblN0YXR1cygpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGVsZW1zWzFdICE9IG51bGwpIHtcbiAgICAgICAgICBvcHRpb25zLm1hcmtlciA9IGVsZW1zWzFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMucG9zaXRpb24gPSB7XG4gICAgICAgICAgICBsYXQ6IHRoaXMubGF0aXR1ZGUsXG4gICAgICAgICAgICBsbmc6IHRoaXMubG9uZ2l0dWRlLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbmF0aXZlU25henp5SW5mb1dpbmRvdyA9IG5ldyBlbGVtc1swXShvcHRpb25zKTtcbiAgICAgIH0pO1xuICAgIHRoaXMuX3NuYXp6eUluZm9XaW5kb3dJbml0aWFsaXplZC50aGVuKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgdGhpcy5fb3BlbkluZm9XaW5kb3coKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9vcGVuSW5mb1dpbmRvdygpIHtcbiAgICB0aGlzLl9zbmF6enlJbmZvV2luZG93SW5pdGlhbGl6ZWQudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLl9jcmVhdGVWaWV3Q29udGVudCgpO1xuICAgICAgdGhpcy5fbmF0aXZlU25henp5SW5mb1dpbmRvdy5vcGVuKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2Nsb3NlSW5mb1dpbmRvdygpIHtcbiAgICB0aGlzLl9zbmF6enlJbmZvV2luZG93SW5pdGlhbGl6ZWQudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLl9uYXRpdmVTbmF6enlJbmZvV2luZG93LmNsb3NlKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NyZWF0ZVZpZXdDb250ZW50KCkge1xuICAgIGlmICh0aGlzLl92aWV3Q29udGFpbmVyUmVmLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBldnIgPSB0aGlzLl92aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLl90ZW1wbGF0ZVJlZik7XG4gICAgdGhpcy5fbmF0aXZlU25henp5SW5mb1dpbmRvdy5zZXRDb250ZW50KHRoaXMuX291dGVyV3JhcHBlci5uYXRpdmVFbGVtZW50KTtcbiAgICAvLyB3ZSBoYXZlIHRvIHJ1biB0aGlzIGluIGEgc2VwYXJhdGUgY3ljbGUuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBldnIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF91cGRhdGVQb3NpdGlvbigpIHtcbiAgICB0aGlzLl9uYXRpdmVTbmF6enlJbmZvV2luZG93LnNldFBvc2l0aW9uKHtcbiAgICAgIGxhdDogdGhpcy5sYXRpdHVkZSxcbiAgICAgIGxuZzogdGhpcy5sb25naXR1ZGUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIHdoZW4gdGhlIFNuYXp6eSBJbmZvIFdpbmRvdyBpcyBpbml0aWFsaXplZCBhbmQgb3Blbi5cbiAgICovXG4gIG9wZW5TdGF0dXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX25hdGl2ZVNuYXp6eUluZm9XaW5kb3cgJiYgdGhpcy5fbmF0aXZlU25henp5SW5mb1dpbmRvdy5pc09wZW4oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9uYXRpdmVTbmF6enlJbmZvV2luZG93KSB7XG4gICAgICB0aGlzLl9uYXRpdmVTbmF6enlJbmZvV2luZG93LmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==