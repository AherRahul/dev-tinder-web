import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./views/Body";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Error from "./views/Error";
import Feed from "./Views/Feed";
import { Provider } from "react-redux";
import { appStore } from "./utils/appStore";
import Connections from "./components/Connections";
import Requests from "./components/Request";

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
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
            </Route>
            <Route path="/error" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App;
