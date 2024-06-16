"use client";
import Scroller from "@/app/Scroller/scroller";
import { useRouter } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
import style from "../Orders/order.module.scss";
import axios from "axios";
import { fetchOrdersDataDB } from "../Orders/orderFetchFunction";

function OrdersInfo() {
  // function OrdersInfo({userOrders , setUserOrders}) {
  const router = useRouter();
  const [userOrders, setUserOrders] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrdersData = async () => {
    let getData = await fetchOrdersDataDB();
    setOrderData(getData.result);
    return getData;
  };

  useEffect(() => {
    fetchOrdersData();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      let token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
      } else {
        try {
          let req = await axios.post(
            `${process.env.NEXT_PUBLIC_HOST_NAME}/api/Orders`,
            { token: token }
          );
          if (req) {
            setUserOrders(req.data.result);
            console.log(req);
          }
          return req;
        } catch (error) {
          console.log("Error in fetching orders:", error);
        }
      }
    };
    fetchOrders();
  }, []);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  if(!userOrders){
     return <h4>loading...</h4>
  }

  return (
    <>
      {loading ? (
        <div className={style.loading} >
          <p>loading...</p>
        </div>
      ) : userOrders && userOrders.length === 0 ? (
        <h1 style={{ textAlign: "center", marginTop: "0px" }}>
          No Orders Available
        </h1>
      ) : (
        <div className={style.ordersPage} >
          <div className={style.orderTable} >
            <table className={style.order_table} >
              <thead>
                <tr style={{fontSize:".8rem"}}>
                  <th>S.No</th>
                  <th>Order ID</th>
                  <th>Email</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {userOrders &&
                  userOrders.map((order, i) => {
                    return (
                      <tr style={{fontSize:".8rem"}} key={order._id}>
                        <td>{i + 1}.</td>
                        <td>{order.orderId}</td>
                        <td>{order.email.slice(0,9)}</td>
                        <td>₹{order.amount}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default OrdersInfo;
