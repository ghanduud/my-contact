import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	users: [
		{
			id: 1,
			user_name: 'Ghandy',
			email: 'omar.ghandy780@gmail.com',
			phone_number: '+201020455089',
			address: 'cairo',
		},
		{
			id: 2,
			user_name: 'Ghandy',
			email: 'omar.ghandy780@gmail.com',
			phone_number: '+201020455089',
			address: 'cairo',
		},
		{
			id: 3,
			user_name: 'Ghandy',
			email: 'omar.ghandy780@gmail.com',
			phone_number: '+201020455089',
			address: 'cairo',
		},
	],
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addUser: (state, action) => {
			state.users.push(action.payload);
		},
		removeUser: (state, action) => {
			const userId = action.payload;
			state.users = state.users.filter((user) => user.id !== userId);
		},
		editUser: (state, action) => {
			const updatedUser = action.payload;
			const index = state.users.findIndex((user) => user.id === updatedUser.id);
			if (index !== -1) {
				state.users[index] = { ...state.users[index], ...updatedUser };
			}
		},
	},
});

export const addUserAction = (user) => usersSlice.actions.addUser(user);
export const removeUserAction = (userId) => usersSlice.actions.removeUser(userId);
export const editUserAction = (user) => usersSlice.actions.editUser(user);

export default usersSlice.reducer;
