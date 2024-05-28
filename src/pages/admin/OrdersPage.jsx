import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import SideBar from "../../components/admin/SideBar";
import { useOrders } from "../../context/OrdersContext";
import { Link } from "react-router-dom";
import { FormatDate } from "../../utils/FormatDate";
import { FormatMoney } from "../../utils/FormatMoney";

const getStatus = (status) => {
  if (status.isPending) return "Pending";
  if (status.isConfirmed) return "Confirmed";
  if (status.isOnDelivered) return "On delivery";
  if (status.isDelivered) return "Delivered";
  if (status.isCompleted) return "Completed";
  if (status.isCancelled) return "Cancelled";
};

const OrdersPage = () => {
  const { user } = useAuth();
  const { orders } = useOrders();
  const [selectedOrderType, setSelectedOrderType] = useState(null);

  const filterOrderByOrderType = (selectedOrderType) => {
    if (selectedOrderType === null) {
      return orders;
    }
    return orders.filter((order) => order.orderType === selectedOrderType);
  };

  const handleOrderTypeChange = (event) => {
    const value = event.target.value === "null" ? null : event.target.value;
    setSelectedOrderType(value);
  };

  const filteredOrders = filterOrderByOrderType(selectedOrderType);

  return (
    <>
      {user ? (
        <>
          {user.isAdmin ? (
            <div className="grid grid-cols-4 gap-5 w-full h-screen">
              <SideBar />

              <div className="col-span-3 p-2 w-full">
                <div className="flex flex-col justify-center items-center gap-5 w-full p-3">
                  <header
                    style={{ zIndex: 999 }}
                    className="sticky top-0 right-0 bg-white flex justify-between items-center w-full border-b border-b-[#969393]/25 pb-2"
                  >
                    <h2 className="text-2xl font-bold">
                      Orders ({filteredOrders.length})
                    </h2>

                    <select
                      className="p-2 border border-[#e4e4e5] rounded-md"
                      onChange={handleOrderTypeChange}
                    >
                      <option value="null" selected disabled>
                        Filter order by order type
                      </option>
                      <option value="null">All orders</option>
                      <option value="Product">Product orders</option>
                      <option value="Balance">Balance orders</option>
                    </select>
                  </header>

                  <div className="flex flex-wrap justify-start items-start gap-5 p-2">
                    {filteredOrders.map((order, index) => (
                      <Link
                        to={`/admin/order/${order.id}`}
                        key={index}
                        className="flex flex-col justify-start items-start gap-4 w-[300px] rounded-md border border-[#e4e4e5] text-right p-2 transform transition-all ease-in-out duration-200 hover:shadow-lg hover:-translate-y-2 active:scale-95"
                      >
                        <strong className="text-lg">
                          Order type :{" "}
                          {order.orderType == "Product" ? "Product" : "Balance"}
                        </strong>

                        <strong className="text-lg">
                          {order.orderType === "Product" ? (
                            <>
                              Prodcut name :{" "}
                              {order.cart.flatMap(
                                (cartItem) => cartItem.product.productName
                              )}
                            </>
                          ) : (
                            <>
                              Balance type : {order.paymentMethod.paymentName}
                            </>
                          )}
                        </strong>

                        <strong className="text-lg">
                          Date : {FormatDate(order.orderedAt)}
                        </strong>

                        <strong className="text-lg">
                          {order.orderType === "Product" ? (
                            <>
                              Quantity :
                              {order.cart.flatMap(
                                (cartItem) => cartItem.quantity
                              )}
                            </>
                          ) : (
                            <>Phone number : {order.phoneNumber}</>
                          )}
                        </strong>

                        <strong className="text-lg">
                          {order.orderType === "Product" ? (
                            <>
                              Price :
                              {order.cart.flatMap((cartItem) =>
                                FormatMoney(cartItem.totalPrice)
                              )}
                            </>
                          ) : (
                            <>Value : {FormatMoney(order.balanceValue)}</>
                          )}
                        </strong>

                        <strong className="text-lg">
                          {order.orderType === "Product" ? (
                            <>Status : {getStatus(order.orderStatus)}</>
                          ) : (
                            <>
                              Status : {order.isActive ? "Active" : "Pending"}
                            </>
                          )}
                        </strong>

                        <strong className="text-lg flex justify-center items-center gap-0.5">
                          By :
                          <div className="flex justify-center items-center gap-1">
                            <img
                              src={order.user.userImageURL}
                              className="w-8 h-8 rounded-full object-cover"
                              alt=""
                            />
                            <p>{order.user.fullName}</p>{" "}
                          </div>
                        </strong>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>404</>
          )}
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default OrdersPage;
