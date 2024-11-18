const constants = {
  eventDate: "02 April 2022",
  isWrappedUp: false,
  noOfSeats: 100,
  ticketPrice: {
    cusatian: 900,
    other: 1200,
  },
  paymentLinks: {
    stripe: {
      cusatian: "https://buy.stripe.com/7sIg0M6pIblmaicbIL",
      other: "https://buy.stripe.com/14k01O7tM4WYfCw9AC",
    },
    gpay: {
      cusatian: (email: string, seatNo: number) =>
        `upi://pay?pa=ajmessial10@okicici&pn=Ajal P&am=900.00&cu=INR&tn=Attendee: ${email}, Seat No: ${seatNo}, Amount: 900`,
      other: (email: string, seatNo: number) =>
        `upi://pay?pa=ajmessial10@okicici&pn=Ajal P&am=1200.00&cu=INR&tn=Attendee: ${email}, Seat No: ${seatNo}, Amount: 1200`,
    },
  },

  admins: [
    "abhinavelenthikara@gmail.com",
    "abhinavrajesh49@gmail.com",
    "asnqln@gmail.com",
    "ajapoos1999@gmail.com",
  ],
};

export default constants;
