import { useNavigate } from "react-router-dom";
import useMainStore from "../../store/useMainStore.ts"
import { useEffect } from "react";

const SignIn = () => {

  const { signIn, authErrorResponse, user } = useMainStore()

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-row items-center justify-between">
      <div className="bg-black flex p-5 w-1/2 min-h-screen flex-col rounded-xl">
      </div>
      <div className="flex flex-1 p-5 w-1/2 flex-col items-center justify-center">
        <div>
          <h1 className="text-white text-5xl mb-4">
            Sign In
          </h1>
          <h1 className="text-xl text-gray-400">
            Use mail or username along with <br></br> the password to log in!
          </h1>
          <form className="mt-5 flex flex-col gap-4" onSubmit={signIn}>
            <input placeholder="username" name="username" className="bg-zinc-800 border-2 border-gray-500 rounded-full px-5 py-3 text-white placeholder-gray-400" />
            <div className="flex flex-row items-center justify-center gap-2 px-2">
              <hr className="flex-auto"></hr>
              <h1 className="text-center text-xl text-gray-400 -my-3">
                or
              </h1>
              <hr className="flex-auto"></hr>
            </div>
            <input placeholder="mail" name="mail" className="bg-zinc-800 border-2 border-gray-500 rounded-full py-3 px-5 text-white placeholder-gray-400" />
            <input placeholder="password" name="password" className="bg-zinc-800 border-2 border-gray-500 rounded-full py-3 px-5 text-white placeholder-gray-400" />
            {authErrorResponse ? (
              <h1 className="text-lg text-white">
                {authErrorResponse}
              </h1>
            ) : null}
            <button formAction='submit' className="rounded-full p-5 bg-white flex items-center justify-center flex-col">
              <h1 className="text-black text-xl">
                Log In
              </h1>
            </button>
            <div className="flex flex-row items-center justify-center gap-2 px-2">
              <hr className="flex-auto"></hr>
              <h1 className="text-center text-xl text-gray-400 -my-3">
                or
              </h1>
              <hr className="flex-auto"></hr>
            </div>
          </form>
          <div className="mt-4 rounded-full flex flex-row items-center justify-center p-5 bg-black">
            <h1 className="text-white text-center text-xl">
              Sign Up
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn