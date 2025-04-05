import { PAYMENT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPayment: builder.query({
      query: (orderId) => ({
        url: `${PAYMENT_URL}/${orderId}`,
      }),
      providesTags: (result, error, orderId) => [
        { type: "Order", id: orderId },
      ],
    }),

    onSuccess: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${PAYMENT_URL}/${orderId}`,
        method: "PUT",
        body: details,
      }),
    }),

    onFailure: builder.query({
      query: () => `${PAYMENT_URL}/fail`,
    }),

    onCancel: builder.mutation({
      query: (orderId) => ({
        url: `${PAYMENT_URL}/cancel/${orderId}`,
        method: "DELETE",
      }),
      providesTags: (result, error, orderId) => [
        { type: "Order", id: orderId },
      ],
    }),

    onIpn: builder.query({
      query: () => `${PAYMENT_URL}/ipn`,
    }),
  }),
});

export const {
  useGetPaymentQuery,
  useOnSuccessMutation,
  useOnFailureQuery,
  useOnCancelMutation,
  useOnIpnQuery,
} = paymentApiSlice;
