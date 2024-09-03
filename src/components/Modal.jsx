import React from "react";
import { MdClose } from "react-icons/md";

const Modal = ({ open, onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 z-50 flex justify-center items-center transition-colors
        overflow-y-auto
        ${open ? "visible bg-gray-400/10" : "invisible"}
    `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
      bg-white rounded-xl shadow-md p-8 transition-all overflow-y-auto
      ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"} 
      `}
      >
        <div className="">
          <div className="absolute top-2 right-4 p-1">
            <MdClose
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:text-gray-300"
              size={30}
            />
          </div>
        </div>
        <div className="">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
