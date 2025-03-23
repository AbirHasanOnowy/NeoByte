import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";



  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      if (res.error) {
        toast.error(res.error);
        return;
      }
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };


  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

          <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isPasswordVisible ? (
                <FaRegEye
                  onClick={() => setIsPasswordVisible(false)}
                  className="relative left-[92%] -top-8 cursor-pointer text-black w-6 h-6 z-10"
                ></FaRegEye>
              ) : (
                <FaRegEyeSlash
                  onClick={() => setIsPasswordVisible(true)}
                  className="relative left-[92%] -top-8 cursor-pointer text-black w-6 h-6 z-10"
                ></FaRegEyeSlash>
              )}
            </div>
            <div>
              <button disabled={isLoading} type="submit" className="mt-4 inline transition-colors duration-600 bg-gradient-to-r from-green-400 to-blue-500 hover:from-red-500 hover:to-purple-600 active:from-pink-500 active:to-yellow-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] hover:bg-pink-600">
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
              {isLoading && <Loader />}
            </div>
          </form>

          <div className="mt-4">
            <p className="text-white">
              New Customer ? {" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="transition-colors duration-600 text-blue-700 hover:underline hover:text-purple-700"
              >
                Register
              </Link>
            </p>
          </div>


        </div>
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
          alt=""
          className="h-[65rem] w-[55%] xl:block md:hidden sm:hidden rounded-lg"
        />
      </section >
    </div >
  );
};

export default Login;
