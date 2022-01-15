// import { Switch, Route } from "react-router-dom";
import { Routes, Route } from 'react-router'
import {AppHeader} from './cmps/AppHeader'

import routes from "./routes";
export function App() {
  return (
    <div className="App main-container">
      <AppHeader/>
      <main>
      <Routes>
        {routes.map((route) => (
          <Route
          key={route.path}
          element={<route.component />}
          path={route.path}
          />
          ))}
      </Routes>
          </main>
    </div>
  );
}

export default App;
