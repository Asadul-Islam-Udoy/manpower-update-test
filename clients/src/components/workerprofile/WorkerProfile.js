import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { getSingleWorkerAction } from "../../action/auth_admin/AdminMaintainAction";
import { getUserBookingAction } from "../../action/auth_user/UserBookingAction";
const WorkerProfile = ({ workerId }) => {
  const dispatch = useDispatch();
  const { personalBooking } = useSelector(
    (state) => state.userpersonalBookingState
  );
  const { singleworker } = useSelector((state) => state.sigleWorkerState);
  useEffect(() => {
    dispatch(getSingleWorkerAction(workerId));
  }, [dispatch, workerId]);

  useEffect(() => {
    dispatch(getUserBookingAction(workerId));
  }, [dispatch, workerId]);

  console.log("workerId", personalBooking);
  return (
    <div
      style={{ scrollbarWidth: "none" }}
      className="h-screen overflow-hidden "
    >
      <section className="min-h-screen mt-0 md:pt-10 md:-mt-20">
        <div className="w-full lg:w-[100%]   md:w-2/3 px-4 mx-auto">
          <div className="flex flex-col w-full min-w-0 mt-16 mb-6 overflow-y-scroll text-black break-words bg-white rounded-lg shadow-xl md:min-h-screen">
            <div className="m-5">
              <section className="rounded-md group-2 w-full mt-[24px] px-7 md:w-[100%] py-8 antialiased min-h-screen  md:py-0">
                <div className="px-4 mx-auto border-gray-500 max-w-screen-2xl 2xl:px-0">
                  <div className="mx-auto max-w-7xl">
                    <div>
                      <div className="flex-col w-full gap-4 text-center bg-blue-100 rounded-md sm:flex sm:items-center sm:justify-between">
                        <h2 className="w-full font-serif text-xl font-semibold text-center text-gray-900 sm:text-2xl">
                          {singleworker?.worker?.username}
                        </h2>
                        <span className="w-full font-bold text-center">
                          {singleworker?.worker?.phone_or_email}
                        </span>
                        <p className=" text-[10px] md:w-[60%]">
                          {singleworker?.worker?.profile_description}
                        </p>
                      </div>
                      <div className="mt-5">
                        <h3 className="my-3 text-lg ">
                          Phone:
                          <span>{singleworker?.worker?.phone_number}</span>
                        </h3>
                        <h3 className="my-3 text-lg ">
                          Gender:<span>{singleworker?.worker?.gender}</span>
                        </h3>
                        <h3 className="my-3 text-lg ">
                          Birthday:<span>{singleworker?.worker?.birthday}</span>
                        </h3>
                        <h3 className="my-3 text-lg ">
                          Blood Group:
                          <span>{singleworker?.worker?.blood_group}</span>
                        </h3>
                        <h3 className="my-3 text-lg ">
                          Nationality:
                          <span>{singleworker?.worker?.nationality}</span>
                        </h3>
                        <h3 className="my-3 text-lg ">
                          Ratings:<span>{singleworker?.worker?.ratings}</span>
                        </h3>
                        <h3 className="my-3 text-lg ">
                          Relationship:
                          <span>{singleworker?.worker?.relationship}</span>
                        </h3>
                        <h3 className="my-3 text-lg ">
                          Religion:<span>{singleworker?.worker?.religion}</span>
                        </h3>
                        <h3 className="my-3 text-lg ">
                          Free:<span>{singleworker?.worker?.is_free}</span>
                        </h3>
                        <h3 className="my-3 text-lg ">
                          Languages:
                          <span>
                            {singleworker?.worker?.languages?.map(
                              (item, index) => (
                                <span>
                                  {item}
                                  {singleworker?.worker?.languages?.length !==
                                    index + 1 && ","}
                                </span>
                              )
                            )}
                          </span>
                        </h3>
                      </div>
                    </div>
                    <div className="py-4">
                      <div className="flow-root mt-2 sm:mt-8">
                        {singleworker?.worker?.services?.length > 0 && (
                          <>
                            <div className="w-full gap-2 md:text-center sm:flex sm:items-center sm:justify-between">
                              <h4 className="w-full font-semibold text-center text-gray-900 border  md:text-lg sm:text-2xl">
                                Your Services Lists
                              </h4>
                            </div>
                            <div>
                              {singleworker?.worker?.services?.map((item) => (
                                <li>{item.service?.name}</li>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flow-root mt-2 sm:mt-8">
                        <div className="w-full gap-2 md:text-center sm:flex sm:items-center sm:justify-between">
                          <h4 className="w-full font-semibold text-center text-gray-900 border  md:text-lg sm:text-2xl">
                            Your Booking Lists
                          </h4>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                          {personalBooking?.map((item) => (
                            <>
                              {item.is_payment_status !== "Pending" && (
                                <div className="flex flex-wrap items-center py-6 gap-y-4">
                                  <dl className="w-1/2 p-3 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                                      Service Name:
                                    </dt>
                                    {item?.services.map((i) => (
                                      <dd className="mt-1.5 text-[10px]  text-gray-900  ">
                                        {i.service.name}
                                      </dd>
                                    ))}
                                  </dl>
                                  <dl className="w-1/2 p-3 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                                      Booking Start Date:
                                    </dt>
                                    <dd className="mt-1.5 text-[10px]  text-gray-900  ">
                                      {item.createdAt}
                                    </dd>
                                  </dl>
                                  <dl className="w-1/2 p-3 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                                      Booking End Date:
                                    </dt>
                                    <dd className="mt-1.5 text-[10px]  text-gray-900  ">
                                      {item.end_date}end_date
                                    </dd>
                                  </dl>
                                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                                      Status:
                                    </dt>
                                    <dd
                                      style={{
                                        color:
                                          item.is_payment_status == "Cancelled"
                                            ? "red"
                                            : item.is_payment_status ==
                                              "Completed"
                                            ? "white"
                                            : "blue",
                                        backgroundColor:
                                          item.is_payment_status == "Cancelled"
                                            ? "pink"
                                            : item.is_payment_status ==
                                              "Completed"
                                            ? "green"
                                            : "gold",
                                      }}
                                      className="me-2  mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                                    >
                                      {item.is_payment_status == "Cancelled" ? (
                                        <svg
                                          className="w-3 h-3 me-1"
                                          aria-hidden="true"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M6 18 17.94 6M18 18 6.06 6"
                                          />
                                        </svg>
                                      ) : (
                                        <>
                                          <svg
                                            className="w-3 h-3 me-1"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              stroke="currentColor"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              stroke-width="2"
                                              d="M5 11.917 9.724 16.5 19 7.5"
                                            />
                                          </svg>
                                          {item.is_payment_status !==
                                            "Completed" && (
                                            <svg
                                              className="w-3 h-3 me-1"
                                              aria-hidden="true"
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                                              />
                                            </svg>
                                          )}
                                        </>
                                      )}

                                      {item.is_payment_status}
                                    </dd>
                                  </dl>
                                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1 group">
                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                                      Review:
                                    </dt>
                                    <dd className="mt-1.5 text-base font-semibold text-gray-900  ">
                                      <ReactStars
                                        count={5}
                                        value={item.ratings}
                                        size={14}
                                        activeColor="#ffd700"
                                        isHalf={true}
                                        emptyIcon={
                                          <i className="far fa-star"></i>
                                        }
                                        halfIcon={
                                          <i className="fa fa-star-half-alt"></i>
                                        }
                                        fullIcon={
                                          <i className="fa fa-star"></i>
                                        }
                                      />
                                    </dd>
                                  </dl>
                                </div>
                              )}
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* {showModal && (
        <CreateClientProfile
          handleCloseModal={handleCloseModal}
          initialData={clientProfile}
          handleSaveProfile={handleSaveProfile}
        />
      )} */}
    </div>
  );
};

export default WorkerProfile;