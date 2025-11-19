require("dotenv").config();
const FormData = require("form-data");
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const axios = require("axios");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

const api = axios.create({
    baseURL: process.env.HARF_API_BASE,
    headers: {
        Authorization: process.env.HARF_API_TOKEN,
    }
});

// ---------------- SOCKET EVENTS ---------------- //

// LIST REQUESTS
io.on("connection", (socket) => {
    console.log("client connected:", socket.id);

    socket.on("list_requests", async (_, cb) => {
        try {
            const res = await api.get("/requests/");
            cb({ ok: true, data: res.data });
        } catch (e) {
            cb({ ok: false, error: e.message });
        }
    });

    // DELETE REQUEST
    socket.on("delete_request", async ({ id }, cb) => {
        try {
            await api.delete(`/requests/${id}/`);
            cb({ ok: true });
        } catch (e) {
            cb({ ok: false, error: e.message });
        }
    });

    // TRANSCRIBE
    socket.on("transcribe_request", async ({ media_urls }, cb) => {
        try {
            const res = await api.post("/transcribe_files/", { media_urls });
            cb({ ok: true, data: res.data });
        } catch (e) {
            cb({ ok: false, error: e.message });
        }
    });

    // REQUEST DETAIL
    socket.on("get_request", async ({ id }, cb) => {
        try {
            const res = await api.get(`/requests/${id}/`);
            cb({ ok: true, data: res.data });
        } catch (e) {
            cb({ ok: false, error: e.message });
        }
    });

    socket.on("disconnect", () => {
        console.log("client disconnected:", socket.id);
    });
});

// ---------------- START SERVER ---------------- //

server.listen(process.env.PORT, () => {
    console.log(`Socket server running on port ${process.env.PORT}`);
});
