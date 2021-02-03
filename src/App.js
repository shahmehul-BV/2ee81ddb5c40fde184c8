import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { Details, Home } from "./Pages";

function App() {
  return (
    <div className="App">
      <header className="header">NASA Form</header>
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/details/:id"} component={Details} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
