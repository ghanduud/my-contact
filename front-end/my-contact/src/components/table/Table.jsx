import { useDispatch, useSelector } from 'react-redux';
import { removeUserAction, editUserAction } from '../../store/userSlice';

function Table() {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.users);

	const handleDeleteUser = (userId) => {
		dispatch(removeUserAction(userId));
	};

	const handleEditUser = (user) => {
		// Implement your edit logic here
		dispatch(editUserAction(user));
	};

	return (
		<article className='table-container'>
			<table className='contact-table'>
				<thead>
					<tr>
						<th>User Name</th>
						<th>Email</th>
						<th>Phone Number</th>
						<th>Address</th>
						<th>Delete</th>
						<th>Edit</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>{user.user_name}</td>
							<td>{user.email}</td>
							<td>{user.phone_number}</td>
							<td>{user.address}</td>
							<td>
								<button onClick={() => handleDeleteUser(user.id)}>Delete</button>
							</td>
							<td>
								<button onClick={() => handleEditUser(user)}>Edit</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</article>
	);
}

export default Table;
