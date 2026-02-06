import { Showtime } from "@prisma/client";
import { prisma } from "./prisma.service";

export const addShowtime = async (
  payload: Omit<Showtime, "id" | "createdAt" | "updatedAt">
) => {
  try {
    return await prisma.showtime.create({
      data: payload,
    });
  } catch (error: any) {
    console.error("Error adding showtime: ", error.message);
  }
};

export const getAllShowtimes = async () => {
  try {
    return await prisma.showtime.findMany({
      include: {
        movie: true,
        reservations: true,
      },
    });
  } catch (error: any) {
    console.error("Error getting all showtimes: ", error.message);
  }
};

export const getShowtimeById = async (id: string) => {
  try {
    return await prisma.showtime.findUnique({
      where: {
        id,
      },
      include: {
        movie: true,
        reservations: true,
      },
    });
  } catch (error: any) {
    console.error("Error getting showtime by id: ", error.message);
  }
};

export const getShowtimesByMovieId = async (movieId: string) => {
  try {
    return await prisma.showtime.findMany({
      where: {
        movieId,
      },
      include: {
        movie: true,
        reservations: true,
      },
    });
  } catch (error: any) {
    console.error("Error getting showtimes by movie: ", error.message);
  }
};

export const updateShowtime = async (
  id: string,
  payload: {
    movieId?: string;
    startTime?: Date;
    endTime?: Date;
    capacity?: number;
  }
) => {
  try {
    return await prisma.showtime.update({
      where: {
        id,
      },
      data: payload,
    });
  } catch (error: any) {
    console.error("Error updating showtime: ", error.message);
  }
};

export const deleteShowtime = async (id: string) => {
  try {
    return await prisma.showtime.delete({
      where: {
        id,
      },
    });
  } catch (error: any) {
    console.error("Error deleting showtime: ", error.message);
  }
};
