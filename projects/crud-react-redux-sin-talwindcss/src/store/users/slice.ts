import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

const DEFAULT_STATE = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alicejohnson@gmail.com',
    github: 'alicejohnson',
  }, 
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bobsmit@gmail.com',
    github: 'bobsmit',
  },
  {
    id: '3',
    name: 'Charlie Brown',
    email: 'charliebrown@gmail.com',
    github: 'charliebrown',
  },
];

export type UserId = string;

export interface User {
    name: string;
    email: string;
    github: string
}

export interface UserWithId extends User {
    id: UserId;
}

const initialState: UserWithId[] = (() => { 
  const persistedState = localStorage.getItem("__redux__state__");
  if (persistedState) {
    return JSON.parse(persistedState).users;
  }
  return DEFAULT_STATE;
})();  

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      addNewUser: (state, action: PayloadAction<User>) => { 
        const id =  crypto.randomUUID();
        state.push({ id, ...action.payload }) 
      },
      deleteUserById: (state, action: PayloadAction<UserId>) => {
        const id = action.payload;
        return state.filter((user) => user.id !== id);
      }, 
      rollbackUser: (state, action: PayloadAction<UserWithId>) => {
        const isUserAlreadyDefined = state.some(user => user.id === action.payload.id)
        if (!isUserAlreadyDefined) {
          state.push(action.payload)
        }
      }
    },
})

export default usersSlice.reducer;

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;
