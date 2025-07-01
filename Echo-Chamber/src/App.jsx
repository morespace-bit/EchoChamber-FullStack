import Footer from "./components/Home/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import Page from "./components/Home/SocialPage";
import Signup from "./components/Auth/Signup.jsx";
import Login from "./components/Auth/Login.jsx";
import Forlogin from "./components/Animation/Forlogin.jsx";
import UserData from "./components/Social/UserData.jsx";
import Feed from "./components/Social/Feed.jsx";
import Homepage from "./components/Home/Homepage.jsx";
import Support from "./components/Home/Support.jsx";
import Profile from "./components/Social/Profile/Profile.jsx";
import SocialPage from "./components/Social/Pages/SocialPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="userdata" element={<UserData />} />
      <Route path="welcome" element={<Forlogin />} />
      <Route path="/" element={<Page />}>
        <Route index element={<Homepage />} />
        <Route path="support" element={<Support />} />
      </Route>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      {/* the router for the profile page and social page of the social folder */}

      <Route path="socialPage" element={<SocialPage />}>
        <Route path="feed" element={<Feed />} />
        <Route path="profile/:id" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
