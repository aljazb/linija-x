Number.prototype.toRad = function() {
    return this * Math.PI / 180;
}

class Map{
    constructor(mapElement, searchFrom, searchTo, mode){
        this.map = new google.maps.Map(mapElement, {
          center: {lat: 46.057093, lng: 14.505930},
          zoom: 13
        });
        
        this.placesService = new google.maps.places.PlacesService(this.map);
        this.directionsService = {
            service: new google.maps.DirectionsService(),
            renderer: new google.maps.DirectionsRenderer()
        }
        this.directionsService.renderer.setMap(this.map);
        
        this.searchFrom = {element: searchFrom, searchBox: new google.maps.places.SearchBox(searchFrom)};
        this.searchTo = {element: searchTo, searchBox: new google.maps.places.SearchBox(searchTo)};
        
        this.path = {waypoints:[]};
        this.clusters = {};
        
        this.mode = mode; // FIND, EDIT 
        
        $(searchFrom).on('keydown', this._searchFromChanged.bind(this));
        $(searchTo).on('keydown', this._searchToChanged.bind(this));
        this.map.addListener('click', this._mapClick.bind(this));
    }
    
    _searchFromChanged(e){
        if(e.key=="Enter"){
            this._searchPlace("from");
        }
    }
    
    _searchToChanged(e){
        if(e.key=="Enter"){
            this._searchPlace("to");
        }
    }
    
    _mapClick(e){
        if(this.path.active && this.mode == "EDIT"){
            this.path.waypoints.push({location:e.latLng, stopover:false});
            this._updatePath();
        }
    }
    
    _searchPlace(destination){
        let searchBox;
        if(destination=="from"){
            searchBox = this.searchFrom.element
        } else {
            searchBox = this.searchTo.element
        }
        
        this.placesService.textSearch({query: searchBox.value}, (data)=>{
            if(data.length > 0){
                if(destination=="from"){
                    this._setStart(data[0]);
                } else {
                    this._setEnd(data[0]);
                }
            }
        });
    }
    
    _setStart(place){
        let l = place.geometry.location
        this.path.start = {lat:l.lat(), lng:l.lng()};
        this._renderMap();
    }
    
    _setEnd(place){
        let l = place.geometry.location
        this.path.end = {lat:l.lat(), lng:l.lng()};
        this._renderMap();
    }
    
    _renderMap(){
        this._updatePath();
        this._renderClusters();
    }
    
    _renderClusters(){
        if(this.clusters.start != undefined)
            this.clusters.start.setMap(null);
        if(this.clusters.end != undefined)
            this.clusters.end.setMap(null);
            
        if(this.path.active){
            this.clusters.start = null;
            this.clusters.end = null;
            return;
        }
            
        this.clusters.start = new google.maps.Marker({
          position: this.path.start,
          map: this.map
        });
        
        this.clusters.end = new google.maps.Marker({
          position: this.path.end,
          map: this.map
        });
    }
    
    _updatePath(){
        if(this.path.start == undefined || this.path.end == undefined) {
            this.path.active = false;
            return;
        } else {
            this.path.active = true;
        }
        
        let waypoints;
        let travelMode;
        if(this.mode=="FIND"){
            let closest = MapHelper.findClosestPath(this.path.start, this.path.end);
            waypoints = closest.path.postaje.slice(closest.first, closest.last+1).map((e)=>{
               return {location:e.lokacija, stopover: false}; 
            });
            travelMode = "WALKING";
        }else {
            waypoints = this.path.waypoints;
            travelMode = "DRIVING";
        }
        
        let dirQuery = {
          origin: this.path.start,
          destination: this.path.end,
          travelMode: travelMode,
          waypoints: waypoints
        }
        
        this.directionsService.service.route(dirQuery, (result, status) => {
            if (status == 'OK') {
              this.directionsService.renderer.setDirections(result);
            }
         });
    }
    
    drawPath(path){
        this.path.start = path.postaje[0].lokacija;
        this.path.end = path.postaje[path.postaje.length-1].lokacija;
        
        this.path.waypoints = [];
        for(let i=1; i<path.postaje.length-1; i++){
            this.path.waypoints.push({location:path.postaje[i].lokacija, stopover:false});
        }
        
        this._renderMap();
    }
    
}

var MapHelper = {
    distance: function(point1, point2){
        var R = 6371; // km 
        var x1 = point2.lat-point1.lat;
        
        var dLat = x1.toRad();  
        var x2 = point2.lng-point1.lng;
        var dLon = x2.toRad();  
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                        Math.cos(point1.lat.toRad()) * Math.cos(point2.lat.toRad()) * 
                        Math.sin(dLon/2) * Math.sin(dLon/2);  
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; 
        
        return d;
    },
    findClosestPath: function(start, end){
        let shortest = podatki.prevozi.map((prevoz, i)=>{
            let linija = podatki.linije[prevoz.linija];
            let minIn = linija.postaje.map((postaja, j)=>{
                return [this.distance(postaja.lokacija, start), j];
            }).sort()[0];
            let minOut = linija.postaje.slice(minIn[1]).map((postaja, j)=>{
                return [this.distance(postaja.lokacija, end), j+minIn[1]];
            }).sort()[0];
            
            return [minIn[0]+minOut[0], minIn[1], minOut[1], i];
        }).sort()[0];
        
        let pr = podatki.prevozi[shortest[3]];
        return {
            drive: pr,
            path: podatki.linije[pr.linija],
            first: shortest[1],
            last: shortest[2],
            distance: shortest[0]
        };
    }
}
