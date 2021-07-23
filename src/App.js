import "./App.css";
import Navigation from "./components/Navigation";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Location from "./pages/Location";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import SavedLocations from "./pages/SavedLocations";

function App() {
  const selectAuth = (state) => state.auth;
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (auth.isLoading === false) {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Redirect to="/search" />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route path="/location/:place_id">
            <Location />
          </Route>
          <Route path="/saved">
            <SavedLocations />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
        </Switch>
      </div>
    );
  } else {
    return null;
  }
}

export default App;
