import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordField = ({ password }) => {
  const [showPassword, setShowPassword] = useState(false);
  return showPassword ? (
    <>
      <input
        {...password}
        type="text"
        placeholder="Password"
        className="border p-3 rounded-lg w-full"
      />
      <FaEyeSlash
        onClick={() => setShowPassword(false)}
        className="absolute right-3 cursor-pointer"
      />
    </>
  ) : (
    <>
      <input
        {...password}
        placeholder="Password"
        id="password"
        className="border p-3 rounded-lg w-full"
      />
      <FaEye
        onClick={() => setShowPassword(true)}
        className="absolute right-3 cursor-pointer"
      />
    </>
  );
};

export default PasswordField;
