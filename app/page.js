import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "./PrimaryButton";
export default function Home() {
  return (    
      <div className="h-full w-full flex justify-center items-center  font-mono">
        <h1  className="absolute top-5 left-5 text-3xl">PROJECT NAME </h1>
      <form className="grid grid-rows-3 items-center h-[67%] w-[33%] border-2 rounded-md border-[#F0F0F0] bg-[#FFFFFF] px-5 py-10   ">
        <div className=" top-12 flex flex-col gap-5 justify-center items-center">
          <h1 className="text-5xl text-[#2D3748]">Login </h1>
          <div className="flex flex-col items-center">
            <h1 className=" text-gray-500">New to Eraser?</h1>
            <h1><Link href="/" className="text-blue-500 underline ">Signup for free</Link></h1>
          </div>
          
        </div>
        
        <div className="flex justify-center text-gray-400"><span>------------------or------------------</span></div>
        
        <div className=" bottom-16  flex flex-col gap-3 px-14">
          
          <PrimaryButton 
          icon = {<i class="fa-brands fa-google"></i> }
          button_text = "Sign Up with google"/>
          
          <PrimaryButton 
          icon = {<i class="fa-solid fa-message"></i> }
          button_text = "Sign Up with Mobile OTP"/>
          
          
        </div>
        
        
        
      </form>
    </div>
    
    
  );
}
