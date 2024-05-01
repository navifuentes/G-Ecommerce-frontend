import { useField } from "../hooks/useField";
import { useDispatch } from "react-redux";
import { initializeUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import PasswordField from "../components/PasswordField";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, resetUsername] = useField("text");
  const [password, resetPassword] = useField("password");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginForm = {
      email: username.value,
      password: password.value,
    };
    resetUsername();
    resetPassword();
    dispatch(initializeUser(loginForm));
  };

  return (
    <div className="flex flex-col items-center sm:pt-[30vh] pt-[10vh]">
      <h2 className="text-white text-4xl font-bold mb-4 px-8 py-1 border-4 border-white/20 rounded-3xl">
        Log in :
      </h2>
      <form
        className="flex flex-col gap-y-2 p-4 border-4 border-white/20 rounded-3xl"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center text-gray-200">
          Username:
          <input
            {...username}
            className="w-full border-2 border-black text-black"
          />
        </div>
        <div className="flex flex-col items-center text-white">
          Password :
          <div className="relative flex border-2 border-black text-black items-center">
            <PasswordField password={password} />
          </div>
        </div>
        <button
          className="capitalize border-2 border-white bg-blue-800 text-white rounded-full"
          type="submit"
        >
          login
        </button>
      </form>
      <div className="text-white font-bold">
        Don't have an account ? register{" "}
        <button
          onClick={() => navigate("/register")}
          className="text-black/80 hover:text-white/50"
        >
          {" "}
          here
        </button>
      </div>
    </div>
  );
};

export default Login;
