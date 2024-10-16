import { useEffect } from "react";
import useMainStore from "../../store/useMainStore.ts"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const { user, signOut } = useMainStore();

  useEffect(() => {
    if (!user) {
      navigate("/signin")
    }
  }, [user, navigate])

  return (
    <div
      onClick={signOut}
      className="flex flex-col items-center min-h-screen justify-center bg-zinc-900">
      <div className="p-5 bg-white rounded-full">
        <h1 className="text-black text-center` text-2xl">
          Log Out
        </h1>
      </div>
    </div>
  );
};

export default Home;
