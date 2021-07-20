import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Button, CardImg } from "reactstrap";
import { useHistory } from "react-router-dom";
import defaultImg from "../assets/no-img-found.jpg";
import { addLocation, getLocation } from "../redux/actions/locationsAction";
import CheckIcon from "@material-ui/icons/Check";

const LocationCard = ({ location, saved }) => {
  const [isSaved, setIsSaved] = useState(false);

  const selectIsAuth = (state) => state.auth.isAuthenticated;
  const isAuth = useSelector(selectIsAuth);

  const selectLocations = (state) => state.locations;
  const locations = useSelector(selectLocations);

  const dispatch = useDispatch();

  const history = useHistory();

  let image;
  try {
    image = location.photos[0].getUrl();
  } catch {
    image = defaultImg;
  }
  const saveLocation = () => {
    if (isAuth) {
      if (image === defaultImg) {
        dispatch(addLocation(location.place_id, null, location.name));
      } else {
        dispatch(addLocation(location.place_id, image, location.name));
      }
      setIsSaved(true);
    } else {
      history.push("/login");
    }
  };

  return (
    <div>
      {image ? (
        <Card id="locationCard">
          <CardImg
            id="locationImg"
            top
            width="100%"
            src={image}
            alt="Card image cap"
          />
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

            <Button className="locationButton" onClick={() => saveLocation()}>
              {!isSaved ? <>Save</> : <CheckIcon />}
            </Button>
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
};

export default LocationCard;
