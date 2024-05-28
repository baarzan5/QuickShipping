import React from "react";
import { useAuth } from "../context/AuthContext";
import DataTable from "react-data-table-component";
import { useOrders } from "../context/OrdersContext";
import { FormatMoney } from "../utils/FormatMoney";
import { Link } from "react-router-dom";
import { FormatDate } from "../utils/FormatDate";

// Function to get the status from the orderStatus object
const getStatus = (status) => {
  if (status.isPending) return "لە چاوەڕوانیدا";
  if (status.isConfirmed) return "پەسەندکرا";
  if (status.isOnDelivered) return "لە گەیاندنە";
  if (status.isDelivered) return "هاتە گەیاندن";
  if (status.isCompleted) return "جێ بەجێکرا";
  if (status.isCancelled) return "ڕەتکرایەوە";
};

const MyOrdersPage = () => {
  const { user } = useAuth();
  const { orders } = useOrders();

  const columns = [
    {
      name: "دۆخی گەیاندن",
      cell: (row) => <strong className="text-base">{row.status}</strong>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "نرخ",
      selector: (row) => row.totalPrice,
      format: (row) => FormatMoney(row.totalPrice),
      cell: (row) => (
        <strong className="text-base">{FormatMoney(row.totalPrice)} IQD</strong>
      ),
    },
    {
      name: "دانە",
      selector: (row) => row.quantity,
      cell: (row) => <strong className="text-base">{row.quantity}</strong>,
    },
    {
      name: "ڕێککەوت",
      selector: (row) => row.date,
      cell: (row) => <strong className="text-base">{row.date}</strong>,
    },
    {
      name: "ناوی بەرهەم",
      selector: (row) => row.productName,
      cell: (row) => (
        <Link to={`/product/${row.productId}`}>
          <strong className="text-base hover:underline hover:underline-offset-4">
            {row.productName}
          </strong>
        </Link>
      ),
    },
  ];

  const data = orders
    .filter(
      (order) => order.orderType === "Product" && order.user.email == user.email
    )
    .flatMap((order) =>
      order.cart.map((cartItem) => ({
        id: order.id,
        productId: cartItem.id,
        productName: cartItem.product.productName,
        quantity: cartItem.quantity,
        totalPrice: cartItem.totalPrice,
        date: FormatDate(order.orderedAt),
        status: getStatus(order.orderStatus),
      }))
    );

  // Custom styles for the DataTable
  const customStyles = {
    headCells: {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "16px",
        fontWeight: "bold",
        textAlign: "center",
        width: "100%",
        borderBottom: "1px solid #e4e4e5",
      },
    },
    cells: {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginTop: "10px",
        padding: "10px",
        borderBottom: "1px solid #e4e4e5",
      },
    },
  };

  return (
    <>
      {user ? (
        <div className="pt-[30px]">
          <div className="flex flex-col justify-end items-end w-[95%] p-2 rounded-md mainShadow mx-auto">
            <div className="flex flex-row-reverse justify-between items-center w-full px-2 pb-1.5 border-b border-b-[#e4e4e5]">
              <h2 className="text-xl font-semibold">داواکاریەکانم</h2>
              <select
                className="text-right border border-[#e4e4e5] rounded-md p-2 transform transition-all duration-100 ease-in-out active:scale-95"
              >
                <option selected>
                  <p>ڕیزکردن بەپێی دۆخی گەیاندن</p>
                </option>

                <option value="">لە چاوەڕوانیدا</option>
                <option value="">پەسەندکرا</option>
                <option value="">لە گەیاندنە</option>
                <option value="">هاتە گەیاندن</option>
                <option value="">جێ بەجێکرا</option>
                <option value="">ڕەتکرایەوە</option>

              </select>
            </div>

            <div className="w-full">
              {orders.filter(
                (order) =>
                  order.orderType == "Product" && order.user.email == user.email
              ).length == 0 ? (
                <strong className="text-2xl p-2 flex justify-center items-center">هیچ داواکاریەکت نەکردووە</strong>
              ) : (
                <DataTable
                  columns={columns}
                  data={data}
                  customStyles={customStyles}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default MyOrdersPage;
