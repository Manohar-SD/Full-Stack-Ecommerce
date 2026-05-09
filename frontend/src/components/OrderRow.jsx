const OrderRow = ({ order ,onStatusChange}) => {

const orderStatus = ["Processing","Shipped","Delevered","Canceled"]

  const getStatusStyle = (status) => {
    if (status === "Delivered") return { background: "green" };
    if (status === "Processing") return { background: "orange" };
    if (status === "Shipped") return { background: "blue" };
    if(status==="Canceled" ) return {background:"red"};
    return { background: "gray" };
  };

  const onChangeStatus = (event)=>{
    onStatusChange({id:order._id,orderStatus:event.target.value});
  }




  return (
    <>
    <tr style={{ borderBottom: "1px solid #ddd" }}>
      <td>#{order._id.slice(-6)}</td>

      <td>
        {new Date(order.createdAt).toLocaleDateString()}
      </td>

      <td>₹{order.totalPrice}</td>

      <td>
        {/* <span
          style={{
            ...getStatusStyle(order.orderStatus),
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px"
          }}
        >
          {order.orderStatus}
        </span> */}

        <select value={order.orderStatus} onChange={(event)=>{onChangeStatus(event)}}  style={{
            ...getStatusStyle(order.orderStatus),
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px"
          }} name="" id="">
          <option>  {orderStatus[0]}</option>
          <option>{orderStatus[1]}</option>
          <option>{orderStatus[2]}</option>
          <option>{orderStatus[3]}</option>

        </select>
      </td>

      <td>
        <button>Edit </button>
      </td>
    </tr>
         
    </>
  );
};

export default OrderRow;