import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserlogoutAction } from "../../action/auth_user/UserAction";

export default function MenuCustomList({ clientInfo }) {
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();

  ///logout method
  const logoutHandler = () => {
    dispatch(UserlogoutAction());
  };

  return (
    <>
      <div class="flex -mt-1 items-center gap-10 justify-center relative">
        <Link
          onClick={() => setOpenMenu((pre) => !pre)}
          class=" bg-white rounded-full px-3.5 py-[6px] m-1 overflow-hidden relative group cursor-pointer border-[1.6px] font-medium border-[#25a267] text-[#25a267] "
        >
          <span class="absolute   w-64 h-0  transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#25a267] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
          <span class="relative italic font-serif -mt-[20px] text-[#25a267] transition duration-300 group-hover:text-white ease">
            Dashboard
          </span>
        </Link>
        {openMenu && (
          <div className="w-auto absolute  text-gray-400 italic flex rounded-sm flex-col  bg-[#25a267] mt-32 p-3">
            <Link
            to={clientInfo?.user?.userType == 'worker'?`/profile/worker/my/manpower/${clientInfo?.user?._id}`:`/user/profile/${clientInfo?.user?._id}`}
              className="m-1 bg-white hover:text-white text-[#25a267]  hover:bg-[#25a267]  hover:rounded-sm border pl-4 pr-4"
            >
              profile
            </Link>
            <Link
              onClick={logoutHandler}
              className="m-1 bg-white text-[#25a267]  hover:bg-[#25a267] hover:text-white border pl-4 pr-4"
            >
              logout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
