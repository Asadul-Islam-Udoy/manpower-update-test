import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import AdminContacts from "./scenes/contactsadmin";
import FAQ from "./scenes/faq";
import AdminProfile from "./scenes/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Worker from "./scenes/worker/worker_index";
import Client from "./scenes/client/client_index";
import Home from "./scenes/home/Home";
import { useDispatch, useSelector } from "react-redux";
import AdminMiddleware from "./scenes/middleware/AdminMiddleware";
import { useEffect, useState } from "react";
import {
  logoutAction,
  refreshAuthAction,
  userTokenRefreshAction,
} from "./action/auth_admin/AdminAction";
import WorkerUpdate from "./scenes/worker/worker_update";
import ServicesIndex from "./scenes/service/services_index";
import ServicesCategoiesIndex from "./scenes/service_categoies/services_categories_index";
import ServiceUpdate from "./scenes/service/services_update";
import WorkerCreate from "./scenes/worker/worker_create";
import BookingIndex from "./scenes/booking";
import BookingInfo from "./scenes/booking/BookingInfo";
import BannerIndex from "./scenes/banner";
import BannerImage from "./components/dashboard/BannerImage";
import NotificationIndex from "./scenes/notification/notification_index";
import NotificationInfo from "./components/dashboard/NotificationInfo";
import NewBookingIndex from "./scenes/booking/newbooking";
import GetService from "./scenes/getservices/GetServices";
import { CartProvider } from "./components/context/Context";
import UserLogin from "./scenes/login/UserLogin";
import AdminLogin from "./scenes/login/AdminLogin";
import UserContact from "./scenes/contract/UserContact";
import About from "./scenes/about/About";
import ServiceBooking from "./scenes/servicebookingcart/ServiceBookingCart";
import BookingServiceInfo from "./scenes/servicebookinginfo/BookingServiceInfo";
import ServiceDetails from "./scenes/servicedetalis/ServiceDetails";
import CategoryServices from "./scenes/categoryservice/CategoryServices";
import UserMiddleware from "./scenes/middleware/UserMiddleware";
import ClientDashboard from "./scenes/clientdashboard/ClientProfile";
import Helps from "./scenes/clienthelpscontract/Helps";
import AgainPaymnetInfo from "./scenes/clientdashboard/againpayment/AgainPaymentInfo";
import UserPersonalOrderInfo from "./scenes/clientdashboard/UserPersonnalOrderInfo";
import Error404Page from "./scenes/404/404MPages";
import PaymentSuccess from "./scenes/paymentsuccess/PaymentSuccess";
import PaymentFaild from "./scenes/paymentfail/PaymentFails";
import PaymentCancel from "./scenes/paymentcancel/PaymentCancel";
import WorkerList from "./scenes/workerList/WorkerList";
import WorkerProfile from "./scenes/worker/worker_profile";
import AllWorkers from "./scenes/worker/allworkers/AllWorkers";
import GetWorkerToService from "./scenes/worker/allworkers/GetWorkerToService";
import HomePageManage from "./scenes/adminhomepagemanage/HomePageManage";
import WorkerResume from "./scenes/worker/worker_resume";
import BookingIndexByStatus from "./scenes/booking/statusbooking";
import { toast } from "react-toastify";
import WorkerLogin from "./scenes/login/WorkerLogin";
import WorkerDashboard from "./scenes/worker/auth_worker_profile";
import WorkerApply from "./scenes/workerapply/WorkerApply";
import WorkerApplyIndex from "./scenes/workerapply/WorkerApplyIndex";
import Register_User from "./scenes/login/Register";
import UserOtp from "./scenes/login/UserOtp";
import ForgetPasswordRequest from "./scenes/login/ForgetPasswordRequest";
import ForgetPasswordRequestValidate from "./scenes/login/ForgetPasswordRequestValidate";
import ClientNotification from "./scenes/clientdashboard/ClientNotification";
import PaymentBookingInfo from "./scenes/booking/paymentbookinginfo";
import AdminForgetPasswordRequestValidate from "./scenes/login/AdminForgetPasswordRequestValidate";
import AdminForgetPasswordRequest from "./scenes/login/AdminForgetPasswordRequest";
import Permission from "./scenes/user_permission/Permission";
import UpdateRole from "./scenes/user_permission/RoleLists";

function App() {
  const [theme, colorMode] = useMode();
  const [intervalId, setIntervalId] = useState(null);
  const { error, lodding, userInfo, isLogout } = useSelector(
    (state) => state.loginState
  );
  const {
    error: userError,
    lodding: userLodding,
    clientInfo,
  } = useSelector((state) => state.userLoginState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (error == "jwt expired") {
        toast.error("admin token is expries!");
        clearInterval(intervalId);
        setIntervalId(null);
        dispatch(logoutAction());
        dispatch(refreshAuthAction());
        navigate("/dashboard/login");
      }
      dispatch(refreshAuthAction());
    };
  }, [dispatch, error == "jwt expired", intervalId, error, navigate, toast]);

  useEffect(() => {
    if (!intervalId && userInfo?.user?.userType == "admin" || userInfo?.user?.userType =="super-admin") {
      const id = setInterval(() => {
      dispatch(userTokenRefreshAction());
      }, 10000);
      setIntervalId(id);
    }
    if (isLogout) {
      window.location.reload();
      setIntervalId(null);
    }
  }, [dispatch, userInfo?.user?.userType == "admin" || userInfo?.user?.userType =="super-admin", navigate, isLogout]);

  return (
    <CartProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <main className="content">
              <Routes>
                <Route path="*" element={<Error404Page />} />
                <Route path="/" element={<Home />} />
                <Route path="/dashboard/login" element={<AdminLogin />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/register/:userType" element={<Register_User />} />
                <Route path="/login/worker" element={<WorkerLogin />} />
                <Route path="/register/user/otp/:emailorphone" element={<UserOtp />} />
                <Route path="/user/forget/password/request" element={<ForgetPasswordRequest />} />
                <Route path="/user/forget/password/requiest/validate/:emailorphone" element={<ForgetPasswordRequestValidate />} />
                <Route path="/admin/forget/password/request" element={<AdminForgetPasswordRequest />} />
                <Route path="/admin/forget/password/request/validate" element={<AdminForgetPasswordRequestValidate />} />
                <Route path="/all/services" element={<GetService />} />
                <Route path="/contract" element={<UserContact />} />
                <Route path="/about" element={<About />} />
                <Route path="/service/booking" element={<ServiceBooking />} />
                <Route path="/worker/list" element={<WorkerList />} />
                <Route path="/worker/resume/:id" element={<WorkerResume />} />
                <Route path="/all/workers" element={<AllWorkers />} />

                <Route
                  path="/get/workers/services/:id"
                  element={<GetWorkerToService />}
                />
                <Route
                  path="/service/details/:id"
                  element={<ServiceDetails />}
                />
                <Route
                  path="/category/basic/services/:id/:name"
                  element={<CategoryServices />}
                />
                {/* user middleware */}
                <Route
                  path="/user/profile/:id"
                  element={
                    <UserMiddleware
                      isUser={
                        clientInfo?.user?.userType === "client" ||
                        userInfo?.user?.userType === "admin"
                      }
                    >
                      <ClientDashboard />
                    </UserMiddleware>
                  }
                />
                <Route
                  path="/user/again/payment/info/:id"
                  element={
                    <UserMiddleware
                      isUser={clientInfo?.user?.userType === "client"}
                    >
                      <AgainPaymnetInfo />
                    </UserMiddleware>
                  }
                />
                <Route
                  path="/user/personal/order/info/:id"
                  element={
                    <UserMiddleware
                      isUser={
                        clientInfo?.user?.userType === "client" ||
                        userInfo?.user?.userType === "admin"
                      }
                    >
                      <UserPersonalOrderInfo />
                    </UserMiddleware>
                  }
                />
                                <Route
                  path="/user/client/notification/:id"
                  element={
                    <UserMiddleware
                      isUser={
                        clientInfo?.user?.userType === "client" ||
                        userInfo?.user?.userType === "admin"
                      }
                    >
                      <ClientNotification />
                    </UserMiddleware>
                  }
                />
                <Route
                  path="/user/helps"
                  element={
                    <UserMiddleware
                      isUser={clientInfo?.user?.userType === "client"}
                    >
                      <Helps />
                    </UserMiddleware>
                  }
                />
                <Route
                  path="/service/booking/details"
                  element={
                    <UserMiddleware
                      isUser={clientInfo?.user?.userType === "client"}
                    >
                      <BookingServiceInfo />
                    </UserMiddleware>
                  }
                />

                <Route
                  path="/user/payment/success"
                  element={
                    <UserMiddleware
                      isUser={clientInfo?.user?.userType === "client"}
                    >
                      <PaymentSuccess />
                    </UserMiddleware>
                  }
                />

                <Route
                  path="/user/payment/fails"
                  element={
                    <UserMiddleware
                      isUser={clientInfo?.user?.userType === "client"}
                    >
                      <PaymentFaild />
                    </UserMiddleware>
                  }
                />

                <Route
                  path="/user/payment/cancel"
                  element={
                    <UserMiddleware
                      isUser={clientInfo?.user?.userType === "client"}
                    >
                      <PaymentCancel />
                    </UserMiddleware>
                  }
                />
              {/* worker section */}
                <Route
                  path="/apply/worker/my/manpower"
                  element={
                    <UserMiddleware
                      isUser={clientInfo?.user?.userType === "worker"}
                    >
                     < WorkerApply/>
                    </UserMiddleware>
                  }
                />
                <Route
                  path="/profile/worker/my/manpower/:id"
                  element={
                    <UserMiddleware
                      isUser={clientInfo?.user?.userType === "worker" || 'admin' || 'super-admin'}
                    >
                     <WorkerDashboard />
                    </UserMiddleware>
                  }
                />
                {/* ///admin middleware */}
                <Route
                  path="/dashboard"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <Dashboard />
                    </AdminMiddleware>
                  }
                />
                {/* //worker manage page */}
                <Route
                  path="/dashboard/permissions"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                   <Permission/>
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/permissions/role/update"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                   <UpdateRole/>
                    </AdminMiddleware>
                  }
                />
                {/* //worker manage page */}
                <Route
                  path="/dashboard/worker"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <Worker />
                    </AdminMiddleware>
                  }
                />

                {/* //worker create component */}
                <Route
                  path="/dashboard/worker/create"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <WorkerCreate />
                    </AdminMiddleware>
                  }
                />
                {/* //worker profile */}
                <Route
                  path="/dashboard/worker/profile/:id"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <WorkerProfile />
                    </AdminMiddleware>
                  }
                />
                
                <Route
                  path="/dashboard/applications"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <WorkerApplyIndex />
                    </AdminMiddleware>
                  }
                />
                {/* //worker update component */}
                <Route
                  path="/dashboard/worker/update/:id"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <WorkerUpdate />
                    </AdminMiddleware>
                  }
                />

                <Route
                  path="/dashboard/client"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <Client />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/services"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <ServicesIndex />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/service/update/:id"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <ServiceUpdate />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/services/categories"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <ServicesCategoiesIndex />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/contacts"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <AdminContacts />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/home/page"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <HomePageManage />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/banners"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <BannerIndex />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/banners/images/:id"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <BannerImage />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/notifications"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <NotificationIndex />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/notification/info/:id"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <NotificationInfo />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/invoices"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <Invoices />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/booking"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <BookingIndex />
                    </AdminMiddleware>
                  }
                />
                {/* //worker manage page */}
                <Route
                  path="/dashboard/get/booking/status/:status"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <BookingIndexByStatus />
                    </AdminMiddleware>
                  }
                />

                <Route
                  path="/dashboard/new/booking"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <NewBookingIndex />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/booking/info/:id"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <BookingInfo />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/payment/booking/info/:pid"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <PaymentBookingInfo />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/admin/profile/:id"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <AdminProfile />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/faq"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin" || "super-admin"}
                    >
                      <FAQ />
                    </AdminMiddleware>
                  }
                />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CartProvider>
  );
}

export default App;
