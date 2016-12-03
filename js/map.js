"use strict"

class Map{
    constructor(mapElement, searchFrom, searchTo, mode){
        this.map = new google.maps.Map(document.getElementById('map'), {
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
        this.mode = mode; // FIND, 
        
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
        if(this.path.active){
            this.path.waypoints.push({location:e.latLng, stopover:false});
            this._updatePath();
        }
    }
    
    _testAddMarker(latlng){
        let m = new google.maps.Marker({
          position: latlng,
          map: this.map
        });
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
        if(this.path.start != undefined){
            this.path.start.setMap(null);
        }
        this.path.start = new google.maps.Marker({
          position: place.geometry.location,
          map: this.map
        });
        
        this._updatePath();
    }
    
    _setEnd(place){
        if(this.path.end != undefined){
            this.path.end.setMap(null);
        }
        this.path.end = new google.maps.Marker({
          position: place.geometry.location,
          map: this.map
        });
        
        this._updatePath();
    }
    
    _updatePath(){
        if(this.path.start == undefined || this.path.end == undefined) {
            this.path.active = false;
            return;
        } else {
            this.path.active = true;
        }
            
        let dirQuery = {
          origin: this.path.start.position,
          destination: this.path.end.position,
          travelMode: "DRIVING",
          waypoints: this.path.waypoints
        }
        
        this.directionsService.service.route(dirQuery, (result, status) => {
            if (status == 'OK') {
              this.directionsService.renderer.setDirections(result);
            }
         });
    }
    
}
