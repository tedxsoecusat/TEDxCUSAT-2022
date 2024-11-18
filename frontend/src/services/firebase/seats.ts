import { db } from ".";

const seats = db.collection("seats");

export const bookSeat = (data: {
  seatNo: number;
  userId?: string;
  status: string;
}) => {
  return seats
    .doc(`${data.seatNo}`)
    .set({ userId: data?.userId, status: data?.status, updated: Date.now() });
};

export const updateSeat = async (uid: any, data: object) => {
  return seats.doc(`${uid}`).set({ ...data, updated: Date.now() });
};

export const deleteSeat = async (seatNo: any) => {
  return seats.doc(`${seatNo}`).delete();
};

export const getSeats = () => {
  return seats.get();
};

export const getUserSeat = (uid: string) => {
  return seats.where("userId", "==", uid).get();
};

export const getBookedSeats = () => {
  return seats.where("status", "==", "booked").get();
};
