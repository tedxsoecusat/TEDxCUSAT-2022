import React, { useEffect } from "react";
import DashLoader from "src/components/DashLoader";
import { useTicketStore } from "src/state/Tickets";
import { useUserStore } from "src/state/User";

const Logout = () => {
  const [, { handleSignOut, resetUserStore }] = useUserStore();
  const [, { resetTicketStore }] = useTicketStore();

  useEffect(() => {
    handleSignOut();
    resetTicketStore();
    resetUserStore();
  }, [handleSignOut, resetTicketStore, resetUserStore]);

  return <DashLoader isFullPage />;
};

export default Logout;
