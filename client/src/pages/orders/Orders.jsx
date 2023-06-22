import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        console.log(res);
        return res.data;
      }),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;

    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res?.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations`, {
          to: currentUser.user.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="orders">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Price</th>
              <th>Chat</th>
              <th>Contact</th>
              <th>Meeting</th>
            </tr>
            {data.map((order) => (
              <tr key={order._id}>
                <td>
                  <img className="image" src={order.img} alt="" />
                </td>
                <td>{order.title}</td>
                <th>
                  {currentUser.user.isSeller
                    ? order.buyerId.username
                    : order.sellerId.username}
                </th>
                <th>
                  {currentUser.user.isSeller
                    ? order.buyerId.phone
                    : order.sellerId.phone}
                </th>
                <td>₹ {order.price}</td>
                <th>
                  <Link to="/Chat">
                    {/* <img className="message" src="./img/message.png" alt="" /> */}
                    Chat
                  </Link>
                  {/* {console.log(order, "order")} */}
                </th>
                <td>
                  <img
                    className="message"
                    src="./img/message.png"
                    alt=""
                    onClick={() => handleContact(order)}
                  />
                  {/* {console.log(order, "order")} */}
                </td>
                <td>
                  <Link className="link" to="/video">
                    <img className="message" src="./img/video.png" alt="" />
                  </Link>
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
