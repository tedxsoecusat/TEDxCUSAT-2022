import React, { useEffect, useState } from "react";

import DashTitle from "src/components/DashTitle";
import Seats from "./common/Seats";
import Payment from "./common/Payment";
import Info from "./common/Info";
import Gateway from "./common/Gateway";
// import SomeError from "./common/SomeError";
import { useTicketStore } from "src/state/Tickets";
import { useUserStore } from "src/state/User";
import DashLoader from "src/components/DashLoader";
import { loadStripe } from "@stripe/stripe-js";
import config from "src/common/config";
import { Elements } from "@stripe/react-stripe-js";
import Modal from "src/components/Modal";

import { analytics } from "src/services/firebase";
import { logEvent } from "firebase/analytics";

const Tickets = () => {
  const [{ currentStatus }, { handleGetTicketStatus }] = useTicketStore();
  const [{ user, updatingVeg }, { handleUpdateVeg }] = useUserStore();
  const [isVegetarian, setIsVegetarian] = useState(false);

  useEffect(() => {
    if (user) {
      handleGetTicketStatus(user);
      logEvent(analytics, `Tickets Page Loaded ${user?.email}`);
    }
  }, [handleGetTicketStatus, user]);

  const getTitle = (status: string) => {
    switch (status) {
      case "selectSeat":
        return "Book a seat";
      case "doPayment":
        return "Pay for your ticket";
      case "paid":
        return "Get your ticket";
      default:
        console.log({ status });
        return "Book a seat";
      // return "Contact TedxCUSAT support";
    }
  };

  const stripeAuth = loadStripe(config.STRIPE_PUBLIC_KEY);

  if (currentStatus === "loading") return <DashLoader isFullPage />;

  return (
    <div>
      <DashTitle title={getTitle(currentStatus)} />
      {currentStatus === "selectSeat" ? (
        <Seats />
      ) : currentStatus === "doPayment" ? (
        <Payment />
      ) : currentStatus === "gateway" ? (
        <Elements stripe={stripeAuth}>
          <Gateway />
        </Elements>
      ) : currentStatus === "paid" ? (
        <Info />
      ) : (
        <Seats />
      )}
      <Modal
        title="Veg Preference"
        visible={(user?.isVegetarian ?? null) === null}
        okText={"Save"}
        okBtnProps={{ loading: updatingVeg }}
        onOk={() => handleUpdateVeg(isVegetarian)}
        onCancel={() => {}}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <h3 className="text-lg font-medium">Are you a vegetarian?</h3>
          <div className="flex mt-6">
            <label className="dashCheck mr-28">
              <input
                type="checkbox"
                checked={isVegetarian}
                onChange={() => setIsVegetarian((prev) => !prev)}
              />
              <span className="dashCheckMark"></span>
              <p>Yes</p>
            </label>
            <label className="dashCheck">
              <input
                type="checkbox"
                checked={!isVegetarian}
                onChange={() => setIsVegetarian((prev) => !prev)}
              />
              <span className="dashCheckMark"></span>
              <p>No</p>
            </label>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Tickets;
