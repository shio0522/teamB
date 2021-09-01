import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Edit from "./Components/Pages/Edit/Edit";
import Item from "./Components/Pages/Item/Item";
import Catalog from "./Components/Pages/Catalog/Catalog";
import SignUp from "./Components/Pages/SignUp/SignUp";
import Login from "./Components/Pages/LogIn/Login";
import Config from "./Components/Pages/Config";
import { AuthProvider } from "./Components/utility/AuthService";
import LoggedInRoute from "./Components/utility/LoggedInRoute";
import Home from "./Components/Pages/Home/Home";
import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Router>
          <GlobalStyle />
          <Switch>
            <LoggedInRoute exact path="/user/:uid" component={Catalog} />
            <Route exact path="/" component={Home} />
            <LoggedInRoute exact path="/new" component={Edit} />
            <LoggedInRoute exact path="/edit/:id" component={Edit} />
            <LoggedInRoute exact path="/edit/:id/:mid" component={Edit} />
            <LoggedInRoute
              exact
              path="/user/:uid/items/:did"
              component={Item}
            />
            <LoggedInRoute exact path="/config/:uid" component={Config} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
};

const GlobalStyle = createGlobalStyle`
${reset}
*, *:before, *:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-weight: 200;
  font-family: "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "Hiragino Sans", "ヒラギノ角ゴシック", sans-serif;
}
a{
  text-decoration:none;
}
input,textarea{
   -webkit-appearance: none;
   border-radius: 0;
}
html{
  font-size: 62.5%;
}
body{
  padding: calc(62 / 375 * 100vw) 0 calc(48 / 375 * 100vw) 0;
  background-color: #000;
  color: #fff;
  font-family: "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3",
    "Hiragino Sans", "ヒラギノ角ゴシック", sans-serif;
  input,textarea{
  background-color: #000;
  color: #fff;
  border:none;
  border-bottom:1px solid #707070;
  }

`;

export default App;
