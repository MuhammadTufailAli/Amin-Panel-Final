import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../ScreensCss/SelectedUser.css";
import axios from "axios";
import CartProvider from "../../contextApi";
import LeftDrawer from "../Layout/LeftDrawer";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Loader from "../../assets/9582-liquid-4-dot-loader.json";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import port from "../Port/Port";
import { bool } from "yup";

function SelectedUserDetails() {
  const location = useLocation();
  const { user } = location.state;
  const [getProductFromBackend, setProductFromBackend] = useState({});
  console.log(user);
  const { cookies, setCookie } = useContext(CartProvider);
  const [array, setarray] = useState([]);
  const [condition, setcondition] = React.useState(true);

  const getData = () => {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios
      .get(`${port.herokuPort}/product/shopOwnerProducts/${user._id}`, {
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      })
      .then((res) => {
        console.log("Data from backend is");
        console.log(res.data.data);
        setProductFromBackend(res.data.data);

        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const getproduct = async () => {
    console.log("User Id", user._id);
    try {
      const result = await axios.get(
        `${port.herokuPort}/ShopOwnerBuyingNotificationRoute/getNotification/${user._id}`
      );
      console.log("I am here");
      console.log(result.data.data);
      setarray(result.data.data);

      setcondition(false);
    } catch (err) {
      console.log(err.response.data.message);
      alert("Error");
    }
  };

  React.useEffect(() => {
    getData();
    getproduct();
    console.log("Hello");
  }, []);
  if (user.role === "ShopOwner") {
    return (
      <LeftDrawer>
        {Object.keys(getProductFromBackend).length === 0 ? (
          <div className="LoaderDiv">
            <div style={{ backgroundColor: "rgba(235, 238, 242, 255)" }}>
              <Lottie
                animationData={Loader}
                loop={true}
                style={{ width: 900, height: 900 }}
              />
              <p style={{ fontSize: 26, fontWeight: 600, marginTop: -100 }}>
                Loading.....
              </p>
            </div>
          </div>
        ) : (
          <div className="topContainer">
            <div className="ProfileInfo">
              <div className="imageDiv">
                <img
                  alt={user.photoUrl}
                  src={user.photoUrl}
                  className="UserProfilePhoto"
                />
              </div>
              <div className="Information">
                <p style={{ fontWeight: 600, fontSize: 22, marginBottom: 0 }}>
                  {user.firstname} {user.lastname}
                </p>
                <p style={{ fontWeight: 600, marginBottom: 0 }}>
                  Personal Info.
                </p>
                <p style={{ fontSize: 16, marginBottom: 3 }}>{user.role}</p>
                <p style={{ fontSize: 16, marginBottom: 0 }}>
                  Address.{" "}
                  <span style={{ color: "grey" }}>{user.permanentaddress}</span>
                </p>
                <p
                  style={{
                    fontSize: 16,

                    marginBottom: 0,
                  }}
                >
                  Phone No.{" "}
                  <span style={{ color: "grey" }}>0{user.phonenumber}</span>
                </p>
                <p style={{ fontSize: 16, marginBottom: 0 }}>
                  CNIC <span style={{ color: "grey" }}>{user.cnic}</span>
                </p>
                <p style={{ fontSize: 16, marginBottom: 0 }}>
                  Email <span style={{ color: "grey" }}>{user.email}</span>
                </p>

                <p style={{ fontWeight: 600, marginBottom: 0, marginTop: 5 }}>
                  Shop Info.
                </p>

                <p style={{ fontSize: 16, marginBottom: 0 }}>
                  Shop Name{" "}
                  <span style={{ color: "grey" }}>{user.shopname}</span>
                </p>
                <p style={{ fontSize: 16, marginBottom: 0 }}>
                  Shop Address{" "}
                  <span style={{ color: "grey" }}>{user.shopaddress}</span>
                </p>

                <p style={{ fontSize: 16, marginBottom: 10 }}>
                  Telephone No.{" "}
                  <span style={{ color: "grey" }}>{user.telephonenumber}</span>
                </p>
              </div>
            </div>

            <div className="TotalProducts">
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 22,
                  marginTop: 20,
                  marginLeft: 20,
                }}
              >
                User Products
              </p>
              <div>
                {getProductFromBackend.map((product) => {
                  return (
                    <div className="ProductDesign">
                      <img
                        alt={product.imageUrl[0]}
                        src={product.imageUrl[0]}
                        className="ProductPhoto"
                      />
                      <p
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: 0,
                          marginTop: 10,
                          marginLeft: 5,
                        }}
                      >
                        <p style={{ color: "black", fontWeight: "600" }}>
                          {product.title}
                        </p>
                        <p style={{ marginRight: 10 }}>
                          <span style={{ color: "purple", fontWeight: "600" }}>
                            PKR{" "}
                          </span>
                          {product.price}
                        </p>
                      </p>
                      <p
                        style={{
                          marginLeft: 5,
                          color: "grey",
                          marginBottom: 0,
                        }}
                      >
                        {product.description}
                      </p>
                      <p
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: 0,

                          marginLeft: 5,
                        }}
                      >
                        <p style={{ color: "black" }}>
                          <span style={{ color: "purple", fontWeight: "600" }}>
                            Location{" "}
                          </span>
                          {product.place}
                        </p>
                        <p style={{ marginRight: 10 }}>
                          <span style={{ color: "purple", fontWeight: "600" }}>
                            Quantity{" "}
                          </span>
                          {product.quantity}
                        </p>
                      </p>

                      <p
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: 0,
                          marginTop: 10,
                          marginLeft: 5,
                        }}
                      >
                        <p style={{ color: "black" }}>
                          <span style={{ color: "purple", fontWeight: "600" }}>
                            Condition{" "}
                          </span>
                          {product.condition}
                        </p>
                        <p style={{ marginRight: 10 }}>
                          <span style={{ color: "purple", fontWeight: "600" }}>
                            Rating{" "}
                          </span>
                          {product.ratingsAverage}({product.ratingQuantity})
                        </p>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="TotalProducts">
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 22,
                  marginTop: 20,
                  marginLeft: 20,
                }}
              >
                User Earning Details
              </p>
              <div class="row">
                <div
                  style={{ padding: "0px" }}
                  class="col-xl-4 col-md-6 col-sm-12"
                >
                  <div className="boxForInfo">
                    <div
                      style={{
                        backgroundColor: "rgba(246, 247, 249, 255)",
                        borderRadius: 15,
                        height: 110,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <p className="boxNumber">
                          <CountUp end={user.earning} duration="1" />
                        </p>
                        <p className="boxUpperText">Total Earning</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{ padding: "0px" }}
                  class="col-xl-4 col-md-6 col-sm-12"
                >
                  <div className="boxForInfo">
                    <div className="boxForInfoUpperContainer">
                      <div>
                        <p className="boxNumber">
                          <CountUp end={array.length} duration="1" />
                        </p>
                        <p className="boxUpperText">Product sold</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{ padding: "0px" }}
                  class="col-xl-4 col-md-6 col-sm-12"
                >
                  <div className="boxForInfo">
                    <div className="boxForInfoUpperContainer">
                      <div>
                        <p className="boxNumber">
                          <CountUp
                            end={getProductFromBackend.length}
                            duration="1"
                          />
                        </p>
                        <p className="boxUpperText">Total Products</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 22,

                  marginLeft: 20,
                }}
              >
                Product Sold History
              </p>
              <div>
                {array.map((product) => {
                  return (
                    <div className="ProductDesign">
                      <img
                        alt={product.refOfProduct?.imageUrl[0]}
                        src={product.refOfProduct?.imageUrl[0]}
                        className="ProductPhoto"
                      />
                      <p
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: 0,
                          marginTop: 10,
                          marginLeft: 5,
                        }}
                      >
                        <p style={{ color: "black", fontWeight: "600" }}>
                          {product.refOfProduct?.title}
                        </p>
                        <p style={{ marginRight: 10 }}>
                          <span style={{ color: "purple", fontWeight: "600" }}>
                            PAID{" "}
                          </span>
                          {product?.price}
                        </p>
                      </p>

                      <p
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: 0,

                          marginLeft: 5,
                        }}
                      >
                        <p style={{ color: "black" }}>
                          <span style={{ color: "purple", fontWeight: "600" }}>
                            Buyer{" "}
                          </span>
                          {product.refOfCustomer?.firstname}{" "}
                          {product.refOfCustomer?.lastname}
                        </p>
                        <p style={{ marginRight: 10 }}>
                          <span style={{ color: "purple", fontWeight: "600" }}>
                            Bought{" "}
                          </span>
                          {product?.quantity}
                        </p>
                      </p>

                      <p
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: 0,
                          marginTop: 10,
                          marginLeft: 5,
                        }}
                      >
                        <p style={{ color: "black" }}>
                          <span style={{ color: "purple", fontWeight: "600" }}>
                            Payment Method{" "}
                          </span>
                          {product?.paymentMethod}
                        </p>
                        <p style={{ marginRight: 10 }}>
                          <span style={{ color: "purple", fontWeight: "600" }}>
                            Status{" "}
                          </span>
                          {product?.status === "Delivered" ? (
                            <p style={{ color: "green", fontWeight: "600" }}>
                              {product?.status}
                            </p>
                          ) : (
                            <p style={{ color: "yellow", fontWeight: "600" }}>
                              {product?.status}
                            </p>
                          )}
                        </p>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="TotalNotifications"></div>
          </div>
        )}
      </LeftDrawer>
    );
  } else {
    return (
      <LeftDrawer>
        <div className="topContainer">
          {/* <div style={{ width: "100%" }}>
            <div className="UserImage">
              <img className="Image" src={url} alt="No photo" />
            </div>
            <div>
              <h1>Details</h1>
              <p>
                Name: {user.firstname} {user.lastname}
              </p>
              <p>Role: {user.role}</p>
              <p>Email: {user.email}</p>
            </div>
          </div> */}
        </div>
      </LeftDrawer>
    );
  }
}

export default SelectedUserDetails;
