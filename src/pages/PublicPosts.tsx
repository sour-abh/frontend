import { Brain, Image, LogOut, Text, Twitter, Video } from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

import React from "react";
import Sidebar from "../components/ui/Sidebar";
import ApiResources from "../api/APIEndpoint";
import { useParams } from "react-router-dom";
import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";

interface LoginSignupProps {
  handleLoginModal: () => void;
  handleSignUpModal: () => void;
  handleLogoutModal: () => void;
}

  interface ContentItem {
    _id: string;
    link: string;
    type: string;
    title: string;
    tags: string[];
    userId: string;
    time:string;
    __v: number;
  }

function PublicPosts({
  handleLoginModal,
  handleSignUpModal,
  handleLogoutModal,
}: LoginSignupProps) {
  // interface

  // constant and states

  const [showSidebar, setShowSideBar] = React.useState(true);
  const [userName, setUserName] = React.useState<string>("");
  const [sharedPosts, setSharedPosts] = React.useState<ContentItem[]>([]);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const { hash } = useParams();

  const shareLink = hash || "";
  //handler and Functions
  const getsharedPosts = async (shareLink: string) => {
    const res = await ApiResources.link.getShareLink(shareLink || "");
    setSharedPosts(res.data.content);
    setUserName(res.data.userName);
  };

  const handleSideBarOpen = () => {
    setShowSideBar((state) => !state);
  };
  React.useEffect(() => {
    getsharedPosts(shareLink);
  }, [shareLink]);

  return (
    <>
      {showSidebar ? (
        <Sidebar
          className={`w-[280px] flex-col gap-2 pl-4 items-start `}
          handleChange={handleSideBarOpen}
          showSidebar={showSidebar}
          setShowSideBar={setShowSideBar}
        />
      ) : (
        <Sidebar
          className={`w-[70px] items-center flex-col gap-2`}
          handleChange={handleSideBarOpen}
          showSidebar={showSidebar}
          setShowSideBar={setShowSideBar}
        />
      )}
      <div
        className={
          showSidebar
            ? `md:ml-[280px] relative flex flex-col  px-3 sm:px-6 overflow-x-hidden pb-5 bg-gray-100 items-center  h-screen gap-y-8  gap-2`
            : `md:ml-[70px]
              relative flex flex-col  px-3 sm:px-6 overflow-x-hidden pb-5 bg-gray-100   h-screen gap-y-8`
        }
      >
        {isLoggedIn ? (
          <div className=" w-full bg-gray-100 shadow-sm p-2  flex flex-row justify-between sm:justify-end mt-2 ">
            <a href="/" className="sm:hidden">
              <Brain className="size-8 text-purple-500" />
            </a>

            <div className="flex flex-row gap-2 justify-end items-center">
              <Button
                variant="primary"
                size="sm"
                text="LogOut"
                startIcon={<LogOut />}
                onClick={handleLogoutModal}
              />
            </div>
          </div>
        ) : (
          <div className=" w-full bg-gray-100 shadow-sm p-2  flex flex-row justify-between  sm:justify-end mt-2">
            <a href="/" className="sm:hidden">
              <Brain className="size-8 text-purple-500" />
            </a>

            <div className="  flex flex-row gap-2 justify-end items-center">
              <Button
                variant="secondary"
                size="md"
                text="SignUp"
                onClick={handleSignUpModal}
              />
              <Button
                variant="primary"
                size="md"
                text="LogIn"
                onClick={handleLoginModal}
              />
            </div>
          </div>
        )}

        <div className="flex flex-row justify-between w-full items-center">
          <h1 className="text-lg sm:text-3xl font-bold text-black/80 items-start bg-gray-100 py-1 px-1 sticky top-0 left-0">
            Posts By {userName ? userName : ""}
          </h1>
        </div>
        <div className=" grid grid-col-1 sm:grid-cols-3 gap-y-4 sm:gap-2  items-center w-full">
          {sharedPosts.map((item, index) => (
            <div key={index}>
              <Card
                id={item._id}
                title={item.title}
                titleIcon={
                  item.type === "youtube" ? (
                    <Video />
                  ) : item.type === "text" ? (
                    <Text />
                  ) : item.type === "twitter" ? (
                    <Twitter />
                  ) : item.type === "image" ? (
                    <Image />
                  ) : (
                    <Image />
                  )
                }
                time={item.time}
                link={item.link}
                type={item.type}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PublicPosts;
