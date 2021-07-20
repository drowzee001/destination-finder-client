import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button, Container, Jumbotron } from "reactstrap";
import CarouselContainer from "../components/CarouselContainer";
import {
  getLocation,
  addLocation,
  deleteLocation,
} from "../redux/actions/locationsAction";
import { useHistory } from "react-router-dom";

const Location = () => {
  const selectAuth = (state) => state.auth;
  const auth = useSelector(selectAuth);

  const selectLocations = (state) => state.locations;
  const locations = useSelector(selectLocations);

  const dispatch = useDispatch();

  const history = useHistory();

  var [loading, setLoading] = useState(true);
  var [location, setLocation] = useState([]);
  var [saved, setSaved] = useState(false);
  const { place_id } = useParams();

  const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  function handleScriptLoad() {
    var map = new window.google.maps.Map(document.getElementById("map"));
    var request = {
      placeId: place_id,
      fields: ["name", "formatted_address", "photo", "url", "website"],
    };

    var service = new window.google.maps.places.PlacesService(map);
    service.getDetails(request, callback);
  }

  function callback(place, status) {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      setLocation(place);
      setLoading(false);
    }
  }
  useEffect(() => {
    if (auth.isLoading === false) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
        () => handleScriptLoad()
      );
      if (auth.isAuthenticated === true) {
        dispatch(getLocation(place_id));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    console.log(locations.location.saved)
    setSaved(locations.location.saved);
  }, [locations.loading]);

  const saveClick = (e) => {
    e.preventDefault();
    dispatch(addLocation(place_id, location.photos[0].getUrl(), location.name));
    // dispatch(getLocation(place_id));
    setSaved(true);
  };
  const deleteClick = (e) => {
    e.preventDefault();
    dispatch(deleteLocation(locations.location.id));
    // dispatch(getLocation(place_id));
    setSaved(false);
  };
  if (auth.isLoading === false) {
    return (
      <Container fluid id="locationContainer">
        <div id="map" hidden></div>
        {!loading ? (
          <Jumbotron id="locationPage">
            <h1>{location.name}</h1>
            <CarouselContainer photos={location.photos} name={location.name} />
            <div className="info">
              <h2>{location.formatted_address}</h2>
              <Button className="locationButton" href={location.url}>
                Google Maps
              </Button>
              <Button className="locationButton" href={location.website}>
                Website
              </Button>
              {auth.isAuthenticated ? (
                saved ? (
                  <Button
                    className="locationButton"
                    onClick={(e) => deleteClick(e)}
                  >
                    Delete Location
                  </Button>
                ) : (
                  <Button
                    className="locationButton"
                    onClick={(e) => saveClick(e)}
                  >
                    Save Location
                  </Button>
                )
              ) : null}
            </div>
          </Jumbotron>
        ) : null}
      </Container>
    );
  } else return null;
};

export default Location;
