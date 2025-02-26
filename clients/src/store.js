import {legacy_createStore as createStore,combineReducers,applyMiddleware} from 'redux';
import {composeWithDevTools} from '@redux-devtools/extension';
import {thunk} from 'redux-thunk';
import { loginReducers, registerReducers } from './reducers/AdminReducers';
import {singleworkerReducers, allworkersReducers, servicesReducers, categoriesServicesReducers, allclientsReducers, PaymentReducers, homePagesReducers, BdStateContriesReducers } from './reducers/AdminMaintainReducers';
import { bookingReducers, SingleBookingReducers } from './reducers/BookingReducers';
import { allbannersReducers } from './reducers/BannerReducers';
import { reviewsReducers } from './reducers/ReviewsReducers';
import { NotificationReducers } from './reducers/NotificationReducers';
import { serviceBookingReducers } from './reducers/ServiceBookingCartReducers';
import { CategoryBasicserviceListReducers,  serviceListReducers } from './reducers/ServiceReducers';
import { UserReducers, contractReducers, ServicesWrokersReducers, WorkerApplyReducers } from './reducers/UserReducers';
import { ContractListReducers } from './reducers/ContractReducers';
import { UserPersonalBookingReducers } from './reducers/UserBookingReducers';
const reducer = combineReducers({
   userLoginState : UserReducers, //client login 
   registerState : registerReducers,
   loginState  : loginReducers, //admin login 
   allworkerState : allworkersReducers,
   sigleWorkerState : singleworkerReducers,
   servicesState : servicesReducers,
   servicesCategoiesState : categoriesServicesReducers,
   serviceListState:serviceListReducers,
   allclientsState : allclientsReducers,
   bookingState : bookingReducers,
   singleBookingState : SingleBookingReducers,
   bannersState : allbannersReducers,
   reviewsState : reviewsReducers,
   notificationState : NotificationReducers,
   cartState : serviceBookingReducers,
   serviceCategoryState : CategoryBasicserviceListReducers,
   contractState : contractReducers, ///client contract
   contractListState : ContractListReducers, ///admin contract list
   userpersonalBookingState : UserPersonalBookingReducers,
   paymentState : PaymentReducers,
   serviceWrokerState : ServicesWrokersReducers,
   homePagesState: homePagesReducers,
   bdStateCounteState : BdStateContriesReducers,
   workerResumeApplyState : WorkerApplyReducers
});
//adimin
const userIn = localStorage.getItem('userInfo')?
JSON.parse(localStorage.getItem('userInfo')):null;
console.log('hie',userIn)
///client 
const clientIn = localStorage.getItem('clientInfo')?
JSON.parse(localStorage.getItem('clientInfo')):null;

const cart = localStorage.getItem('cartItems')?
JSON.parse(localStorage.getItem('cartItems')):[]

const worker = localStorage.getItem('workersItems')?
JSON.parse(localStorage.getItem('workersItems')):[];


const userotpstore = localStorage.getItem('otp_store')?
JSON.parse(localStorage.getItem('otp_store')):{};

const cartaddress = localStorage.getItem('addressInfo')?
JSON.parse(localStorage.getItem('addressInfo')):[]




const initialState={
    loginState:{userInfo:userIn},
    userLoginState:{clientInfo:clientIn,otp_store:userotpstore},
    cartState:{cartItems:cart,addressInfo:cartaddress,workersItems:worker}
}

const middleware = [thunk];
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));
export default store;