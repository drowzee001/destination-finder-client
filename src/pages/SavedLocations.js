import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Container } from "reactstrap";
import { getLocations, deleteLocation } from "../redux/actions/locationsAction";
import { Card, CardBody, CardTitle, Button, CardImg } from "reactstrap";
import defaultImg from "../assets/no-img-found.jpg";
import { useHistory } from "react-router-dom";

const SavedLocations = () => {
  const selectAuth = (state) => state.auth;
  const auth = useSelector(selectAuth);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.isLoading === false) {
      if (auth.isAuthenticated) {
        dispatch(getLocations());
      } else {
        history.push("/login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const selectLocations = (state) => state.locations;
  const locations = useSelector(selectLocations);

  const removeLocation = (id) => {
    dispatch(deleteLocation(id));
  };

  if (!locations.loading) {
    const locationCards = locations.array.map((location) => (
      <Card id="locationCard" key={location._id}>
        {location.image === null ? (
          <CardImg
            id="locationImg"
            top
            width="100%"
            src={defaultImg}
            alt="Card image cap"
          />
        ) : (
          <CardImg
            id="locationImg"
            top
            width="100%"
            src={location.image}
            alt="Card image cap"
          />
        )}
        <CardBody id="locationBody">
          <CardTitle id="locationTitle" tag="h5">
            {location.name}
          </CardTitle>
          <Button
            className="locationButton"
            href={`/location/${location.place_id}`}
          >
            More Info
          </Button>

          <Button
            className="locationButton"
            onClick={() => removeLocation(location._id)}
          >
            Delete
          </Button>
        </CardBody>
      </Card>
    ));
    if (locations.array.length > 0) {
      return (
        <Container style={{ marginTop: "100px" }} id="locationCards">
          {locationCards}
        </Container>
      );
    } else{
      console.log(locations.array.length);
      return <Alert id="empty">No Saved Locations</Alert>;
    } 
  } else return null;
};

export default SavedLocations;
