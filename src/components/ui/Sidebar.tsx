
import { useRef } from 'react';
import { cn } from '../utils/cn';
import {  Brain, Instagram, SidebarClose, SidebarOpen, Twitter, User, Youtube } from 'lucide-react';
import {useSelector} from 'react-redux'
import type { RootState } from '../../redux/store';

type SidebarProps={
    className?:string;
    handleChange:()=>void;
    showSidebar:boolean;
    setShowSideBar:React.Dispatch<React.SetStateAction<boolean>>;

}

const Sidebar = ({className,handleChange,showSidebar,setShowSideBar}:SidebarProps)=>
     {
      const user = useSelector((state: RootState) => state.auth.user);

      const dropdownRef = useRef<HTMLDivElement>(null);
const handleSidebarClick = () => {
  if (!showSidebar) {
    setShowSideBar(true);
  }
  // Do nothing if open
};
       
    const sideBarMain = [
      {
        icon: (
          <Twitter
            className={
              showSidebar
                ? `size-6  `
                : ` size-6 `
            }
          />
        ),
        title: "Twitter",
      },
      {
        icon: (
          <Youtube
            className={
              showSidebar
                ? ` size-6 `
                : `size-6 `
            }
          />
        ),
        title: "youtube",
      },
      {
        icon: (
          <Instagram
            className={
              showSidebar
                ? `size-6  `
                : ` size-6 `
            }
          />
        ),
        title: "Instagram",
      },
    ];
    
  return (
    <div
      className={cn(
        className,
        `min-h-screen hidden xl:flex  top-0 left-0  sm:flex  border-r-2 border-r-gray-300 shadow-xl  bg-gray-200 z-20 text-gray-600 absolute transition-all duration-300 ease-in-out overflow-x-hidden`
      )}
      ref={dropdownRef}
      onClick={handleSidebarClick}
    >
      <div
        className="transform duration-200 transition-all ease-in   "
        onClick={handleChange}
      >
        {showSidebar ? <SidebarOpen className="ml-60" /> : <SidebarClose />}
      </div>
      <div className="flex flex-col justify-between  h-[90vh] ">
        <a
          href="#"
          className=" flex items-center font-bold flex-row gap-2 focus-visible:border-purple-500 focus-visible:ring-purple-500/50 focus-visible:ring-[3px] outline-none"
        >
          <Brain
            className={
              showSidebar
                ? `text-purple-600 size-20 -mt-2 hover:text-purple-600/90`
                : `text-purple-600 size-10 hover:text-purple-600/90`
            }
          />
          <span
            className={
              showSidebar
                ? `text-gray-600 text-3xl hover:text-gray-500`
                : `hidden `
            }
          >
            SECOND BRAIN
          </span>
        </a>
        <div
          className={
            showSidebar
              ? ` flex flex-col  mb-60 `
              : `flex flex-col  items-center mb-60`
          }
        >
          {sideBarMain.map((item, index) => (
            <a
              href="#"
              key={index}
              className="flex flex-row gap-2  items-center font-bold focus-visible:border-purple-500 focus-visible:ring-purple-500/50 focus-visible:ring-[3px] outline-none  hover:bg-gray-400 p-2 hover:text-white text-gray-500/80 transition-all duration-300 "
            >
              <div>{item.icon && item.icon}</div>
              <span
                className={
                  showSidebar
                    ? ` text-base hover:text-white`
                    : `hidden`
                }
              >
                {item.title}
              </span>
            </a>
          ))}
        </div>

        <div className="flex flex-row gap-2 items-center cursor-pointer ">
          <div className="rounded-2xl bg-gray-300">
            <User className=" size-10  hover:text-white " />
          </div>
          <div
            className={
              showSidebar
                ? `flex flex-col gap-[2px] items-start hover:text-gray-500`
                : `hidden`
            }
          >
            <span className="text-start text-xs font-bold text-gray-600 hover:text-gray-500">
              {user?user?.name:`username`}
            </span>
            <span className=" text-start text-sm font-bold text-gray-600 hover:text-gray-500">
              {user ? user?.email :`user Email`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar