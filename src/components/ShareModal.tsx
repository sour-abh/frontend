import React from "react";
import {  X } from "lucide-react";

import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import CopyShareLinkButton from "./CopyShareButton";
interface ShareProps {
  handleShareModal: () => void;
  openState:boolean
}
const ShareModal: React.FC<ShareProps> = ( {handleShareModal,openState} ) => {
;
  const shareLink = useSelector((state: RootState) => state.auth.shareLink);
  return (
    <>
      {openState && (
        <div className="bg-purple-100/70 w-full h-screen flex items-center justify-center inset-0 top-0 left-0 fixed z-200 px-2 ">
          <div className="bg-white rounded-md border-gray-300 border-1 shadow-xl max-w-lg w-full flex flex-col gap-4  justify-between  p-4 py-6">
            <div className="flex flex-row justify-between items-center px-2">
              <span className="text-purple-600 font-semibold text-start text-lg">
                ShareLink
              </span>
              <X
                className="size-8 stroke-3 text-gray-400 "
                onClick={handleShareModal}
              />
            </div>

            <div className="bg-gray-200 p-2 rounded-lg flex justify-center items-center text-gray-700">
              <span>{shareLink}</span>
            </div>
            <div className="flex flex-row justify-center items-center">
              <CopyShareLinkButton shareLink={shareLink} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareModal;
