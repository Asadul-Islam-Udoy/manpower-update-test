import React, { useContext, useEffect, useRef, useState } from "react";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./worker_profile.css";
import { getSingleWorkerAction } from "../../action/auth_admin/AdminMaintainAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { Localhost } from "../../action/host/HostConnection";
import Avatar from "@mui/material/Avatar";
import { toast } from "react-toastify";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme } from "@emotion/react";
const WorkerProfile = () => {
  const contentRef = useRef();
  const [imageLoaded, setImageLoaded] = useState(false);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isSidebar, setIsSidebar] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleworker } = useSelector((state) => state.sigleWorkerState);
  const { isUpdateWorker, error } = useSelector(
    (state) => state.allworkerState
  );
  const { userInfo } = useSelector((state) => state.loginState);
  useEffect(() => {
    dispatch(getSingleWorkerAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isUpdateWorker) {
      toast.success("worker is free update successfully!");
    }
  }, [isUpdateWorker, error, toast]);

  let Five = 0;
  let Four = 0;
  let Thire = 0;
  let Two = 0;
  let One = 0;

  singleworker?.reviews?.forEach((item) => {
    if (item.rating === 5) {
      Five += 1;
    }
    if (item.rating === 4) {
      Four += 1;
    }
    if (item.rating === 3) {
      Thire += 1;
    }
    if (item.rating === 2) {
      Two += 1;
    }
    if (item.rating === 1) {
      One += 1;
    }
  });

  //download pdf file
  const handleDownloadPDF = () => {
    if (!imageLoaded) {
      alert("Please wait for the image to load.");
      return;
    }
    const input = contentRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      let imgWidth = 210;
      let pageHeight = 297;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save("resume.pdf");
    });
  };
  const imageUrl =
    Localhost +
    "/images/avatars/" +
    encodeURIComponent(singleworker?.worker?.avatar);

    
  return (
    <>
      <div className="sidbar__app">
        <Sidebar isSidebar={isSidebar} />
        <div
          className={
            theme.palette.mode === "dark"
              ? "sidbar__content"
              : "sidbar__container__2"
          }
        >
          <Topbar setIsSidebar={setIsSidebar} />

          <div className="max-w-screen-lg p-4 mx-auto my-8 text-gray-800 bg-gray-100">
            <div className="cursor-pointer" onClick={handleDownloadPDF}>
              <li class="flex  items-center justify-center font-bold py-2 space-x-4 border bg-blue-600  hover:bg-blue-700 text-white duration-500 rounded-md">
                <span>Download CV</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="w-4 h-4"
                >
                  <path
                    fill="currentColor"
                    d="M13 10h5l-6 6l-6-6h5V3h2zm-9 9h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2z"
                  ></path>
                </svg>
              </li>
            </div>
            <div
              ref={contentRef}
              style={{
                padding: "20px",
                backgroundColor: "#f3f4f6",
                color: "#333",
                borderRadius: "8px",
                fontFamily: "Arial, sans-serif",
                width: "100%",
                maxWidth: "1000px",
                margin: "0 auto",
              }}
              className="grid grid-cols-3 gap-4"
            >
              <div className="">
                <div className="mb-4 bg-white rounded-md">
                  <div className="relative w-full flex items-center justify-center">
                    {singleworker?.worker?.avatar ? (
                      <>
                        <img
                          className="w-[200px] h-[200px] mt-4 rounded-full"
                          src={imageUrl}
                          alt="Profile"
                          width="100"
                          crossOrigin="anonymous"
                          onLoad={() => setImageLoaded(true)}
                          onError={(e) => {
                            console.error("Image failed to load!", e);
                            alert("Failed to load image.");
                          }}
                        />
                      </>
                    ) : (
                      <Avatar />
                    )}
                  </div>

                  <div className="p-4">
                    <div className="">
                      <h1 className="font-bold text-gray-900">
                        {singleworker?.worker?.username ||
                          singleworker?.worker?.first_name +
                            " " +
                            singleworker?.worker?.last_name}
                      </h1>
                      {singleworker?.worker?.phone && (
                        <small>+88 {singleworker?.worker?.phone}</small>
                      )}
                      {singleworker?.worker?.phone_or_email && (
                        <small>{singleworker?.worker?.phone_or_email}</small>
                      )}
                    </div>

                    <div className="py-4 text-gray-600">
                      {singleworker?.worker?.profile_description}
                    </div>
                  </div>
                </div>

                <div className="mb-4 bg-white rounded-md">
                  <div className="p-4">
                    <h1 className="font-bold text-gray-900">General Info</h1>

                    <div className="text-gray-600">
                      <ul>
                        <li className="flex justify-between py-2 font-semibold border-b">
                          <span className="">NID Number:</span>
                          <span>{singleworker?.worker?.nid_number}</span>
                        </li>

                        <li className="flex justify-between py-2 font-semibold border-b">
                          <span>Birthday:</span>
                          <span>{singleworker?.worker?.birthday}</span>
                        </li>
                        {singleworker?.worker?.nationality ? (
                          <li className="flex justify-between py-2 font-semibold border-b">
                            <span>Nationality:</span>
                            <span>{singleworker?.worker?.nationality}</span>
                          </li>
                        ) : (
                          <li className="flex justify-between py-2 font-semibold border-b">
                            <span>Nationality:</span>
                            <span>Bangladesh</span>
                          </li>
                        )}
                        <li className="flex justify-between py-2 font-semibold border-b">
                          <span>Language:</span>
                          {singleworker?.worker?.languages.map((item) => (
                            <span>{item}</span>
                          ))}
                        </li>

                        <li className="flex justify-between py-2 font-semibold border-b">
                          <span>Blood Group:</span>
                          <span>{singleworker?.worker?.blood_group}</span>
                        </li>

                        <li className="flex justify-between py-2 font-semibold border-b">
                          <span>Gender:</span>
                          <span>{singleworker?.worker?.gender}</span>
                        </li>

                        <li className="flex justify-between py-2 font-semibold border-b">
                          <span>Religion:</span>
                          <span>{singleworker?.worker?.religion}</span>
                        </li>

                        <li className="flex justify-between py-2 font-semibold border-b">
                          <span>Experience:</span>
                          <span> 8 years </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mb-4 bg-white rounded-md ">
                  <div className="p-4">
                    <h1 className="font-bold text-gray-900">Address</h1>

                    <div className="text-gray-600">
                      <ul>
                        <li className="flex justify-between py-2 font-semibold border-b">
                          <span>Division:</span>
                          <span>{singleworker?.division?.division_name}</span>
                        </li>

                        <li className="flex justify-between py-2 font-semibold border-b">
                          <span>District:</span>
                          <span>{singleworker?.district?.district_name}</span>
                        </li>

                        <li className="flex justify-between py-2 font-semibold border-b">
                          <span>Upazila:</span>
                          <span>{singleworker?.upazila?.upazila_name}</span>
                        </li>

                        <li className="flex justify-between py-2 font-semibold border-b">
                          <span>Address:</span>
                          <span>{singleworker?.upazila?.others_address}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mb-4 bg-white rounded-md ">
                  <div className="p-4">
                    <h1 className="font-bold text-gray-900">
                      Emergency Contact
                    </h1>

                    <div className="text-gray-600">
                      <ul>
                        <li className="flex justify-between py-2 font-semibold border-b">
                          <span>Name:</span>
                          <span>
                            {singleworker?.worker?.emergency_contract?.name}
                          </span>
                        </li>

                        <li className="flex justify-between py-2 font-semibold border-b">
                          <span>Relationship:</span>
                          <span>
                            {
                              singleworker?.worker?.emergency_contract
                                ?.relationship
                            }
                          </span>
                        </li>

                        <li className="flex justify-between py-2 font-semibold border-b">
                          <span>Profession:</span>
                          <span>
                            {
                              singleworker?.worker?.emergency_contract
                                ?.profession
                            }
                          </span>
                        </li>

                        <li className="flex justify-between py-2 font-semibold border-b">
                          <span>Mobile:</span>
                          <span>
                            +880{" "}
                            {singleworker?.worker?.emergency_contract?.phone}
                          </span>
                        </li>

                        <li className="flex justify-between py-2 font-semibold border-b">
                          <span>Email:</span>
                          <span>
                            {singleworker?.worker?.emergency_contract?.email}
                          </span>
                        </li>

                        <li className="flex justify-between py-2 font-semibold border-b">
                          <span>Address:</span>
                          <span>
                            {singleworker?.worker?.emergency_contract?.address}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <div className="p-4 mb-4 bg-white rounded-md ">
                  <h1 className="mb-4 text-lg font-bold text-gray-900">
                    Education
                  </h1>
                  {singleworker?.worker?.education_qualification?.map(
                    (educ) => (
                      <div className="flex p-4 mb-4 space-x-2 duration-200 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            class="w-16 h-16"
                          >
                            <path
                              fill="currentColor"
                              d="M4 11.333L0 9l12-7l12 7v8.5h-2v-7.333l-2 1.166v6.678l-.223.275A9.983 9.983 0 0 1 12 22a9.983 9.983 0 0 1-7.777-3.714L4 18.011zM6 12.5v4.792A7.979 7.979 0 0 0 12 20a7.978 7.978 0 0 0 6-2.708V12.5L12 16zM3.97 9L12 13.685L20.03 9L12 4.315z"
                            ></path>
                          </svg>
                        </div>
                        <div className="w-full">
                          <div className="flex justify-between">
                            <h1 className="font-bold text-md">{educ.degree}</h1>
                            <span className="px-4 py-2 bg-gray-100">
                              Full-time
                            </span>
                          </div>

                          <div class="flex space-x-4">
                            <div class="flex space-x-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                class="w-4 h-4"
                              >
                                <path
                                  fill="currentColor"
                                  d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 16v3h16v-3zm0-2h16V7H4zM9 3v2h6V3zm2 8h2v2h-2z"
                                ></path>
                              </svg>
                              <span class="yb zb" x-text="job.company">
                                {educ.institute}
                              </span>
                            </div>

                            <div class="flex space-x-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                class="w-4 h-4"
                              >
                                <path
                                  fill="currentColor"
                                  d="m12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zm4.95-7.778a7 7 0 1 0-9.9 0L12 20.9zM12 13a2 2 0 1 1 0-4a2 2 0 0 1 0 4"
                                ></path>
                              </svg>
                              <span class="yb zb" x-text="job.location">
                                {educ.location}
                              </span>
                            </div>

                            <div class="flex space-x-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                class="w-4 h-4"
                              >
                                <path
                                  fill="currentColor"
                                  d="M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1zm11 10H4v8h16zm-9 2v4H6v-4zM7 5H4v4h16V5h-3v2h-2V5H9v2H7z"
                                ></path>
                              </svg>
                              <span class="yb zb" x-text="job.period">
                                {educ.graduation_year}
                              </span>
                            </div>
                          </div>
                          <div class="flex space-x-4">
                            <div class="flex space-x-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                class="w-4 h-4"
                              >
                                <path
                                  fill="currentColor"
                                  d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 16v3h16v-3zm0-2h16V7H4zM9 3v2h6V3zm2 8h2v2h-2z"
                                ></path>
                              </svg>
                              <span class="yb zb" x-text="job.company">
                                {educ.accreditation},{educ.board_university}
                              </span>
                            </div>

                            <div class="flex space-x-2">
                              <CatchingPokemonIcon className=" " />
                              <span class="yb zb" x-text="job.location">
                                {educ.gpa_cgpa}
                              </span>
                            </div>

                            <div class="flex space-x-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                class="w-4 h-4"
                              >
                                <path
                                  fill="currentColor"
                                  d="M9 1v2h6V1h2v2h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1zm11 10H4v8h16zm-9 2v4H6v-4zM7 5H4v4h16V5h-3v2h-2V5H9v2H7z"
                                ></path>
                              </svg>
                              <span class="yb zb" x-text="job.period">
                                {educ.admission_year}
                              </span>
                            </div>
                          </div>
                          <div className="pt-2 text-gray-600">
                            {educ.board_university},{educ.education_level},
                            {educ.major_subject},{educ.honors_awards}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className="p-4 mb-4 bg-white rounded-md ">
                  <h1 className="mb-4 text-lg font-bold text-gray-900">
                    WROKERS SERVICES
                  </h1>

                  <div className="flex flex-wrap w-full gap-4">
                    {singleworker?.worker?.services?.map((ser) => (
                      <div className="flex items-center justify-center px-4 py-2 space-x-2 border rounded-md border-slate-800">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.2rem"
                            height="1.2rem"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              d="M6 9a3 3 0 1 0 0-6a3 3 0 0 0 0 6Zm0-6V0m0 12V9M0 6h3m6 0h3M2 2l2 2m4 4l2 2m0-8L8 4M4 8l-2 2m16 2a3 3 0 1 0 0-6a3 3 0 0 0 0 6Zm0-6V3m0 12v-3m-6-3h3m6 0h3M14 5l2 2m4 4l2 2m0-8l-2 2m-4 4l-2 2m-5 8a3 3 0 1 0 0-6a3 3 0 0 0 0 6Zm0-6v-3m0 12v-3m-6-3h3m6 0h3M5 14l2 2m4 4l2 2m0-8l-2 2m-4 4l-2 2"
                            />
                          </svg>
                        </div>
                        <h1 className="font-bold text-md text-nowrap">
                          {ser.service.name}
                        </h1>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WorkerProfile;
