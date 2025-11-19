import { socket } from "./socket"; // your socket instance

// === LIST REQUESTS ===
export function listRequestsSocket(): Promise<any> {
    return new Promise((resolve) => {
        socket.emit("list_requests", {}, (res: any) => {
            resolve(res);
        });
    });
}

// === DELETE REQUEST ===
export function deleteRequestSocket(id: number): Promise<any> {
    return new Promise((resolve) => {
        socket.emit("delete_request", { id }, (res: any) => {
            resolve(res);
        });
    });
}

// === TRANSCRIBE ===
export function transcribeRequest(url: string): Promise<any> {
    return new Promise((resolve) => {
        socket.emit("transcribe_request", { media_urls: [url] }, (res: any) => {
            resolve(res)
        })
    })
}
