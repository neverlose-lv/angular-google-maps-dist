import { __awaiter } from "tslib";
import { GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';
import { Injectable, NgZone } from '@angular/core';
import MarkerClusterer from '@google/markerclustererplus';
import { Observable } from 'rxjs';
export class ClusterManager extends MarkerManager {
    constructor(_mapsWrapper, _zone) {
        super(_mapsWrapper, _zone);
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._clustererInstance = new Promise((resolver) => {
            this._resolver = resolver;
        });
    }
    init(options) {
        this._mapsWrapper.getNativeMap().then((map) => {
            const clusterer = new MarkerClusterer(map, [], options);
            this._resolver(clusterer);
        });
    }
    getClustererInstance() {
        return this._clustererInstance;
    }
    addMarker(markerDirective) {
        const clusterPromise = this.getClustererInstance();
        const markerPromise = this._mapsWrapper.createMarker({
            position: {
                lat: markerDirective.latitude,
                lng: markerDirective.longitude,
            },
            label: markerDirective.label,
            draggable: markerDirective.draggable,
            icon: markerDirective.iconUrl,
            opacity: markerDirective.opacity,
            visible: markerDirective.visible,
            zIndex: markerDirective.zIndex,
            title: markerDirective.title,
            clickable: markerDirective.clickable,
        }, false);
        Promise.all([clusterPromise, markerPromise]).then(([cluster, marker]) => cluster.addMarker(marker));
        this._markers.set(markerDirective, markerPromise);
    }
    deleteMarker(marker) {
        const markerPromise = this._markers.get(marker);
        if (markerPromise == null) {
            // marker already deleted
            return Promise.resolve();
        }
        return markerPromise.then((m) => {
            this._zone.run(() => {
                m.setMap(null);
                this.getClustererInstance().then((cluster) => {
                    cluster.removeMarker(m);
                    this._markers.delete(marker);
                });
            });
        });
    }
    getMarkers() {
        return this.getClustererInstance().then((cluster) => {
            return cluster.getMarkers();
        });
    }
    clearMarkers() {
        return this.getClustererInstance().then((cluster) => {
            cluster.clearMarkers();
        });
    }
    setGridSize(c) {
        this.getClustererInstance().then((cluster) => {
            cluster.setGridSize(c.gridSize);
        });
    }
    setMaxZoom(c) {
        this.getClustererInstance().then((cluster) => {
            cluster.setMaxZoom(c.maxZoom);
        });
    }
    setStyles(c) {
        this.getClustererInstance().then((cluster) => {
            cluster.setStyles(c.styles);
        });
    }
    setZoomOnClick(c) {
        this.getClustererInstance().then((cluster) => {
            if (c.zoomOnClick !== undefined) {
                cluster.setZoomOnClick(c.zoomOnClick);
            }
        });
    }
    setAverageCenter(c) {
        this.getClustererInstance().then((cluster) => {
            if (c.averageCenter !== undefined) {
                cluster.setAverageCenter(c.averageCenter);
            }
        });
    }
    setImagePath(c) {
        this.getClustererInstance().then((cluster) => {
            if (c.imagePath !== undefined) {
                cluster.setImagePath(c.imagePath);
            }
        });
    }
    setMinimumClusterSize(c) {
        this.getClustererInstance().then((cluster) => {
            if (c.minimumClusterSize !== undefined) {
                cluster.setMinimumClusterSize(c.minimumClusterSize);
            }
        });
    }
    setImageExtension(c) {
        this.getClustererInstance().then((cluster) => {
            if (c.imageExtension !== undefined) {
                cluster.setImageExtension(c.imageExtension);
            }
        });
    }
    createClusterEventObservable(eventName) {
        return new Observable((subscriber) => {
            this._zone.runOutsideAngular(() => {
                this._clustererInstance.then((m) => {
                    m.addListener(eventName, (e) => this._zone.run(() => subscriber.next(e)));
                });
            });
        });
    }
    setCalculator(c) {
        this.getClustererInstance().then((cluster) => {
            if (typeof c.calculator === 'function') {
                cluster.setCalculator(c.calculator);
            }
        });
    }
    setClusterClass(c) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof c.clusterClass !== 'undefined') {
                const instance = yield this.getClustererInstance();
                instance.setClusterClass(c.clusterClass);
            }
        });
    }
    setEnableRetinaIcons(c) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof c.enableRetinaIcons !== 'undefined') {
                const instance = yield this.getClustererInstance();
                instance.setEnableRetinaIcons(c.enableRetinaIcons);
            }
        });
    }
    setIgnoreHidden(c) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof c.ignoreHidden !== 'undefined') {
                const instance = yield this.getClustererInstance();
                instance.setIgnoreHidden(c.ignoreHidden);
            }
        });
    }
    setImageSizes(c) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof c.imageSizes !== 'undefined') {
                const instance = yield this.getClustererInstance();
                instance.setImageSizes(c.imageSizes);
            }
        });
    }
    setTitle(c) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof c.title !== 'undefined') {
                const instance = yield this.getClustererInstance();
                instance.setTitle(c.title);
            }
        });
    }
}
ClusterManager.decorators = [
    { type: Injectable }
];
ClusterManager.ctorParameters = () => [
    { type: GoogleMapsAPIWrapper },
    { type: NgZone }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbWFya2VyY2x1c3RlcmVyL3NyYy9saWIvc2VydmljZXMvbWFuYWdlcnMvY2x1c3Rlci1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQWEsb0JBQW9CLEVBQUUsYUFBYSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sZUFBZSxNQUFNLDZCQUE2QixDQUFDO0FBQzFELE9BQU8sRUFBRSxVQUFVLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFJOUMsTUFBTSxPQUFPLGNBQWUsU0FBUSxhQUFhO0lBSS9DLFlBQ1ksWUFBa0MsRUFDbEMsS0FBYTtRQUV2QixLQUFLLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBSGpCLGlCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUNsQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBR3ZCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLE9BQU8sQ0FBa0IsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNsRSxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJLENBQUMsT0FBK0I7UUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUM1QyxNQUFNLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsb0JBQW9CO1FBQ2xCLE9B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YUFBYSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN0QztRQUNILENBQUM7S0FBQTtJQUVLLFFBQVEsQ0FBQyxDQUFtQjs7WUFDaEMsSUFBSSxPQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssV0FBVyxFQUFFO2dCQUNsQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2dCQUNuRCxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM1QjtRQUNILENBQUM7S0FBQTs7O1lBak1GLFVBQVU7OztZQVBTLG9CQUFvQjtZQUNuQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWdtTWFya2VyLCBHb29nbGVNYXBzQVBJV3JhcHBlciwgTWFya2VyTWFuYWdlciB9IGZyb20gJ0BhZ20vY29yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hcmtlckNsdXN0ZXJlck9wdGlvbnMgfSBmcm9tICdAZ29vZ2xlL21hcmtlcmNsdXN0ZXJlcnBsdXMnO1xuaW1wb3J0IE1hcmtlckNsdXN0ZXJlciBmcm9tICdAZ29vZ2xlL21hcmtlcmNsdXN0ZXJlcnBsdXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaWJlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQWdtTWFya2VyQ2x1c3RlciB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvbWFya2VyLWNsdXN0ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2x1c3Rlck1hbmFnZXIgZXh0ZW5kcyBNYXJrZXJNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfY2x1c3RlcmVySW5zdGFuY2U6IFByb21pc2U8TWFya2VyQ2x1c3RlcmVyPjtcbiAgcHJpdmF0ZSBfcmVzb2x2ZXI6IChjbHVzdGVyOiBNYXJrZXJDbHVzdGVyZXIpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIF9tYXBzV3JhcHBlcjogR29vZ2xlTWFwc0FQSVdyYXBwZXIsXG4gICAgcHJvdGVjdGVkIF96b25lOiBOZ1pvbmVcbiAgKSB7XG4gICAgc3VwZXIoX21hcHNXcmFwcGVyLCBfem9uZSk7XG4gICAgdGhpcy5fY2x1c3RlcmVySW5zdGFuY2UgPSBuZXcgUHJvbWlzZTxNYXJrZXJDbHVzdGVyZXI+KChyZXNvbHZlcikgPT4ge1xuICAgICAgdGhpcy5fcmVzb2x2ZXIgPSByZXNvbHZlcjtcbiAgICB9KTtcbiAgfVxuXG4gIGluaXQob3B0aW9uczogTWFya2VyQ2x1c3RlcmVyT3B0aW9ucyk6IHZvaWQge1xuICAgIHRoaXMuX21hcHNXcmFwcGVyLmdldE5hdGl2ZU1hcCgpLnRoZW4oKG1hcCkgPT4ge1xuICAgICAgY29uc3QgY2x1c3RlcmVyID0gbmV3IE1hcmtlckNsdXN0ZXJlcihtYXAsIFtdLCBvcHRpb25zKTtcbiAgICAgIHRoaXMuX3Jlc29sdmVyKGNsdXN0ZXJlcik7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDbHVzdGVyZXJJbnN0YW5jZSgpOiBQcm9taXNlPE1hcmtlckNsdXN0ZXJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9jbHVzdGVyZXJJbnN0YW5jZTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJEaXJlY3RpdmU6IEFnbU1hcmtlcik6IHZvaWQge1xuICAgIGNvbnN0IGNsdXN0ZXJQcm9taXNlOiBQcm9taXNlPE1hcmtlckNsdXN0ZXJlcj4gPVxuICAgICAgdGhpcy5nZXRDbHVzdGVyZXJJbnN0YW5jZSgpO1xuICAgIGNvbnN0IG1hcmtlclByb21pc2UgPSB0aGlzLl9tYXBzV3JhcHBlci5jcmVhdGVNYXJrZXIoXG4gICAgICB7XG4gICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgbGF0OiBtYXJrZXJEaXJlY3RpdmUubGF0aXR1ZGUsXG4gICAgICAgICAgbG5nOiBtYXJrZXJEaXJlY3RpdmUubG9uZ2l0dWRlLFxuICAgICAgICB9LFxuICAgICAgICBsYWJlbDogbWFya2VyRGlyZWN0aXZlLmxhYmVsLFxuICAgICAgICBkcmFnZ2FibGU6IG1hcmtlckRpcmVjdGl2ZS5kcmFnZ2FibGUsXG4gICAgICAgIGljb246IG1hcmtlckRpcmVjdGl2ZS5pY29uVXJsLFxuICAgICAgICBvcGFjaXR5OiBtYXJrZXJEaXJlY3RpdmUub3BhY2l0eSxcbiAgICAgICAgdmlzaWJsZTogbWFya2VyRGlyZWN0aXZlLnZpc2libGUsXG4gICAgICAgIHpJbmRleDogbWFya2VyRGlyZWN0aXZlLnpJbmRleCxcbiAgICAgICAgdGl0bGU6IG1hcmtlckRpcmVjdGl2ZS50aXRsZSxcbiAgICAgICAgY2xpY2thYmxlOiBtYXJrZXJEaXJlY3RpdmUuY2xpY2thYmxlLFxuICAgICAgfSxcbiAgICAgIGZhbHNlXG4gICAgKTtcblxuICAgIFByb21pc2UuYWxsKFtjbHVzdGVyUHJvbWlzZSwgbWFya2VyUHJvbWlzZV0pLnRoZW4oKFtjbHVzdGVyLCBtYXJrZXJdKSA9PlxuICAgICAgY2x1c3Rlci5hZGRNYXJrZXIobWFya2VyKVxuICAgICk7XG4gICAgdGhpcy5fbWFya2Vycy5zZXQobWFya2VyRGlyZWN0aXZlLCBtYXJrZXJQcm9taXNlKTtcbiAgfVxuXG4gIGRlbGV0ZU1hcmtlcihtYXJrZXI6IEFnbU1hcmtlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG1hcmtlclByb21pc2UgPSB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpO1xuICAgIGlmIChtYXJrZXJQcm9taXNlID09IG51bGwpIHtcbiAgICAgIC8vIG1hcmtlciBhbHJlYWR5IGRlbGV0ZWRcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIG1hcmtlclByb21pc2UudGhlbigobTogZ29vZ2xlLm1hcHMuTWFya2VyKSA9PiB7XG4gICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICAgIG0uc2V0TWFwKG51bGwpO1xuICAgICAgICB0aGlzLmdldENsdXN0ZXJlckluc3RhbmNlKCkudGhlbigoY2x1c3RlcikgPT4ge1xuICAgICAgICAgIGNsdXN0ZXIucmVtb3ZlTWFya2VyKG0pO1xuICAgICAgICAgIHRoaXMuX21hcmtlcnMuZGVsZXRlKG1hcmtlcik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRNYXJrZXJzKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKChjbHVzdGVyOiBNYXJrZXJDbHVzdGVyZXIpID0+IHtcbiAgICAgIHJldHVybiBjbHVzdGVyLmdldE1hcmtlcnMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsZWFyTWFya2VycygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRDbHVzdGVyZXJJbnN0YW5jZSgpLnRoZW4oKGNsdXN0ZXIpID0+IHtcbiAgICAgIGNsdXN0ZXIuY2xlYXJNYXJrZXJzKCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRHcmlkU2l6ZShjOiBBZ21NYXJrZXJDbHVzdGVyKTogdm9pZCB7XG4gICAgdGhpcy5nZXRDbHVzdGVyZXJJbnN0YW5jZSgpLnRoZW4oKGNsdXN0ZXIpID0+IHtcbiAgICAgIGNsdXN0ZXIuc2V0R3JpZFNpemUoYy5ncmlkU2l6ZSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRNYXhab29tKGM6IEFnbU1hcmtlckNsdXN0ZXIpOiB2b2lkIHtcbiAgICB0aGlzLmdldENsdXN0ZXJlckluc3RhbmNlKCkudGhlbigoY2x1c3RlcikgPT4ge1xuICAgICAgY2x1c3Rlci5zZXRNYXhab29tKGMubWF4Wm9vbSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRTdHlsZXMoYzogQWdtTWFya2VyQ2x1c3Rlcik6IHZvaWQge1xuICAgIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKChjbHVzdGVyKSA9PiB7XG4gICAgICBjbHVzdGVyLnNldFN0eWxlcyhjLnN0eWxlcyk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRab29tT25DbGljayhjOiBBZ21NYXJrZXJDbHVzdGVyKTogdm9pZCB7XG4gICAgdGhpcy5nZXRDbHVzdGVyZXJJbnN0YW5jZSgpLnRoZW4oKGNsdXN0ZXIpID0+IHtcbiAgICAgIGlmIChjLnpvb21PbkNsaWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2x1c3Rlci5zZXRab29tT25DbGljayhjLnpvb21PbkNsaWNrKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldEF2ZXJhZ2VDZW50ZXIoYzogQWdtTWFya2VyQ2x1c3Rlcik6IHZvaWQge1xuICAgIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKChjbHVzdGVyKSA9PiB7XG4gICAgICBpZiAoYy5hdmVyYWdlQ2VudGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2x1c3Rlci5zZXRBdmVyYWdlQ2VudGVyKGMuYXZlcmFnZUNlbnRlcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRJbWFnZVBhdGgoYzogQWdtTWFya2VyQ2x1c3Rlcik6IHZvaWQge1xuICAgIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKChjbHVzdGVyKSA9PiB7XG4gICAgICBpZiAoYy5pbWFnZVBhdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjbHVzdGVyLnNldEltYWdlUGF0aChjLmltYWdlUGF0aCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRNaW5pbXVtQ2x1c3RlclNpemUoYzogQWdtTWFya2VyQ2x1c3Rlcik6IHZvaWQge1xuICAgIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKChjbHVzdGVyKSA9PiB7XG4gICAgICBpZiAoYy5taW5pbXVtQ2x1c3RlclNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjbHVzdGVyLnNldE1pbmltdW1DbHVzdGVyU2l6ZShjLm1pbmltdW1DbHVzdGVyU2l6ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRJbWFnZUV4dGVuc2lvbihjOiBBZ21NYXJrZXJDbHVzdGVyKTogdm9pZCB7XG4gICAgdGhpcy5nZXRDbHVzdGVyZXJJbnN0YW5jZSgpLnRoZW4oKGNsdXN0ZXIpID0+IHtcbiAgICAgIGlmIChjLmltYWdlRXh0ZW5zaW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2x1c3Rlci5zZXRJbWFnZUV4dGVuc2lvbihjLmltYWdlRXh0ZW5zaW9uKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZUNsdXN0ZXJFdmVudE9ic2VydmFibGU8VD4oZXZlbnROYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pID0+IHtcbiAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLl9jbHVzdGVyZXJJbnN0YW5jZS50aGVuKChtOiBNYXJrZXJDbHVzdGVyZXIpID0+IHtcbiAgICAgICAgICBtLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKGU6IFQpID0+XG4gICAgICAgICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiBzdWJzY3JpYmVyLm5leHQoZSkpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldENhbGN1bGF0b3IoYzogQWdtTWFya2VyQ2x1c3Rlcik6IHZvaWQge1xuICAgIHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKS50aGVuKChjbHVzdGVyKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGMuY2FsY3VsYXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjbHVzdGVyLnNldENhbGN1bGF0b3IoYy5jYWxjdWxhdG9yKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHNldENsdXN0ZXJDbGFzcyhjOiBBZ21NYXJrZXJDbHVzdGVyKSB7XG4gICAgaWYgKHR5cGVvZiBjLmNsdXN0ZXJDbGFzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gYXdhaXQgdGhpcy5nZXRDbHVzdGVyZXJJbnN0YW5jZSgpO1xuICAgICAgaW5zdGFuY2Uuc2V0Q2x1c3RlckNsYXNzKGMuY2x1c3RlckNsYXNzKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzZXRFbmFibGVSZXRpbmFJY29ucyhjOiBBZ21NYXJrZXJDbHVzdGVyKSB7XG4gICAgaWYgKHR5cGVvZiBjLmVuYWJsZVJldGluYUljb25zICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc3QgaW5zdGFuY2UgPSBhd2FpdCB0aGlzLmdldENsdXN0ZXJlckluc3RhbmNlKCk7XG4gICAgICBpbnN0YW5jZS5zZXRFbmFibGVSZXRpbmFJY29ucyhjLmVuYWJsZVJldGluYUljb25zKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzZXRJZ25vcmVIaWRkZW4oYzogQWdtTWFya2VyQ2x1c3Rlcikge1xuICAgIGlmICh0eXBlb2YgYy5pZ25vcmVIaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBpbnN0YW5jZSA9IGF3YWl0IHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKTtcbiAgICAgIGluc3RhbmNlLnNldElnbm9yZUhpZGRlbihjLmlnbm9yZUhpZGRlbik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgc2V0SW1hZ2VTaXplcyhjOiBBZ21NYXJrZXJDbHVzdGVyKSB7XG4gICAgaWYgKHR5cGVvZiBjLmltYWdlU2l6ZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBpbnN0YW5jZSA9IGF3YWl0IHRoaXMuZ2V0Q2x1c3RlcmVySW5zdGFuY2UoKTtcbiAgICAgIGluc3RhbmNlLnNldEltYWdlU2l6ZXMoYy5pbWFnZVNpemVzKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzZXRUaXRsZShjOiBBZ21NYXJrZXJDbHVzdGVyKSB7XG4gICAgaWYgKHR5cGVvZiBjLnRpdGxlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc3QgaW5zdGFuY2UgPSBhd2FpdCB0aGlzLmdldENsdXN0ZXJlckluc3RhbmNlKCk7XG4gICAgICBpbnN0YW5jZS5zZXRUaXRsZShjLnRpdGxlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==