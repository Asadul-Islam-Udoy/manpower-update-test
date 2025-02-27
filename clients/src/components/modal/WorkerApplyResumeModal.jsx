import React, { useState } from "react";
import { Localhost } from "../../action/host/HostConnection";
function WorkerApplyResumeModel({resumeString}) {
  const [showModal, setShowModal] = useState(true);
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center  items-center flex  overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto  my-6 mx-auto max-w-full">
              {/*content*/}
              <div className="border-0 h-[100vh] rounded-lg text-black shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">WORKER RESUME</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent  text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    x
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto w-[100wv]">
                  <p className="my-4 text-blueGray-500 text-lg text-black leading-relaxed">
                    <div className=" h-full w-full ">
                      {resumeString && (
                        <iframe
                          src={
                            Localhost +
                            `/images/workerresume/${resumeString}`
                          }
                          title="PDF Viewer"
                          className=" h-[82vh] w-[80vw]  "
                          style={{ border: "none" }}
                        ></iframe>
                      )}
                    </div>
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                 
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
export default WorkerApplyResumeModel;
