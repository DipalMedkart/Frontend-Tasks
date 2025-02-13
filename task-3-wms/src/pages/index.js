import { useSelector } from "react-redux";
import auth from "@/hoc/auth";

 function Home() {

  const name = useSelector((state) => state.auth.user?.name);

  return (
    <>
      
      <div className="flex items-left  h-screen bg-white w-10/12 mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 my-4">
          Welcome, <span className="text-[#5556a6]">{name ? name : "User"}!</span>
        </h1>
      </div>
    </>
  )
}
export default auth(Home)
