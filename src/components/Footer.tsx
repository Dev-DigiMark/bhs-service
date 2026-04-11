import { useState } from "react";
import ChatWindow from "./ChatWindow";

export function Footer(): React.ReactElement {
  const currentYear = new Date().getFullYear();
  const [open, setOpen] = useState(false)

  return (
    <footer
      aria-label="Site footer"
      className="py-12 px-[5%] bg-[#0A0A0A] border-t border-[#1A1A1A] text-[#555]"
    >
      <div className="max-w-[1100px] mx-auto flex flex-wrap gap-8 justify-between items-start">
        {/* Brand */}
        <div>
          <div className="mb-2">
            <span className="font-['Fraunces',_Georgia,_serif] font-bold text-[18px] text-white">
              CLEAR
            </span>
            <span className="text-[12px] text-[#444] ml-2">by BHSS</span>
          </div>
          <p className="text-[13px] text-[#444] max-w-[220px] leading-[1.65]">
            An AI Advocacy Companion created for the Caribbean Health Exhibition (CHE).
          </p>
        </div>

        {/* Disclaimer */}
        <div className="max-w-[480px]">
          <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[#333] mb-2.5">
            Important disclaimer
          </p>
          <p className="text-[13px] text-[#444] leading-[1.75]">
            CLEAR is a prototype tool created by BHSS for the Caribbean Health Exhibition.
            This tool is for guidance and self-advocacy only. It does not replace legal or
            medical advice. If your situation is urgent or severe, seek appropriate professional
            support.
          </p>
        </div>

        {/* Copyright */}
        <div className="self-end">
          <p className="text-[12px] text-[#333]">© {currentYear} BHSS. All rights reserved.</p>
        </div>
      </div>
      {open &&
      <div className="w-[500px] h-[calc(100vh-200px)] fixed end-3 bottom-2 z-[999] shadow">
         <button className='cursor-pointer rounded-full w-6 h-6 bg-gray-500 text-white flex justify-center items-center absolute start-0 -top-2 z-[9999]' onClick={()=>setOpen(false)}>x</button>
        <ChatWindow />
      </div>
      }
      {!open &&

        <button type="button" onClick={() => setOpen(!open)} className="bg-yellow-500 cursor-pointer text-white flex items-center justify-center w-16 h-16 rounded-full fixed end-4 bottom-6 hover:bg-yellow-600 duration-300 z-[99]">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="2.5sem" width="2.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M87.48 380c1.2-4.38-1.43-10.47-3.94-14.86a42.63 42.63 0 0 0-2.54-3.8 199.81 199.81 0 0 1-33-110C47.64 139.09 140.72 48 255.82 48 356.2 48 440 117.54 459.57 209.85a199 199 0 0 1 4.43 41.64c0 112.41-89.49 204.93-204.59 204.93-18.31 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.14 31.14 0 0 0-11.13-2.07 30.7 30.7 0 0 0-12.08 2.43L81.5 462.78a15.92 15.92 0 0 1-4.66 1.22 9.61 9.61 0 0 1-9.58-9.74 15.85 15.85 0 0 1 .6-3.29z"></path><circle cx="160" cy="256" r="32"></circle><circle cx="256" cy="256" r="32"></circle><circle cx="352" cy="256" r="32"></circle></svg>
        </button>
      }
    </footer>
  );
}
