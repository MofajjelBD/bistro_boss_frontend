import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth/useAuth";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`paymentHistory/${user.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <SectionTitle
        subHeading={"Finance"}
        heading={"Payment History"}
      ></SectionTitle>
      <div className="flex justify-start">
        <h2 className="text-4xl">Total History: {payments.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Transaction Id</th>
              <th>Total Price</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payments.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.email}</td>
                <td>{item.transactionId}</td>
                <td>{item.price}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
