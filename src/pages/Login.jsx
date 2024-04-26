import { useField } from "../hooks/useField";
import { useDispatch } from "react-redux";
import { initializeUser } from "../reducers/userReducer";

const Login = () => {
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
          <input {...username} className="border-2 border-black text-black" />
        </div>
        <div className="flex flex-col items-center text-gray-200">
          Password:
          <input {...password} className="border-2 border-black text-black" />
        </div>
        <button
          className="border-2 border-white bg-blue-800 text-white rounded-full"
          type="submit"
        >
          login
        </button>
      </form>
      <div className="text-white font-bold">
        Don't have an account ?{" "}
        <button className="text-black/80 hover:text-white/50">
          {" "}
          register{" "}
        </button>{" "}
        here
      </div>
    </div>
  );
};

export default Login;
