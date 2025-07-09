import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  requestCategoryAll,
  requestCategoryById,
  requestProductsAll,
  requestProductById,
} from "../services/api";

// Thunk to fetch all categories
export const fetchCategoriesAll = createAsyncThunk(
  "pet/categoriesAll",
  async (_, thunkApi) => {
    try {
      const categoriesAll = await requestCategoryAll();
      return categoriesAll;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch category by ID
export const fetchCategoryById = createAsyncThunk(
  "pet/categoryById",
  async (categoryId, thunkApi) => {
    try {
      const categoryById = await requestCategoryById(categoryId);
      return categoryById;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch all products
export const fetchProductsAll = createAsyncThunk(
  "pet/productsAll",
  async (_, thunkApi) => {
    try {
      const productsAll = await requestProductsAll();
      return productsAll;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch product by ID
export const fetchProductById = createAsyncThunk(
  "pet/productById",
  async (productId, thunkApi) => {
    try {
      const productById = await requestProductById(productId); // Fixed function call
      return productById;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// Initial state for pet slice
const initialState = {
  categories: {
    all: [],
    current: null,
    isLoading: false,
    error: null,
  },
  products: {
    all: [],
    byCategory: [],
    isLoading: false,
    error: null,
  },
};

// Redux slice for pet shop
const petSlice = createSlice({
  name: "pet",
  initialState,
  extraReducers: (builder) => {
    builder
      // Handle fetchCategoriesAll
      .addCase(fetchCategoriesAll.pending, (state) => {
        state.categories.isLoading = true;
        state.categories.error = null;
      })
      .addCase(fetchCategoriesAll.fulfilled, (state, action) => {
        state.categories.isLoading = false;
        state.categories.all = action.payload;
      })
      .addCase(fetchCategoriesAll.rejected, (state, action) => {
        state.categories.isLoading = false;
        state.categories.error = action.payload;
      })

      // Handle fetchCategoryById
      .addCase(fetchCategoryById.pending, (state) => {
        state.categories.isLoading = true;
        state.products.isLoading = true;
        state.categories.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.categories.isLoading = false;
        state.products.isLoading = false;
        state.categories.current = action.payload.category;
        state.products.byCategory = state.products.all.filter(
          (product) => product.categoryId === Number(action.payload.category.id)
        );
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.categories.isLoading = false;
        state.products.isLoading = false;
        state.categories.error = action.payload;
      })

      // Handle fetchProductsAll
      .addCase(fetchProductsAll.pending, (state) => {
        state.products.isLoading = true;
        state.products.error = null;
      })
      .addCase(fetchProductsAll.fulfilled, (state, action) => {
        state.products.isLoading = false; // Fixed: should set products.isLoading
        state.products.all = action.payload;
      })
      .addCase(fetchProductsAll.rejected, (state, action) => {
        state.products.isLoading = false;
        state.products.error = action.payload;
      })

      // Handle fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.products.isLoading = true;
        state.products.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.products.isLoading = false;
        state.products.current = action.payload; // Save current product
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.products.isLoading = false;
        state.products.error = action.payload;
      });
  },
});

export const petReducer = petSlice.reducer;
