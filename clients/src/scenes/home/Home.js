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
      <div className="home__container bg-gray-50">
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
                    <div className="statItem">
                      <Link
                        className="text-white "
                        key={index}
                        to={`/category/basic/services/${item._id}/${item.category_name}`}
                      >
                        <div className="statInfo">
                          <img
                            src={
                              Localhost +
                              `/images/services_categories/${item?.frontImage}`
                            }
                            alt="jomeen"
                          />
                        </div>
                      </Link>
                      <div
                        style={{
                          boxShadow: `inset 0 0 0 15px ${
                            item.color ? item.color : "green"
                          }`,
                        }}
                        className="statThumb concern-1 "
                      >
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
              </ul>
            </div>
          </div>
          <div>
            <AppSection />
          </div>

          <div>
            {dataallservice?.length > 0 && (
              <AllService data={dataallservice} lodding={loddingallservice} />
            )}
          </div>
          <div>
            {dataothers?.length > 0 && (
              <OtherCard data={dataothers} lodding={loddingother} />
            )}
          </div>
          <div>
            <Customer />
          </div>
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
