import axios from "axios";

// Base URL of the Express/Mongo backend in ../backend
// Set NEXT_PUBLIC_API_URL in .env.local to override (see .env.example).
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach the JWT (if the user is signed in) to every request.
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("yumtreat_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize error messages coming back from the Express error handler.
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);

/* ---------------------------- Foods ---------------------------- */
export const getFoods = () => api.get("/foods").then((r) => r.data);
export const getFoodById = (id) => api.get(`/foods/${id}`).then((r) => r.data);
export const addFood = (payload) => api.post("/foods/add", payload).then((r) => r.data);
export const updateFood = (id, payload) =>
  api.put(`/foods/update/${id}`, payload).then((r) => r.data);
export const deleteFood = (id) => api.delete(`/foods/delete/${id}`).then((r) => r.data);

/* -------------------------- Categories -------------------------- */
export const getCategories = () => api.get("/categories").then((r) => r.data);

/* ----------------------------- Auth ----------------------------- */
export const signUp = (payload) => api.post("/auth/sign_up", payload).then((r) => r.data);
export const signIn = (payload) => api.post("/auth/sign_in", payload).then((r) => r.data);
export const getAccount = () => api.get("/auth/account").then((r) => r.data);

/* ---------------------------- Orders ----------------------------- */
export const placeOrder = (payload) => api.post("/orders/place", payload).then((r) => r.data);
export const getMyOrders = () => api.get("/orders/my-orders").then((r) => r.data);
export const getAllOrders = () => api.get("/orders/admin").then((r) => r.data);
export const updateOrderStatus = (id, status) =>
  api.patch(`/orders/update-status/${id}`, { status }).then((r) => r.data);
export const cancelOrder = (id) => api.patch(`/orders/cancel/${id}`).then((r) => r.data);
export const completeOrder = (id) => api.patch(`/orders/complete/${id}`).then((r) => r.data);

/* ---------------------------- Reviews ----------------------------- */
export const getReviewsByProduct = (productID) =>
  api.get(`/reviews/product/${productID}`).then((r) => r.data);
export const addReview = (payload) => api.post("/reviews/add-review", payload).then((r) => r.data);

/* -------------------------- Image helper -------------------------- */
// Food.imageUrl / Category.img are stored as bare filenames (e.g. "burger-1")
// matching /public/images/{foods,categories}/<name>.png
export const foodImage = (imageUrl) =>
  imageUrl?.startsWith("http") ? imageUrl : `/images/foods/${imageUrl}.png`;
export const categoryImage = (img) =>
  img?.startsWith("http") ? img : `/images/categories/${img}.png`;
