const BASE_URL = import.meta.env.VITE_BASE_URL || "https://goalkeepers-server.onrender.com/v1/api";
const buildHeaders = (isTokenRequired) => {
    const headers = {
        "Content-Type": "application/json",
    };

    if (isTokenRequired) {
        const token = localStorage.getItem("token");
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }

    return headers;
};

export const updateData = async (endpoint, updatedData, isTokenRequired = true) => {
    const completeURL = `${BASE_URL}/${endpoint}`;
    try {
        const response = await fetch(completeURL, {
            method: "PUT",
            headers: buildHeaders(isTokenRequired),
            body: JSON.stringify(updatedData),
        });

        const data = await response.json();
        if (!response.ok) {
            return { error: data?.error || "Failed to update data" };
        }

        return data;
    } catch (error) {
        console.error("Error updating data:", error);
        return { error: "An unexpected error occurred while updating." };
    }
};

export const createData = async (endpoint, newData, isTokenRequired = true) => {
    const completeURL = `${BASE_URL}/${endpoint}`;
    try {
        const response = await fetch(completeURL, {
            method: "POST",
            headers: buildHeaders(isTokenRequired),
            body: JSON.stringify(newData),
        });

        const data = await response.json();
        if (!response.ok) {
            return { error: data?.error || "Failed to create data" };
        }

        return data;
    } catch (error) {
        console.error("Error creating data:", error);
        return { error: "An unexpected error occurred while creating." };
    }
};

export const getData = async (endpoint, isTokenRequired = true) => {
    const completeURL = `${BASE_URL}/${endpoint}`;
    try {
        const response = await fetch(completeURL, {
            method: "GET",
            headers: buildHeaders(isTokenRequired),
        });

        const data = await response.json();
        if (!response.ok) {
            return { error: data?.error || "Failed to get data" };
        }

        return data;
    } catch (error) {
        console.error("Error retrieving data:", error);
        return { error: "An unexpected error occurred while retrieving." };
    }
};
