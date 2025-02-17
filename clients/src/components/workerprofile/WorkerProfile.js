import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleWorkerAction } from "../../action/auth_admin/AdminMaintainAction";
import { getUserBookingAction } from "../../action/auth_user/UserBookingAction";
const WorkerProfile = ({ workerId }) => {
  const dispatch = useDispatch();
  const { singleworker } = useSelector((state) => state.sigleWorkerState);
  useEffect(() => {
    dispatch(getSingleWorkerAction(workerId));
  }, [dispatch, workerId]);

  useEffect(() => {
    dispatch(getUserBookingAction(workerId));
  }, [dispatch, workerId]);

  return (
    <div style={{ scrollbarWidth: "none" }} className="min-h-[300px]">
      <section className=" mt-0  md:-mt-14">
        <div className="w-full lg:w-[100%]   md:w-2/3 md:px-4 px-0 mx-auto">
          <div className="flex flex-col w-full min-w-0 mt-10  text-black break-words bg-white ">
            <div className="m-5">
              <section className="rounded-md group-2 w-full mt-[40px] px-7 md:w-[100%] py-1 antialiased min-h-[710px]  md:py-0">
                <div className="px-4 mx-auto border-gray-500 max-w-screen-2xl 2xl:px-0">
                  <div className="mx-auto max-w-7xl">
                    <div>
                      <div className="flex-col w-full min-w-96 gap-3 text-center border border-black rounded-md sm:flex sm:items-center sm:justify-between">
                        <h2 className="w-full font-serif text-xl font-semibold text-center text-gray-900 sm:text-2xl">
                          {singleworker?.worker?.username}
                        </h2>
                        <p className=" text-[10px] md:w-[60%] py-3 md:-mt-4 -mt-1">
                          {singleworker?.worker?.profile_description}
                        </p>
                      </div>
                      <div className="mt-5  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div className=" col-span-2">
                          <h3 className="my-3  text-lg ">
                            Phone:
                            <span>{singleworker?.worker?.phone_number}</span>
                          </h3>
                          <h3 className="my-3 text-lg ">
                            Gender:<span>{singleworker?.worker?.gender}</span>
                          </h3>
                          <h3 className="my-3 text-lg ">
                            Birthday:
                            <span>{singleworker?.worker?.birthday}</span>
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
                            Religion:
                            <span>{singleworker?.worker?.religion}</span>
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
                        <div className="mt-2 col-span-2 h-96 overflow-auto  w-full">
                          {singleworker?.worker?.education_qualification?.map(
                            (item) => (
                              <>
                                <h1 className="font-bold p-2 w-full items-center bg-gray-50 border">
                                  Education Qualification
                                </h1>
                                <div className="m-2 gap-1">
                                  <b>Institute</b>:{" "}
                                  <span>{item.institute}</span>
                                  <hr />
                                  <b>Degree</b>:{" "}
                                  <span>{item.degree}</span>
                                  <hr />
                                  <b>Education Level</b>:{" "}
                                  <span>{item.education_level}</span>
                                  <hr />
                                  <b>Major Subject</b>:{" "}
                                  <span>{item.major_subject}</span>
                                  <hr />
                                  <b>Board University</b>:{" "}
                                  <span>{item.board_university}</span>
                                  <hr />
                                  <b>Accreditation</b>:{" "}
                                  <span>{item.accreditation}</span>
                                  <hr />
                                  <b>Admission_year</b>:{" "}
                                  <span>{item.admission_year}</span>
                                  <hr />
                                  <b>Graduation_year</b>:{" "}
                                  <span>{item.graduation_year}</span>
                                  <hr />
                                  <b>Gpa Or Cgpa</b>:{" "}
                                  <span>{item.gpa_cgpa}</span>
                                  <hr />
                                  <b>Honors Awards</b>:{" "}
                                  <span>{item.honors_awards}</span>
                                  <hr />
                                  <b>Location</b>:{" "}
                                  <span>{item.location}</span>
                                  <hr />
                                </div>
                              </>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="py-4">
                      {/* <div className="flow-root  mt-2 sm:mt-8">
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
                      </div> */}
                      {/* <div className="flow-root mt-2 sm:mt-8">
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
                      </div> */}
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

export default WorkerProfile;
