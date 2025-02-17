import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { getSingleWorkerAction } from "../../action/auth_admin/AdminMaintainAction";
import { getUserBookingAction } from "../../action/auth_user/UserBookingAction";
const WorkerServices = ({ workerId,setActiveTab, setMenuOpen }) => {
  const dispatch = useDispatch();
  const { singleworker } = useSelector((state) => state.sigleWorkerState);
  useEffect(() => {
    dispatch(getSingleWorkerAction(workerId));
  }, [dispatch, workerId]);

  useEffect(() => {
    dispatch(getUserBookingAction(workerId));
  }, [dispatch, workerId]);

  return (
    <div
      style={{ scrollbarWidth: "none" }}
      className="min-h-[300px]"
    >
      <section className=" mt-0  md:-mt-14">
        <div className="w-full lg:w-[100%]   md:w-2/3 md:px-4 px-0 mx-auto">
          <div className="flex flex-col w-full min-w-0 mt-10  text-black break-words bg-white ">
          <div onClick={()=>[setActiveTab('profile'),setMenuOpen(true)]} className="md:mt-0 mt-5 cursor-pointer"><ArrowCircleLeftIcon style={{fontSize:'30px',border:'1px solid gray'}}/></div>
            <div className="m-5">
              <section className="rounded-md group-2 w-full mt-[5px] px-7 md:w-[100%] py-1 antialiased min-h-[710px]  md:py-0">
                <div className="px-4 mx-auto border-gray-500 max-w-screen-2xl 2xl:px-0">
                  <div className="mx-auto max-w-7xl">
                    <div>
                      <div className="flex-col w-full min-w-96 gap-4 text-center border border-black rounded-md sm:flex sm:items-center sm:justify-between">
                        <h2 className="w-full font-serif text-xl font-semibold text-center text-gray-900 sm:text-2xl">
                          {singleworker?.worker?.username}
                        </h2>
                        <p className=" text-[10px] md:w-[60%] py-4 md:-mt-5 -mt-1">
                          {singleworker?.worker?.profile_description}
                        </p>
                      </div>
                    </div>
                    <div className="py-4">
                      <div className="flow-root  mt-2 sm:mt-8">
                        {singleworker?.worker?.services?.length > 0 && (
                          <>
                            <div className="w-full gap-2  md:text-center sm:flex sm:items-center sm:justify-between">
                              <h4 className="w-full font-semibold text-center text-gray-900 border  md:text-lg sm:text-2xl">
                                Your Services Lists
                              </h4>
                            </div>
                            <div className="">
                              {singleworker?.worker?.services?.map((item) => (
                                <li>{item.service?.name}</li>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkerServices;
