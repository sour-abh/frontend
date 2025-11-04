import React from 'react'
import Button from '../components/ui/Button'
import { Eye, EyeClosed, X } from 'lucide-react';
import ApiResources from '../api/APIEndpoint';
import {login} from '../redux/AuthSlice';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
interface SigninProps {
  handleSignupModel: () => void;
  handlechange:()=>void;
  handleReload:()=>void;
}
const Signin:React.FC<SigninProps> = ({handleSignupModel,handlechange,handleReload}) => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const[showPassword,setShowPassword]=React.useState(false)
    const [email,setEmail]=React.useState("")
    const [password,setPassword]=React.useState("")
    const [error,setError]=React.useState("")
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try {
        
        const data={email,password}
        const res = await ApiResources.user.login(data)
              if (res.status === 200 || res.status === 201) {
                setError(res.data.message||"successfully logged in ")
                handleReload()
                dispatch(
                  login({
                    user: res.data.user,
                    token: res.data.token,
                    isLoggedIn: true,
                  })
                );
                navigate("/",{replace:true})
              }
        if (res.status!== 200) {
          // Backend returned a validation error or auth error
          setError(res.data.message || "Authentication failed.");
        }
      } catch(err) {
        console.log(err);
        setError(String(err))
      }
    };
  return (
    <>
      <div className="bg-purple-100/70 px-2 w-full h-screen flex items-center justify-center inset-0 top-0 left-0 fixed z-200 ">
        <div className="bg-white rounded-md border-gray-300 border-1 shadow-xl max-w-lg w-full flex flex-col gap-4  justify-between  p-4 py-6">
          <div className="flex flex-row justify-between items-center px-4">
            <h2 className="text-black/80 text-2xl font-semibold">SignIn</h2>
            <X
              className="text-gray-800/70 stroke-3 size-5 cursor-pointer"
              onClick={handlechange}
            />
          </div>

          <div className="">
            <p className="text-purple-500 text-start text-sm">{error}</p>
          </div>
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
          <div>
            <p className="text-gray-500 font-normal text-sm text-center">
              Don&apos;t have Account?
              <span
                className=" text-gray-500 cursor-pointer font-semibold mx-1 hover:text-gray-700 "
                onClick={handleSignupModel}
              >
                Signup
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin

