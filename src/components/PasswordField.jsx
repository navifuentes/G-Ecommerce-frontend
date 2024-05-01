import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordField = ({ password }) => {
  const [showPassword, setShowPassword] = useState(false);
  return showPassword ? (
    <>
      <input {...password} type="text" className="border h-4 p-3 w-full" />
      <FaEyeSlash
        onClick={() => setShowPassword(false)}
        className="absolute right-3 cursor-pointer text-slate-500"
      />
    </>
  ) : (
    <>
      <input {...password} id="password" className="border h-4 p-3 w-full" />
      <FaEye
        onClick={() => setShowPassword(true)}
        className="absolute right-3 cursor-pointer text-slate-500"
      />
    </>
  );
};

export default PasswordField;
