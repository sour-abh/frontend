import { Brain, Image, LogOut, Plus, Share, Text, Twitter, Video } from "lucide-react";
import { useSelector } from "react-redux";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import CreateContentModal from "../components/CreateContentModal";
import React from "react";
import Sidebar from "../components/ui/Sidebar";
import type { RootState } from "../redux/store";
import ApiResources from "../api/APIEndpoint";
import UpdatePostModal from "../components/UpdatePostModal";
import ShareModal from "../components/ShareModal";
interface LoginSignupProps {
  handleLoginModal: () => void;
  handleSignUpModal: () => void;
  handleLogoutModal: () => void;
  posts: Post[];
  handleReload: () => void;
  handleShareModal: () => void;
  handleShare: () => void;
  openShareModal:boolean;
}
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


function Dashboard({
  handleLoginModal,
  handleSignUpModal,
  handleLogoutModal,
  handleReload,
  posts,
  handleShareModal,
  handleShare,
  openShareModal,
}: LoginSignupProps) {
  // interface

  //   interface ContentResponse {
  //    userName: string;
  //    content: ContentItem[];
  //    message: string;
  //  }

  // constant and states

  const [open, setOpen] = React.useState<boolean>(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [showSidebar, setShowSideBar] = React.useState(true);

  //handler and Functions

  const handleDelete = async (id: string) => {
    await ApiResources.content.deletePost(id);
    handleReload();
  };
  const handleUpdateOpen = (id: string) => setEditingId(id);
  const handleUpdateClose = async () => {
    setEditingId(null);
    handleReload();
  };
  const handleCreateModal = () => {
    setOpen(false);
    handleReload();
  };
  const handleopenCreate=()=>
    setOpen(true);
  
  const handleUpdate = async (
    id: string,
    data: { title?: string ; link?: string ; type?: string }
  ) => {
    const res = await ApiResources.content.updatePost(id, data);
    handleReload();
    return res;
  };
  const handleSideBarOpen = () => {
    setShowSideBar((state) => !state);
  };

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
            ? `md:ml-[280px] relative flex flex-col  px-3 sm:px-6 overflow-x-hidden pb-5 bg-gray-100 items-center  h-screen gap-y-3  gap-2`
            : `md:ml-[70px]
              relative flex flex-col  px-3 sm:px-6 overflow-x-hidden pb-5 bg-gray-100   h-screen gap-y-3`
        }
      >
        <CreateContentModal openstate={open} handlechange={handleCreateModal} />
        <ShareModal
          handleShareModal={handleShareModal}
          openState={openShareModal}
        />

        {isLoggedIn ? (
          <div className=" w-full bg-gray-100  p-2  flex flex-row justify-between sm:justify-end mt-2 sticky top-0 left-0  shadow-md">
            <a href="/" className="sm:hidden ">
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
          <div className=" w-full bg-gray-100  p-2  flex flex-row justify-between sm:justify-end  sticky top-0 left-0 shadow-md ">
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
        <div className="flex flex-row justify-between w-full items-center sticky bg-gray-100 z-20   top-12 py-2 left-0 ">
          <h1 className="text-lg sm:text-3xl font-bold text-black/80 items-start">
            ALL NOTES
          </h1>
          <div className="flex flex-row gap-2 justify-end items-center">
            <Button
              variant="primary"
              size="md"
              text="AddPost"
              startIcon={<Plus className="size-[20px]" />}
              onClick={isLoggedIn ? handleopenCreate : handleLoginModal}
            />
            <Button
              variant="secondary"
              size="md"
              text="Share"
              endIcon={<Share className="size-[20px]" />}
              onClick={handleShare}
            />
          </div>
        </div>
        <div className=" grid grid-col-1 sm:grid-cols-3 gap-y-4 sm:gap-2  items-center   w-full px-2">
          {posts.map((item, index) => (
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
                link={item.link}
                type={item.type}
                time={item.time}
                handleDelete={handleDelete}
                handleUpdateOpen={() => handleUpdateOpen(item._id)}
              />
              {editingId && (
                <UpdatePostModal
                  id={editingId}
                  openstate={Boolean(editingId)}
                  handlechange={handleUpdateClose}
                  handleUpdate={handleUpdate}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
