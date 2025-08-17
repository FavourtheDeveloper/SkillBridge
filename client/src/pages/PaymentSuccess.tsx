// src/pages/PaymentSuccess.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../api";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAndBook = async () => {
        try {
            const verifyRes = await API.get(`/payments/verify/${reference}`);
            if (verifyRes.data.success) {
              const token = localStorage.getItem("token");
              const bookingDraft = JSON.parse(sessionStorage.getItem("bookingDraft") || "{}");
          
              await API.post("/bookings", bookingDraft, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
          
              sessionStorage.removeItem("bookingDraft");
          
              Swal.fire({
                title: "Success!",
                text: "Booked Successfully",
                icon: "success",
                confirmButtonText: "OK",
              }).then(() => {
                navigate("/my-bookings");
              });
          
              window.dispatchEvent(new Event("bookingUpdated"));
            }
          } catch (err) {
            Swal.fire("Error", "Verification or booking failed", "error");
          }
          
    };

    verifyAndBook();
  }, [reference, navigate]);

  return <div className="text-center mt-20 text-lg">Verifying payment, please wait...</div>;
};

export default PaymentSuccess;
