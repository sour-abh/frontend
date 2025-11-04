import React from "react";
import Button from "../components/ui/Button";
import { Eye, EyeClosed, X } from "lucide-react";
import ApiResources from "../api/APIEndpoint";

// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
interface SignupProps{
  handleLoginModel:()=>void;
  handleChange:()=>void;
  handleReload:()=>void;
}
const Signup:React.FC<SignupProps> = ({handleLoginModel,handleChange,handleReload}) => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const handleSubmit = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const data = { email, password,name };
      const res = await ApiResources.user.signup(data);

      if (
        res.status === 200 &&
        (
          res.data.message === "you have signed up successfully,pls login")
      ) {
        setError(res.data.message || "successfully signedIn pls login in");
        handleReload()
        handleLoginModel()
        
      }
      if (res.status !== 200) {
        // Backend returned a validation error or auth error
        setError(res.data.message || "Already Registered.");
      }
    } catch (err) {
      console.log(err);
      setError(String(err));
    }
  };
  return (
    <>
      <div className="bg-purple-100/70 px-2 w-full h-screen flex items-center justify-center inset-0 top-0 left-0 fixed z-200">
        <div className="bg-white rounded-md border-gray-300 border-1 shadow-xl max-w-lg w-full flex flex-col gap-4  justify-between  p-4 py-6">
          <div className="flex flex-row justify-between mx-4 items-center">
            <h2 className="text-gray-700/80 text-2xl font-semibold">SignUp</h2>
            <X
              className="text-gray-700/70 stroke-3 size-5 cursor-pointer"
              onClick={handleChange}
            />
          </div>
          <div className="">
            <p className="text-purple-500 text-start text-sm">{error}</p>
          </div>
          <input
            type="text"
            className=" w-full rounded-sm outline-none border border-gray-300 focus-visible:border-purple-500 focus-visible:ring-purple-500/50 focus-visible:ring-[3px] bg-white placeholder:text-gray-600 indent-2 text-gray-700 text-base font-normal h-9"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className=" w-full rounded-sm outline-none border border-gray-300 focus-visible:border-purple-500 focus-visible:ring-purple-500/50 focus-visible:ring-[3px] bg-white placeholder:text-gray-600 indent-2 text-gray-700 text-base font-normal h-9"
            placeholder="UserName"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative w-full">
            <input
              type={`${showPassword ? `text` : `password`}`}
              className=" w-full rounded-sm outline-none border border-gray-300 focus-visible:border-purple-500 focus-visible:ring-purple-500/50 focus-visible:ring-[3px] bg-white placeholder:text-gray-600 indent-2 text-gray-700 text-base font-normal h-9 mb-5"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute top-1 right-1 transition-all duration-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <Eye className="size-7 text-purple-500" />
              ) : (
                <EyeClosed className="size-7 text-purple-500" />
              )}
            </div>
          </div>
          <Button
            variant="primary"
            size="md"
            text="Signin"
            className="w-full"
            onClick={handleSubmit}
          />
          <div className="text-center">
            <p className=" text-gray-500 font-normal text-sm">
              Already, have Account?
              <span
                className=" text-gray-500  font-semibold mx-1 cursor-pointer hover:text-gray-700 "
                onClick={handleLoginModel}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
