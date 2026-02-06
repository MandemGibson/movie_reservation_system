import { Reservation, Status } from "@prisma/client";
import { prisma } from "./prisma.service";

export const addReservation = async (
  payload: Omit<Reservation, "id" | "createdAt" | "updatedAt">
) => {
  try {
    return await prisma.reservation.create({
      data: payload,
      include: {
        user: true,
        showtime: true,
      },
    });
  } catch (error: any) {
    console.error("Error adding reservation: ", error.message);
  }
};

export const getAllReservations = async () => {
  try {
    return await prisma.reservation.findMany({
      include: {
        user: true,
        showtime: true,
      },
    });
  } catch (error: any) {
    console.error("Error getting all reservations: ", error.message);
  }
};

export const getReservationById = async (id: string) => {
  try {
    return await prisma.reservation.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        showtime: true,
      },
    });
  } catch (error: any) {
    console.error("Error getting reservation by id: ", error.message);
  }
};

export const getReservationsByUserId = async (userId: string) => {
  try {
    return await prisma.reservation.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        showtime: true,
      },
    });
  } catch (error: any) {
    console.error("Error getting reservations by user: ", error.message);
  }
};

export const getReservationsByShowtimeId = async (showtimeId: string) => {
  try {
    return await prisma.reservation.findMany({
      where: {
        showtimeId,
      },
      include: {
        user: true,
        showtime: true,
      },
    });
  } catch (error: any) {
    console.error("Error getting reservations by showtime: ", error.message);
  }
};

export const updateReservation = async (
  id: string,
  payload: {
    userId?: string;
    showtimeId?: string;
    seatNumber?: number;
    status?: Status;
  }
) => {
  try {
    return await prisma.reservation.update({
      where: {
        id,
      },
      data: payload,
      include: {
        user: true,
        showtime: true,
      },
    });
  } catch (error: any) {
    console.error("Error updating reservation: ", error.message);
  }
};

export const deleteReservation = async (id: string) => {
  try {
    return await prisma.reservation.delete({
      where: {
        id,
      },
      include: {
        user: true,
        showtime: true,
      },
    });
  } catch (error: any) {
    console.error("Error deleting reservation: ", error.message);
  }
};
