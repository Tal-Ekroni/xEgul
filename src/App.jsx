// import { Switch, Route } from "react-router-dom";
import { Switch, Route } from 'react-router'
import {AppHeader} from './cmps/AppHeader'

import routes from "./routes";
export function App() {
  return (
    <div className="App main-container">
      <AppHeader/>
      <main>
      <Switch>
        {routes.map((route) => (
          <Route
          key={route.path}
          exact component={route.component}
          path={route.path}
          />
          ))}
      </Switch>
          </main>
    </div>
  );
}

export default App;
