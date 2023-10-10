import './Form.scss';

function EditUser() {
	return (
		<div className='form-container'>
			<form action='' className='add-user form-contact'>
				<input type='text' name='user-name' id='user-name' />
				<label htmlFor='user-name'>User Name</label>
				<input type='number' name='user-phone' id='user-phone' />
				<label htmlFor='user-phone'>Phone Number</label>
				<input type='email' name='user-email' id='user-email' />
				<label htmlFor='user-email'>Email</label>
				<input type='text' name='user-address' id='user-address' />
				<label htmlFor='user-address'>User Address</label>
			</form>
		</div>
	);
}

export default EditUser;
