import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import DashButton from "src/components/DashButton";
import { useTicketStore } from "src/state/Tickets";
import { useUserStore } from "src/state/User";
// import DashInput from "src/components/DashInput";

const Gateway = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [{ errMsg, isPaying }, { handleStripePayment }] = useTicketStore();
  const [{ user }] = useUserStore();
  // const [values, setValues] = useState({
  //   city: "",
  //   state: "",
  //   country: "",
  //   pincode: "",
  // });

  return (
    <div className="w-fit m-auto">
      {/* <div className="m-auto w-fit ">
        <DashInput
          className="mx-4"
          label="City"
          onChange={(val) => setValues((prev) => ({ ...prev, city: val }))}
        />
        <DashInput
          className="mx-4"
          label="Pincode"
          onChange={(val) => setValues((prev) => ({ ...prev, pincode: val }))}
        />
        <DashInput
          className="mx-4"
          label="State"
          onChange={(val) => setValues((prev) => ({ ...prev, state: val }))}
        />
      </div> */}
      {errMsg && <p className="stripeErr">{errMsg}</p>}
      <p className="stripeCardLabel">Enter your card details</p>
      <CardElement className="stripeCardInput" />
      <div>
        <DashButton
          loading={isPaying}
          className="m-auto"
          onClick={() =>
            handleStripePayment(
              elements?.getElement(CardElement),
              stripe,
              // values,
              user
            )
          }
        >
          Pay
        </DashButton>
      </div>
    </div>
  );
};

export default Gateway;
