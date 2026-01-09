import { Movie } from "@prisma/client";
import { prisma } from "./prisma.service";

export const addMovie = async (payload: Omit<Movie, "id" | "createdAt" | "updatedAt">) => {
  try {
    return await prisma.movie.create({
      data: payload,
    });
  } catch (error: any) {
    console.error("Error adding a movie: ", error.message);
  }
};

export const getAllMovies = async () => {
  try {
    return await prisma.movie.findMany({
      include: {
        showtimes: true,
      },
    });
  } catch (error: any) {
    console.error("Error getting all movies: ", error.message);
  }
};

export const getMovieById = async (id: string) => {
  try {
    return await prisma.movie.findUnique({
      where: {
        id,
      },
      include: {
        showtimes: true,
      },
    });
  } catch (error: any) {
    console.error("Error getting movie by id: ", error.message);
  }
};

export const getMoviesByGenre = async (genre: string) => {
  try {
    return await prisma.movie.findMany({
      where: {
        genre,
      },
      include: {
        showtimes: true,
      },
    });
  } catch (error: any) {
    console.error("Error getting movies by genre: ", error.message);
  }
};

export const updateMovie = async (
  id: string,
  payload: {
    title?: string;
    description?: string;
    poster_image?: string;
    genre?: string;
  }
) => {
  try {
    return await prisma.movie.update({
      where: {
        id,
      },
      data: payload,
    });
  } catch (error: any) {
    console.error("Error updating movie: ", error.message);
  }
};

export const deleteMovie = async (id: string) => {
  try {
    return await prisma.movie.delete({
      where: {
        id,
      },
    });
  } catch (error: any) {
    console.error("Error deleting movie: ", error.message);
  }
};

export const searchMovies = async (searchTerm: string) => {
  try {
    return await prisma.movie.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            genre: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        showtimes: true,
      },
    });
  } catch (error: any) {
    console.error("Error searching movies: ", error.message);
  }
};
