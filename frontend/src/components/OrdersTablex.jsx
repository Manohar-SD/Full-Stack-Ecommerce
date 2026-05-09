import OrderRow from "../components/OrderRow"

const OrdersTable = ({ orders ,onStatusChange }) => {
  return (
    <table width="100%" cellPadding="10">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Total</th>
          <th>Status</th>
          <th></th>
        </tr>
      
      </thead>
  
      <tbody>
        {orders.map((order) => (
        <>
        <OrderRow onStatusChange={onStatusChange} key={order._id} order={order} />
        <br />
       </>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;