
import { createSlice } from "@reduxjs/toolkit";
import { accountData } from "./accountData";

const accountSlice = createSlice({
  name: "accounts",

  initialState: {
    accounts: accountData
  },

  reducers: {

    // Add new account
    addAccount: (state, action) => {
      state.accounts.push({
        id: Date.now(),
        ...action.payload
      });
    },

    // Update existing account
    updateAccount: (state, action) => {
      const index = state.accounts.findIndex(
        (account) => account.id === action.payload.id
      );

      if (index !== -1) {
        state.accounts[index] = action.payload;
      }
    },

    // Delete account
    deleteAccount: (state, action) => {
      state.accounts = state.accounts.filter(
        (account) => account.id !== action.payload
      );
    }

  }
});

export const {
  addAccount,
  updateAccount,
  deleteAccount
} = accountSlice.actions;

export default accountSlice.reducer;
