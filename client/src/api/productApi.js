const API = "http://localhost:5000";

export const getProducts = async () => {
  try {
    const response = await API.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error.response?.data?.message || "Fetching products failed";
  }
};

export const getProductById = async (id) => {
  try {
    const response = await API.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error.response?.data?.message || "Fetching product failed";
  }
};

export const createProduct = async (productData, token) => {
  try {
    const response = await API.post("/products", productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error.response?.data?.message || "Creating product failed";
  }
};

export const updateProduct = async (id, productData, token) => {
  try {
    const response = await API.put(`/products/${id}`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error.response?.data?.message || "Updating product failed";
  }
};

export const deleteProduct = async (id, token) => {
  try {
    const response = await API.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error.response?.data?.message || "Deleting product failed";
  }
};
