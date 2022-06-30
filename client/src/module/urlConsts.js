export const API_URL = "https://localhost:5001"

export const API = {
    Product: {
        Get: `${API_URL}/api/things`,
        Update: `${API_URL}/api/things/update/`,
        Post: `${API_URL}/api/things/new`,
        DeleteOne: `${API_URL}/api/things/delete/`,
        DeleteAll: `${API_URL}/api/things/deleteall`
    },
    User: {
        Get: `${API_URL}/api/users`,
        Create: `${API_URL}/api/users/new`,
        Delete: `${API_URL}/api/users/delete/`,
        Change: `${API_URL}/api/users/update/`
    },
    QR: {
        Download: `${API_URL}/api/things/getQr/`,
        Delete: `${API_URL}/api/things/DeleteQR`
    }
}