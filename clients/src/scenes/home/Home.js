import React, { useEffect, useState } from "react";
import "./Home.css";
import Footer from "../../components/footer/Footer";
import AppSection from "../../components/appSection/AppSection";
import Banner from "../../components/banner/Banner";
import Customer from "../../components/customer/Customer";
import AllService from "../../components/allservices/AllService";
import OtherCard from "../../components/otherscard/OtherCard";
import Header from "../../components/header/Header";
import WorkerMangement from "../../components/workmanagement/WorkManage";
import { Localhost } from "../../action/host/HostConnection";
import { getActiveBannersAction } from "../../action/auth_admin/BannerAction";
import { useDispatch, useSelector } from "react-redux";
import Lodder from "../../components/lodder/Lodder";
import { Link } from "react-router-dom";

function Home() {
  const [dataothers, setDataOthers] = useState([]);
  const [dataallservice, setDataAllService] = useState([]);
  const [loddingother, setLoadingOther] = useState(true);
  const [loddingallservice, setLoadingAllService] = useState(true);
  const { CategoryservicesList } = useSelector(
    (state) => state.serviceCategoryState
  );
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingAllService(true);
        const response = await fetch(
          Localhost + "/api/services/home/pages/categories/services"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setDataAllService(result.servicesList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingAllService(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingOther(true);
        const response = await fetch(
          Localhost + "/api/services/home/pages/new/services"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setDataOthers(result.servicesList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingOther(false);
      }
    };

    fetchData();
  }, []);

  const { lodding } = useSelector((state) => state.bannersState);
  useEffect(() => {
    dispatch(getActiveBannersAction());
  }, [dispatch]);
  return (
    <>
      {lodding && <Lodder />}
      <div className="home__container">
        <div className="home__container__box">
          <Header />
          <div>
            <Banner />
          </div>

          <div className=" bg-blue-50 mt-28">
            <div className="max-w-screen-xl px-4 py-4 mx-auto">
              <ul class="statGrid clearfix">
                {CategoryservicesList?.map((item, index) => (
                  <li>
                    <div  className="statItem">
                      <Link
                        className="text-white "
                        key={index}
                        to={`/category/basic/services/${item._id}/${item.category_name}`}
                      >
                        <div  className="statInfo">
                          <img
                            src={
                              Localhost +
                              `/images/services_categories/${item?.frontImage}`
                            }
                            alt="jomeen"
                          />
                        </div>
                      </Link>
                      <div style={{boxShadow:`inset 0 0 0 15px ${item.color ? item.color:'green'}`}}  className="statThumb concern-1 ">
                        <img
                          src={
                            Localhost +
                            `/images/services_categories/${item?.backImage}`
                          }
                          alt="jomeen"
                          class="icon-size"
                        />
                      </div>
                    </div>
                  </li>
                ))}

                {/* <li>
                  <div class="statItem">
                    <a href="http://jobslinkbd.com/" target="_blank">
                      <div class="statInfo">
                        <img
                          src="https://serviceshop.com.bd/assets/images/category-logo-12.png"
                          alt="Jobs"
                        />
                      </div>
                    </a>
                    <div class="statThumb concern-1 Jobs_Link_BD">
                      <img
                        src="https://serviceshop.com.bd/assets/images/category-icon-12.png"
                        alt="Jobs Link BD"
                        class="icon-size"
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div class="statItem">
                    <a href="http://newsnetworkbd.com" target="_blank">
                      <div class="statInfo">
                        <img
                          src="https://serviceshop.com.bd/assets/images/category-logo-6.png"
                          alt="Newspaper"
                        />
                      </div>
                    </a>
                    <div class="statThumb concern-1 Newspaper">
                      <img
                        src="https://serviceshop.com.bd/assets/images/category-icon-6.png"
                        alt="Newspaper"
                        class="icon-size"
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div class="statItem">
                    <a href="http://medicalsheba.com" target="_blank">
                      <div class="statInfo">
                        <img
                          src="https://serviceshop.com.bd/assets/images/category-logo-15.png"
                          alt="Doctor"
                        />
                      </div>
                    </a>
                    <div class="statThumb concern-1 Doctor">
                      <img
                        src="https://serviceshop.com.bd/assets/images/category-icon-15.png"
                        alt="Doctor"
                        class="icon-size"
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div class="statItem">
                    <a href="http://booksshopbd.com" target="_blank">
                      <div class="statInfo">
                        <img
                          src="https://serviceshop.com.bd/assets/images/category-logo-5.png"
                          alt="Book"
                        />
                      </div>
                    </a>
                    <div class="statThumb concern-1 Book">
                      <img
                        src="https://serviceshop.com.bd/assets/images/category-icon-5.png"
                        alt="Book"
                        class="icon-size"
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div class="statItem">
                    <a href="http://rlab.doyalbaba.com/" target="_blank">
                      <div class="statInfo">
                        <img
                          src="https://serviceshop.com.bd/assets/images/category-logo-8.png"
                          alt="Education"
                        />
                      </div>
                    </a>
                    <div class="statThumb concern-1 Education">
                      <img
                        src="https://serviceshop.com.bd/assets/images/category-icon-8.png"
                        alt="Education"
                        class="icon-size"
                      />
                    </div>
                  </div>
                </li>

                <li>
                  <div class="statItem">
                    <a href="http://beautybeezbd.com" target="_blank">
                      <div class="statInfo">
                        <img
                          src="https://serviceshop.com.bd/assets/images/category-logo-9.png"
                          alt="Beauty"
                        />
                      </div>
                    </a>
                    <div class="statThumb concern-1 Parlour">
                      <img
                        src="https://serviceshop.com.bd/assets/images/category-icon-9.png"
                        alt="Parlour"
                        class="icon-size"
                      />
                    </div>
                  </div>
                </li>

                <li>
                  <div class="statItem">
                    <a href="http://kawranbazar.com.bd" target="_blank">
                      <div class="statInfo">
                        <img
                          src="https://serviceshop.com.bd/assets/images/category-logo-7.jpg"
                          alt="EShop"
                        />
                      </div>
                    </a>
                    <div class="statThumb concern-1 Shop">
                      <img
                        src="https://serviceshop.com.bd/assets/images/category-icon-7.png"
                        alt="Shop"
                        class="icon-size"
                      />
                    </div>
                  </div>
                </li>

                <li>
                  <div class="statItem">
                    <a href="http://appsshopbd.com/" target="_blank">
                      <div class="statInfo">
                        <img
                          src="https://serviceshop.com.bd/assets/images/category-logo-14.png"
                          alt="appsshop"
                        />
                      </div>
                    </a>
                    <div class="statThumb concern-1 appsshop">
                      <img
                        src="https://serviceshop.com.bd/assets/images/category-icon-14.png"
                        alt="appsshop"
                        class="icon-size"
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <div class="statItem">
                    <a href="http://binodonghor.com/" target="_blank">
                      <div class="statInfo">
                        <img
                          src="https://serviceshop.com.bd/assets/images/category-logo-16.png"
                          alt="binodonghor"
                        />
                      </div>
                    </a>
                    <div class="statThumb concern-1 binodonghor">
                      <img
                        src="https://serviceshop.com.bd/assets/images/category-icon-16.png"
                        alt="binodonghor"
                        class="icon-size"
                      />
                    </div>
                  </div>
                </li>

                <li>
                  <div class="statItem">
                    <a href="https://carhat.com.bd/" target="_blank">
                      <div class="statInfo">
                        <img
                          src="https://serviceshop.com.bd/assets/images/category-logo-27.png"
                          alt="Carbiz"
                        />
                      </div>
                    </a>
                    <div class="statThumb concern-1 Carbiz">
                      <img
                        src="https://serviceshop.com.bd/assets/images/category-icon-27.png"
                        alt="Carbiz"
                        class="icon-size"
                      />
                    </div>
                  </div>
                </li>

                <li>
                  <div class="statItem">
                    <a href="http://travelsolution.com.bd/" target="_blank">
                      <div class="statInfo">
                        <img
                          src="https://serviceshop.com.bd/assets/images/category-logo-28.jpg"
                          alt="TravelTour"
                        />
                      </div>
                    </a>
                    <div class="statThumb concern-1 TravelTour">
                      <img
                        src="https://serviceshop.com.bd/assets/images/category-icon-28.png"
                        alt="TravelTour"
                        class="icon-size"
                      />
                    </div>
                  </div>
                </li>

                <li>
                  <div class="statItem">
                    <a href="http://meetface.radissonbd.com/" target="_blank">
                      <div class="statInfo">
                        <img
                          src="https://serviceshop.com.bd/assets/images/category-logo-29.png"
                          alt="Meetface"
                        />
                      </div>
                    </a>
                    <div class="statThumb concern-1 Dating">
                      <img
                        src="https://serviceshop.com.bd/assets/images/category-icon-29.png"
                        alt="Dating"
                        class="icon-size"
                      />
                    </div>
                  </div>
                </li>

                <li>
                  <div class="statItem">
                    <a href="http://digitaltvbd.com/" target="_blank">
                      <div class="statInfo">
                        <img
                          src="https://serviceshop.com.bd/assets/images/category-logo-30.png"
                          alt="digitaltvbd"
                        />
                      </div>
                    </a>
                    <div class="statThumb concern-1 digitaltvbd">
                      <img
                        src="https://serviceshop.com.bd/assets/images/category-icon-30.png"
                        alt="digitaltvbd"
                        class="icon-size"
                      />
                    </div>
                  </div>
                </li>

                <li>
                  <div class="statItem">
                    <a href="http://amaderkagoj.com/" target="_blank">
                      <div class="statInfo">
                        <img
                          src="https://serviceshop.com.bd/assets/images/category-logo-31.jpg"
                          alt="amaderkagoj"
                        />
                      </div>
                    </a>
                    <div class="statThumb concern-1 amaderkagoj">
                      <img
                        src="https://serviceshop.com.bd/assets/images/category-icon-31.png"
                        alt="amaderkagoj"
                        class="icon-size"
                      />
                    </div>
                  </div>
                </li>

                <li>
                  <div class="statItem">
                    <a href="https://www.doyalbaba.com/" target="_blank">
                      <div class="statInfo">
                        <img
                          src="https://serviceshop.com.bd/assets/images/category-logo-32.png"
                          alt="Doyalbaba"
                        />
                      </div>
                    </a>
                    <div class="statThumb concern-1 Doyalbaba">
                      <img
                        src="https://serviceshop.com.bd/assets/images/category-icon-32.png"
                        alt="Doyalbaba"
                        class="icon-size"
                      />
                    </div>
                  </div>
                </li> */}
              </ul>
            </div>
          </div>

          <AppSection />

          {dataallservice?.length > 0 && (
            <AllService data={dataallservice} lodding={loddingallservice} />
          )}
          {dataothers?.length > 0 && (
            <OtherCard data={dataothers} lodding={loddingother} />
          )}
          <Customer />
          <div className="bg-white ">
            <WorkerMangement />
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
