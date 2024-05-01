import React from "react";

const Footer = () => {
  return (
    <div className="absolute bottom-0 flex items-center justify-around w-full bg-cyan-800/80 z-10 border-t border-white-900/10 sm:py-2">
      <div className=" text-white text-xl">© Iván Fuentes</div>
      <div className="flex gap-x-10 text-white text-xl">
        <a href="">contact me</a>
        <a href="">github</a>
      </div>
    </div>
  );
};

export default Footer;
