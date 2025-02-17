import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./views/Body";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Feed from "./views/Feed";
import { Provider } from "react-redux";
import { appStore } from "./utils/appStore";

function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />} >
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App;
