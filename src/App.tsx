import './App.css'
import { useSearchParams, useNavigate, Route, Routes} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import Dashboard from './pages/Dashboard'
import React from 'react'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { logout,sharelink } from './redux/AuthSlice';
import PublicPosts from './pages/PublicPosts';
import ApiResources from './api/APIEndpoint';

function App() {
       interface Post {
         _id: string;
         link: string;
         type: string; // or you can restrict to 'image' | 'video' | etc, if needed
         title: string;
         tags: string[];
         userId: User;
         time:string;
         __v: number;
       }
            interface User {
              _id: string;
              name: string;
              email: string;
            }

  const [posts, setPosts] = React.useState<Post[]>([]);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  const [share,setShare]=React.useState<boolean>(false);
  const [openShareModal, setOpenShareModal] = React.useState<boolean>(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();


const handleReload = async () => {
  getPosts();
};
const handleShare = async () => {
  setShare(true)
  setOpenShareModal(!openShareModal)
    try {
      const res = await ApiResources.link.createShareLink({share:share});
      if (res.status === 200 || res.status === 201) {
        dispatch(
          sharelink({
            shareLink:`http://localhost:5173/sharelink/${res.data.hash}`,
          })
        );
      }
      if (res.status !== 200) {
        // Backend returned a validation error or auth error
        console.log(res.data.message || "Authentication failed.");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleShareModal = () => {
    setOpenShareModal(!openShareModal);
  }; 
  const handleLoginModel = () => setSearchParams({ tab: "login" });
  const handleSignupModel = () => setSearchParams({ tab: "signup" });

  const handleClose = () => {
    setIsModalOpen(false);
    setSearchParams({});
    navigate("/dashboard", { replace: true });
  };
  const handleLogoutModal = () => {
    dispatch(logout());
  };
  const getPosts = async () => {
    const res = await ApiResources.content.showPosts();
    setPosts(res.data.posts);
  };


  React.useEffect(() => {
    getPosts();
  }, []);



  React.useEffect(() => {
    // Open or close modal based on tab param
    const tab = searchParams.get("tab");
    setIsModalOpen(tab === "login" || tab === "signup");
  }, [searchParams]);

  return (
    <div className="bg-purple-100 relative w-full h-screen">
      <Routes>
        <Route
          path="/dashboard"
          element={
            <Dashboard
              handleLoginModal={handleLoginModel}
              handleSignUpModal={handleSignupModel}
              handleLogoutModal={handleLogoutModal}
              posts={posts}
              handleReload={handleReload}
              handleShare={handleShare}
              handleShareModal={handleShareModal}
              openShareModal={openShareModal}
            />
          }
        />
        <Route
          path="/"
          element={
            <Dashboard
              handleLoginModal={handleLoginModel}
              handleSignUpModal={handleSignupModel}
              handleLogoutModal={handleLogoutModal}
              posts={posts}
              handleReload={handleReload}
              handleShare={handleShare}
              handleShareModal={handleShareModal}
              openShareModal={openShareModal}
            />
          }
        />
        <Route
          path={`/sharelink/:hash`}
          element={
            <PublicPosts
              handleLoginModal={handleLoginModel}
              handleSignUpModal={handleSignupModel}
              handleLogoutModal={handleLogoutModal}
            />
          }
        />

      </Routes>

      {isModalOpen && (
        <div>
          {searchParams.get("tab") === "login" ? (
            <Signin
              handleSignupModel={handleSignupModel}
              handlechange={handleClose}
              handleReload={handleReload}
            />
          ) : (
            <Signup
              handleLoginModel={handleLoginModel}
              handleChange={handleClose}
              handleReload={handleReload}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App
