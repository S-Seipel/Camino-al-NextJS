import { AnyAction, configureStore, type Middleware } from '@reduxjs/toolkit';
import userReducer from './users/slice';
import { rollbackUser } from './users/slice';
import { toast } from 'sonner';

const presistanceLocalStorageMiddleware = (store) => (next) => (action) => {  
  const { type } = action
  console.log(type)
  next(action);
  localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
}

const syncWithDatabase = store => next => action => {
  const { type, payload } = action
  const previousState = store.getState() as RootState;

  next(action);

  if (type === 'users/deleteUserById') {
    const userIdToRemove = payload;
    const userToRemove = previousState.users.find(user => user.id === userIdToRemove)

    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
      method: 'DELETE'
    })
    .then(res => {
      if (res.ok) {
        return toast.success(`Usuario ${userIdToRemove} eliminado correctamente`)
      } else {
        throw new Error('Error al eliminar el usuario')
      }
    })
    .catch(e => {
      toast.error(`Error deleting user ${userIdToRemove}`)
      if (userToRemove) store.dispatch(rollbackUser(userToRemove))
      console.error(e)
    })
  }
  if (type === 'users/addNewUser') {
    fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: 'POST'
    })
    .then(res => {
      if (res.ok) {
        return toast.success(`Usuario creado correctamente`)
      }
    })
    .catch(e => {
      console.error(e)
    })
  }
}

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
	  getDefaultMiddleware().concat(presistanceLocalStorageMiddleware, syncWithDatabase),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;