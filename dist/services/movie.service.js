"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchMovies = exports.deleteMovie = exports.updateMovie = exports.getMoviesByGenre = exports.getMovieById = exports.getAllMovies = exports.addMovie = void 0;
const prisma_service_1 = require("./prisma.service");
const addMovie = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_service_1.prisma.movie.create({
            data: payload,
        });
    }
    catch (error) {
        console.error("Error adding a movie: ", error.message);
    }
});
exports.addMovie = addMovie;
const getAllMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_service_1.prisma.movie.findMany({
            include: {
                showtimes: true,
            },
        });
    }
    catch (error) {
        console.error("Error getting all movies: ", error.message);
    }
});
exports.getAllMovies = getAllMovies;
const getMovieById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_service_1.prisma.movie.findUnique({
            where: {
                id,
            },
            include: {
                showtimes: true,
            },
        });
    }
    catch (error) {
        console.error("Error getting movie by id: ", error.message);
    }
});
exports.getMovieById = getMovieById;
const getMoviesByGenre = (genre) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_service_1.prisma.movie.findMany({
            where: {
                genre,
            },
            include: {
                showtimes: true,
            },
        });
    }
    catch (error) {
        console.error("Error getting movies by genre: ", error.message);
    }
});
exports.getMoviesByGenre = getMoviesByGenre;
const updateMovie = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_service_1.prisma.movie.update({
            where: {
                id,
            },
            data: payload,
        });
    }
    catch (error) {
        console.error("Error updating movie: ", error.message);
    }
});
exports.updateMovie = updateMovie;
const deleteMovie = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_service_1.prisma.movie.delete({
            where: {
                id,
            },
        });
    }
    catch (error) {
        console.error("Error deleting movie: ", error.message);
    }
});
exports.deleteMovie = deleteMovie;
const searchMovies = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma_service_1.prisma.movie.findMany({
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
    }
    catch (error) {
        console.error("Error searching movies: ", error.message);
    }
});
exports.searchMovies = searchMovies;
