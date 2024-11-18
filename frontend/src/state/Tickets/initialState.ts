interface initialStateType {
  isBooking: boolean;
  isBlocking: boolean;
  isPaying: boolean;
  isAdminBooking: boolean;
  seats: any[];
  currentStatus: string;
  selectedSeat: number;
  errMsg: string;
  adminBookingErr: string;
  ticketInfo: {
    userName: string;
    amount: string;
    seatNo: string;
  };
}

const initialState: initialStateType = {
  isBooking: false,
  isBlocking: false,
  isPaying: false,
  isAdminBooking: false,
  adminBookingErr: "",
  seats: [],
  currentStatus: "loading",
  selectedSeat: -1,
  errMsg: "",
  ticketInfo: {
    userName: "N.A",
    amount: "0",
    seatNo: "N.A",
  },
};

export default initialState;
