import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../features/accounts/accountSlice";
import { accountData } from "../features/accounts/accountData";

// Get saved accounts from LocalStorage
const savedAccounts = localStorage.getItem("accounts");

// Load saved data or use dummy data
const preloadedAccounts = savedAccounts
  ? JSON.parse(savedAccounts)
  : accountData;

export const store = configureStore({
  reducer: {
    accounts: accountReducer
  },

  preloadedState: {
    accounts: {
      accounts: preloadedAccounts
    }
  }
});

// Save Redux state whenever it changes
store.subscribe(() => {
  const accounts = store.getState().accounts.accounts;

  localStorage.setItem(
    "accounts",
    JSON.stringify(accounts)
  );
});
