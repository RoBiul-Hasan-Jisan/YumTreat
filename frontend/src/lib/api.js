export const API_BASE_URL =
    import.meta.env.MODE === "production"
        ? import.meta.env.VITE_API_PROD_URL
        : import.meta.env.VITE_API_DEV_URL;
// console.log("Degub-> API url: ", API_BASE_URL, import.meta.env.MODE);

// Reusable response handler
const handleResponse = async (response) => {
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const error = new Error(data.message || "Something went wrong");
        error.status = response.status;
        // error.data = data;
        throw error;
    }
    return data;
};

// API helper object
const apiF = {
    get: async (endpoint, options = {}) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            credentials: "include",
        });
        return handleResponse(response);
    },

    post: async (endpoint, data, options = {}) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        return handleResponse(response);
    },

    put: async (endpoint, data, options = {}) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        return handleResponse(response);
    },

    patch: async (endpoint, data, options = {}) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        return handleResponse(response);
    },

    delete: async (endpoint, options = {}) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            credentials: "include",
        });
        return handleResponse(response);
    },
};

export default apiF;