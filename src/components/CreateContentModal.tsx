import { X } from "lucide-react";
import Button from "./ui/Button";
import React, { useRef } from "react";
import CustomSelect, { type IconOption } from "./ui/Select";
import ApiResources from "../api/APIEndpoint";
import { Icons } from './ui/Select';
interface CreateContentModalProps {
  openstate: boolean;
  handlechange: () => void;
}

const CreateContentModal = ({
  openstate,
  handlechange,
}: CreateContentModalProps) => {
    // close the dialog after clicking outside 

  const titleref=useRef<HTMLInputElement>(null);
  const linkref=useRef<HTMLInputElement>(null);
  const typeref=useRef<HTMLInputElement>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
   const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
     // Only close modal if clicked directly on the overlay, not modal children
     if (event.target === event.currentTarget) {
       handlechange();
     }
   };
  const [selectedIcon, setSelectedIcon] = React.useState<IconOption | null>(
    Icons[0]
  );

  const handleSelectChange = (option: IconOption | null) => {
    setSelectedIcon(option);
  };
const handleSubmit = async (e:  React.MouseEvent<HTMLButtonElement> ) => {
  e.preventDefault();
  const title = titleref.current?.value ?? "";
  const link = linkref.current?.value ?? "";
  const type = typeref.current?.value ?? "";
  try {
    const res = await ApiResources.content.createPost({ title, link, type });
       console.log("API response:", res);
    if (res.status===200 || res.status==201){
      handlechange()
    }else{
      alert(res?.data?.message)
    }
    
  } catch (err){
    console.log(err);
    alert("please fill all the required fields.")
  }
};
  return (
    <div>

      {openstate && (
        <div className="  w-screen h-screen z-200 bg-black/70 top-0 left-0 fixed flex justify-center items-center inset-0  px-4" onClick={handleOverlayClick}>
          <div className="max-w-md w-full rounded-xl border border-gray-300 shadow-2xl flex flex-col justify-between gap-4 px-6 py-4 text-gray-500 bg-white" ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-row justify-between">
              <h1 className="text-gray-700 font-bold text-lg">
                Create New Content
              </h1>
              <X
                className="text-gray-800/70 stroke-3 size-5 cursor-pointer"
                onClick={handlechange}
              />
            </div>
            <div className="flex flex-row items-center gap-4 justify-between w-full">
              <h2 className=" w-1/5 text-base sm:text-lg  text-gray-500 font-bold">
                Title :
              </h2>
              <input
                className=" w-full rounded-sm outline-none border border-gray-300 focus-visible:border-purple-500 focus-visible:ring-purple-500/50 focus-visible:ring-[3px] bg-white placeholder:text-gray-600 indent-2 text-gray-700 text-base font-normal h-9"
                placeholder="Title of the content"
                ref={titleref}
              />
            </div>
            <div className="flex flex-row items-center gap-4  justify-between w-full">
              <h2 className=" w-1/5 text-base sm:text-lg  text-gray-500 font-bold">
                Link :
              </h2>
              <input
                className=" w-full rounded-sm outline-none border border-gray-300 focus-visible:border-purple-500 focus-visible:ring-purple-500/50 focus-visible:ring-[3px] bg-white placeholder:text-gray-600 indent-2 text-gray-700 text-base font-normal h-9"
                placeholder="link of the content" ref={linkref}
              />
            </div>
            <div className="flex flex-row items-center gap-4 justify-between w-full">
              <h2 className=" w-1/5 text-base sm:text-lg  text-gray-500 font-bold">
                Type :
              </h2>
              <input
                className="  w-full rounded-sm outline-none border border-gray-300 focus-visible:border-purple-500 focus-visible:ring-purple-500/50 focus-visible:ring-[3px] bg-white placeholder:text-gray-600 indent-2 text-gray-700 text-base font-normal lowercase h-9"
                placeholder="type in lowercase of the content" ref={typeref}
              />
            </div>
            <div>
              <label className="mb-2 block text-gray-700">
                Select an Icon:
              </label>
              <CustomSelect
                value={selectedIcon}
                onChange={handleSelectChange}
                options={Icons}
              />
              <p className="mt-4 text-gray-600">
                You have selected: **{selectedIcon?.value}**
              </p>
            </div>
            <Button
              text="Submit"
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContentModal;
