import React, {useState} from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrFormClose } from "react-icons/gr";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

function SideNavbar({darkModeHandler, dark}) {
  const [modalOpen, setModalOpen] = useState(false)
  const test = () => {
    setModalOpen(!modalOpen)
    // setTimeout(() => setModalOpen(false), 1000);
  }
  return (
    <div className="helvetica">
       <div onClick={test} className="absolute top-6 right-4 inline-flex items-center peer justify-start rounded-md p-2 text-gray-800 hover:bg-gray-900">
        {modalOpen?
        <GrFormClose className="block lg:hidden h-6 w-6 z-50" aria-hidden="true"/> :
          <GiHamburgerMenu className="block lg:hidden h-6 w-6 z-50" aria-hidden="true"/>
        }
        </div>
      <div className= {` ${modalOpen ? 'transition-colors duration-1000 bg-blue-500' : 'hidden lg:block'}`}>
        <div onClick= {()=> setModalOpen(!modalOpen)} className="overflow-y-auto p-6 w-1/2 h-screen z-20 fixed top-0 lg:left-0 md:w-1/3 lg:w-1/6 peer-focus:left-0 peer:transition ease-out delay-250 duration-1000 bg-white dark:bg-blue-900 border-r-2 border-gray-100">
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-1xl lg:text-2xl cursor-pointer font-bold text-blue-500 border-b border-gray-100 pb-4 w-full sora">
              Estate Helper
            </h1>
            <div className=" my-3 border-b border-gray-100 pb-4">
              <Link to={`/`} className="flex py-3 mb-2 justify-start items-center gap-4 pl-5 hover:bg-blue-200 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineSpaceDashboard className="text-2xl text-blue-600 group-hover:text-white " />
                <h3 className="text-base text-gray-500 group-hover:text-blue-500 font-normal">
                  Dashboard
                </h3>
              </Link>
              <div className="flex py-3 mb-2 justify-start items-center gap-4 pl-5 hover:bg-blue-200 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <CgProfile className="text-2xl text-blue-600 group-hover:text-white " />
                <h3 className="text-base text-gray-500 group-hover:text-blue-500 font-normal">
                  Products
                </h3>
              </div>
              <Link to={`/consultant`} className="flex py-3 mb-2 justify-start items-center gap-4 pl-5 hover:bg-blue-200 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <FaRegComments className="text-2xl text-blue-600 group-hover:text-white " />
                <h3 className="text-base text-gray-500 group-hover:text-blue-500 font-normal">
                  Consultants
                </h3>
              </Link>
              <Link to={`/consultant`} className="flex py-3 mb-2 justify-start items-center gap-4 pl-5 hover:bg-blue-200 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <FaRegComments className="text-2xl text-blue-600 group-hover:text-white " />
                <h3 className="text-base text-gray-500 group-hover:text-blue-500 font-normal">
                  Consultant Groups
                </h3>
              </Link>
              <Link to={`/client`} className="flex py-3 mb-2 justify-start items-center gap-4 pl-5 hover:bg-blue-200 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineAnalytics className="text-2xl text-blue-600 group-hover:text-white " />
                <h3 className="text-base text-gray-500 group-hover:text-blue-500 font-normal">
                  Clients
                </h3>
              </Link>
              <Link to={`/client`} className="flex py-3 mb-2 justify-start items-center gap-4 pl-5 hover:bg-blue-200 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineAnalytics className="text-2xl text-blue-600 group-hover:text-white " />
                <h3 className="text-base text-gray-500 group-hover:text-blue-500 font-normal">
                  Account
                </h3>
              </Link>
              <div className="flex py-3 mb-2 justify-start items-center gap-4 pl-5 hover:bg-blue-200 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <BiMessageSquareDots className="text-2xl text-blue-600 group-hover:text-white " />
                <h3 className="text-base text-gray-500 group-hover:text-blue-500 font-normal">
                  Notifications
                </h3>
              </div>
              <div className="flex py-3 mb-2 justify-start items-center gap-4 pl-5 hover:bg-blue-200 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineIntegrationInstructions className="text-2xl text-blue-600 group-hover:text-white " />
                <h3 className="text-base text-gray-500 group-hover:text-blue-500 font-normal">
                  Self Service
                </h3>
              </div>
            </div>
            {/* setting  */}
            <div className="my-3 border-b border-gray-100 pb-4">
              <div className="flex py-3 mb-2 justify-start items-center gap-4 pl-5 hover:bg-blue-200 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineSettings className="text-2xl text-blue-600 group-hover:text-white " />
                <h3 className="text-base text-gray-500 group-hover:text-blue-500 font-normal">
                  Settings
                </h3>
              </div>
              <div className="flex py-3 mb-2 justify-start items-center gap-4 pl-5 hover:bg-blue-200 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineMoreHoriz className="text-2xl text-blue-600 group-hover:text-white " />
                <h3 className="text-base text-gray-500 group-hover:text-blue-500 font-normal">
                  More
                </h3>
              </div>
            </div>
            {/* logout */}
              <div className="my-3 pb-4">
                <div onClick={darkModeHandler} className="flex py-4 mb-2 justify-start items-center gap-4 pl-5 dark:hover:bg-blue-200 hover:bg-blue-200 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  {dark? <IoSunny className="text-2xl text-blue-600 group-hover:text-white " /> : <IoMoon className="text-2xl text-blue-600 group-hover:text-white " />}
                  <h3 className="text-base text-gray-500 dark:text-gray-500 group-hover:text-blue-500  dark:group-hover:text-blue-500  font-normal  ">
                    {dark? 'Light Mode' : 'Dark Mode'}
                  </h3>
                </div>
                <div className="flex py-4 mb-2 justify-start items-center gap-4 pl-5 hover:bg-blue-200 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                    <CgProfile className="text-2xl text-blue-600 group-hover:text-white " />
                    <h3 className="text-base text-gray-500 group-hover:text-blue-500 font-normal">
                      Profile
                    </h3>
                  </div>
                <div className="flex py-4 mb-2 justify-start items-center gap-4 pl-5 hover:bg-red-500 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <MdOutlineLogout className="text-2xl text-red-600 group-hover:text-white " />
                  <h3 className="text-base text-red-500 group-hover:text-white font-normal ">
                    Logout
                  </h3>
                </div>
              </div>
   
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNavbar;