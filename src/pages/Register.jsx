import { useDispatch } from "react-redux";
import { useField } from "../hooks/useField";
import { useNavigate } from "react-router-dom";
import PasswordField from "../components/PasswordField";
import { createUser } from "../reducers/userReducer";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName, resetFirstName] = useField("text");
  const [lastName, setLastName, resetLastName] = useField("text");
  const [email, setEmail, resetEmail] = useField("mail");
  const [age, setAge, resetAge] = useField("number");
  const [password, setPassword, resetPassword] = useField("password");

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      age: age.value,
      password: password.value,
    };

    resetFirstName();
    resetLastName();
    resetEmail();
    resetAge();
    resetPassword();
    dispatch(createUser(form));
  };

  return (
    <div className="flex flex-col items-center text-white pt-[15vh]">
      <h2 className="text-white text-4xl font-bold mb-4 px-8 py-1 border-4 border-white/20 rounded-3xl">
        Register :
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-2 p-4 border-4 border-white/20 rounded-3xl text-center"
      >
        <div className="flex flex-col">
          First Name :
          <input {...firstName} className="text-black" />
        </div>
        <div className="flex flex-col">
          Last Name :
          <input {...lastName} className="text-black" />
        </div>
        <div className="flex flex-col">
          Email :
          <input {...email} className="text-black" />
        </div>
        <div className="flex flex-col">
          Age :
          <input {...age} className="text-black" />
        </div>
        <div className="flex flex-col">
          Password :
          <div className="relative flex text-black items-center">
            <PasswordField password={password} />
          </div>
        </div>
        <button
          className="capitalize border-2 border-white bg-blue-800 text-white rounded-full"
          type="submit"
        >
          create account
        </button>
      </form>
      <div className="text-white font-bold">
        Already have an account ? Log in{" "}
        <button
          onClick={() => navigate("/")}
          className="text-black/80 hover:text-white/50"
        >
          {" "}
          here
        </button>
      </div>
    </div>
  );
};

export default Register;
