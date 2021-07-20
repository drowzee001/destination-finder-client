import React, { useState, useEffect, useRef } from "react";
import LocationCard from "../components/LocationCard";
import { Container, Form } from "reactstrap";
import { useSelector } from "react-redux";

function Search() {
  const [locations, setLocations] = useState([]);
  const selectAuth = (state) => state.auth;
  const auth = useSelector(selectAuth);

  let autoComplete;

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

  function handleScriptLoad(updateQuery, autoCompleteRef) {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { types: ["(cities)"], componentRestrictions: { country: "us" } }
    );
    autoComplete.setFields(["geometry", "formatted_address"]);
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect(updateQuery)
    );
  }

  async function handlePlaceSelect(updateQuery) {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);
    let lat = addressObject.geometry.location.lat();
    let lng = addressObject.geometry.location.lng();
    loadLocation(lat, lng);
  }

  function loadLocation(lat, lng) {
    var location = new window.google.maps.LatLng(lat, lng);
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: location,
    });
    var request = {
      location: location,
      radius: "15000",
      type: ["tourist_attraction"],
    };
    var service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      if (status !== "OK" || !results) return;
      setLocations(results);
    });
  }

  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    if (auth.isLoading === false) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
        () => handleScriptLoad(setQuery, autoCompleteRef)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const locationCards = locations.map((location) => (
    <LocationCard
      key={location.place_id}
      place_id={location.place_id}
      location={location}
      saved={false}
    />
  ));

  return (
    <Container id="searchContainer" fluid="lg">
      <Form id="search" autoComplete="off">
        <input
          ref={autoCompleteRef}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Enter a City"
          value={query}
        />
      </Form>
      <div id="map"></div>
      <Container id="locationCards">{locationCards}</Container>
    </Container>
  );
}

export default Search;
