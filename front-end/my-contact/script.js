const table = document.querySelector('.contact-table');
const addUserFormContainer = document.querySelector('.form-container__add');
const editUserFormContainer = document.querySelector('.form-container__edit');
const addUserForm = document.querySelector('.add-form');
const editUserForm = document.querySelector('.edit-form');
const btnAddContact = document.querySelector('.btnAddContact');
const contactSearchInput = document.getElementById('contact-search');
const btnsCloses = document.querySelectorAll('.btnClose');
const loadingMessage = document.getElementById('loading-message');
const contactList = document.querySelector('.contact-list');

const api = 'http://localhost:8080/api/v1/';
const contacts = [];

// Fetch data from the API
fetch(`${api}contacts`)
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		// Save the fetched contacts in the 'contacts' array
		contacts.push(...data);

		// Remove the loading message
		loadingMessage.style.display = 'none';

		// Iterate over the fetched contacts and add them to the table
		contacts.forEach((contact) => {
			addContactToTable(contact);
			addContactToList(contact);
		});
	})
	.catch((error) => {
		// Handle any errors that occur during the fetch
		console.error('Error fetching contacts:', error);
		loadingMessage.textContent = 'Error fetching contacts';
	});

btnsCloses.forEach((btn) => {
	btn.addEventListener('click', () => {
		addUserFormContainer.classList.add('hidden');
		editUserFormContainer.classList.add('hidden');
	});
});

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		addUserFormContainer.classList.add('hidden');
		editUserFormContainer.classList.add('hidden');
	}
});

addUserFormContainer.addEventListener('click', (event) => {
	if (event.target === addUserFormContainer) {
		addUserFormContainer.classList.add('hidden');
	}
});

editUserFormContainer.addEventListener('click', (event) => {
	if (event.target === editUserFormContainer) {
		editUserFormContainer.classList.add('hidden');
	}
});
// Add event listener to the table for handling delete button clicks
table.addEventListener('click', handleDelete);
contactList.addEventListener('click', handleDelete);

// Add event listener to the "Add User" button to show the add user form
btnAddContact.addEventListener('click', showAddUserForm);

// Add event listener to the add user form for handling form submission
addUserForm.addEventListener('submit', addUser);

contactSearchInput.addEventListener('input', handleContactSearch);

table.addEventListener('click', handleEdit);
contactList.addEventListener('click', handleEdit);

// Function to handle delete button clicks
function handleDelete(event) {
	if (event.target.classList.contains('btnDelete')) {
		const row = event.target.closest('tr');
		const listItem = event.target.closest('li');
		let id;

		if (row) {
			id = parseInt(row.dataset.contactId);
		} else if (listItem) {
			id = parseInt(listItem.dataset.contactId);
		}

		// Find the contact with the matching id
		const contact = contacts.find((contact) => contact.id === id);

		if (contact) {
			// Send DELETE request to the API
			fetch(`${api}contacts/${id}`, {
				method: 'DELETE',
			})
				.then((response) => {
					if (response.ok) {
						// Remove the contact from the array
						const index = contacts.indexOf(contact);
						contacts.splice(index, 1);

						clearContactList();
						clearTable();

						contacts.forEach((contact) => {
							addContactToTable(contact);
							addContactToList(contact);
						});

						console.log('Contact deleted successfully');
					} else {
						throw new Error('Failed to delete contact');
					}
				})
				.catch((error) => {
					// Handle any errors that occur during the DELETE request
					console.error('Error deleting contact:', error);
				});
		}
	}
}

// Function to show the add user form
function showAddUserForm() {
	addUserForm.reset();
	addUserFormContainer.classList.remove('hidden');
}

// Function to add a user to the array and table
function addUser(event) {
	event.preventDefault(); // Prevent the form from submitting and refreshing the page

	// Get the form input values
	const userName = document.getElementById('add-user-name').value;
	const userEmail = document.getElementById('add-user-email').value;
	const phoneNumber = document.getElementById('add-phone-number').value;
	const address = document.getElementById('add-address').value;

	// Create the new contact object
	const newContact = {
		userName: userName,
		email: userEmail,
		phoneNumber: phoneNumber,
		address,
	};

	// Make a POST request to the API to add the new contact
	fetch(`${api}contacts`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newContact),
	})
		.then((response) => response.json())
		.then((data) => {
			// Add the newly created contact (with id) to the 'contacts' array
			contacts.push(data);

			// Add the new contact to the table
			addContactToTable(data);
			addContactToList(data);

			// Reset the form input values
			addUserForm.reset();

			// Hide the add user form
			addUserFormContainer.classList.add('hidden');
		})
		.catch((error) => {
			// Handle any errors that occur during the POST request
			console.error('Error adding contact:', error);
		});
}

// Function to add a contact to the table
// Function to add a contact to the table
function addContactToTable(contact) {
	const html = `
	  <tr data-contact-id="${contact.id}">
		<td>${contact.userName}</td>
		<td>${contact.email}</td>
		<td>${contact.phoneNumber}</td>
		<td>${contact.address}</td>
		<td><button class="btnEdit">Edit</button></td>
		<td><button class="btnDelete">Delete</button></td>
	  </tr>`;

	table.insertAdjacentHTML('beforeend', html);
}

// Function to generate a unique id
// function generateUniqueId() {
// 	return Math.floor(Math.random() * 1000000) + 1;
// }

function handleContactSearch(event) {
	const searchQuery = event.target.value.toLowerCase();

	const filteredContacts = contacts.filter(
		(contact) =>
			contact.userName.toLowerCase().includes(searchQuery) || contact.phoneNumber.includes(searchQuery)
	);

	clearTable();

	filteredContacts.forEach((contact) => addContactToTable(contact));
}

function clearTable() {
	while (table.rows.length > 1) {
		table.deleteRow(1);
	}
}

function handleEdit(event) {
	if (event.target.classList.contains('btnEdit')) {
		const row = event.target.closest('tr');
		const listItem = event.target.closest('li');
		let id;

		if (row) {
			id = parseInt(row.dataset.contactId);
		} else if (listItem) {
			id = parseInt(listItem.dataset.contactId);
		}

		// Find the contact with the matching id
		const contact = contacts.find((contact) => contact.id === id);

		if (contact) {
			// Fill the edit form fields with the contact's data
			document.getElementById('user-name').value = contact.userName;
			document.getElementById('user-email').value = contact.email;
			document.getElementById('phone-number').value = contact.phoneNumber;
			document.getElementById('address').value = contact.address;

			// Show the edit form
			showEditForm(contact);
		}
	}
}

function showEditForm(contact) {
	// Set the contact's ID as a data attribute on the form for future reference
	editUserForm.dataset.contactId = contact.id;

	// Remove the "hidden" class to show the edit form
	editUserFormContainer.classList.remove('hidden');

	// Add event listener to the edit form for handling form submission
	editUserForm.addEventListener('submit', updateContact);
}

function updateContact(event) {
	event.preventDefault(); // Prevent the form from submitting and refreshing the page

	const contactId = parseInt(this.dataset.contactId);

	// Get the form input values
	const userName = document.getElementById('user-name').value;
	const userEmail = document.getElementById('user-email').value;
	const phoneNumber = document.getElementById('phone-number').value;
	const address = document.getElementById('address').value;

	// Find the contact in the array based on the ID
	const contact = contacts.find((contact) => contact.id === contactId);

	if (contact) {
		const temp = {
			id: contact.id,
			userName,
			email: userEmail,
			phoneNumber,
			address,
		};

		// Send PUT request to the API
		fetch(`${api}contacts/${contactId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(temp),
		})
			.then((response) => {
				if (response.ok) {
					// Update the contact's data
					contact.userName = userName;
					contact.email = userEmail;
					contact.phoneNumber = phoneNumber;
					contact.address = address;

					// Update the contact's data in the table
					updateContactInTable(contact);
					updateContactInList(contact);
					console.log('Contact updated successfully');
				} else {
					throw new Error('Failed to update contact');
				}
			})
			.catch((error) => {
				// Handle any errors that occur during the PUT request
				console.error('Error updating contact:', error);
			});

		// Reset the form input values
		this.reset();

		// Hide the edit form
		editUserFormContainer.classList.add('hidden');
	}
}

function updateContactInTable(contact) {
	console.log(contact);
	const row = table.querySelector(`tr[data-contact-id="${contact.id}"]`);

	if (row) {
		row.innerHTML = `
		<td>${contact.userName}</td>
		<td>${contact.email}</td>
		<td>${contact.phoneNumber}</td>
		<td>${contact.address}</td>
		<td><button class="btnEdit">Edit</button></td>
		<td><button class="btnDelete">Delete</button></td>
	  `;
	}
}

function updateContactInList(contact) {
	console.log(contact);
	const item = contactList.querySelector('li[data-contact-id="${contact.id}]');

	if (item) {
		item.innerHTML = `<input type="checkbox" name="expandContact" id="expand-contact" />
		<div class="contact-info">
			<div class="always-shown">
				<div>
					<p class="contact-name__list">${contact.userName}</p>
					<p>${contact.phoneNumber}</p>
				</div>
			</div>
			<div class="expand-shown">
				<div>
					<p>${contact.email}</p>
					<p>${contact.address}</p>
				</div>
				<div>
					<button class="btnEdit">Edit</button>
					<button class="btnDelete">Delete</button>
				</div>
			</div>
		</div>`;
	}
}

function addContactToList(contact) {
	const html = `
	<li class="contact-number" data-contact-id="${contact.id}">
						<input type="checkbox" name="expandContact" id="expand-contact" />
						<div class="contact-info">
							<div class="always-shown">
								<div>
									<p class="contact-name__list">${contact.userName}</p>
									<p>${contact.phoneNumber}</p>
								</div>
							</div>
							<div class="expand-shown">
								<div>
									<p>${contact.email}</p>
									<p>${contact.address}</p>
								</div>
								<div>
									<button class="btnEdit">Edit</button>
									<button class="btnDelete">Delete</button>
								</div>
							</div>
						</div>
					</li>
	`;

	contactList.insertAdjacentHTML('beforeend', html);
}

function clearContactList() {
	contactList.innerHTML = '';
}
