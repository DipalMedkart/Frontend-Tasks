import { Divide } from "lucide-react";
import DashboardBar from "@/components/DashboardBar";
import Navbar from "@/components/Navbar";
import Layout from "@/components/Layout";
import { useSelector } from "react-redux";

export default function Home() {

  const name = useSelector((state) => state.auth.user?.name);

  return (
    <>
      
      <div className="flex items-left  h-screen bg-white w-11/12 mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800  my-10">
          Welcome, <span className="text-[#5556a6]">{name ? name : "User"}!</span>
        </h1>
      </div>
    </>
  )
}
