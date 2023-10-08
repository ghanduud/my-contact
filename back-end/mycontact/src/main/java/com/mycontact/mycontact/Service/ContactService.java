package com.mycontact.mycontact.Service;

import java.util.List;

import com.mycontact.mycontact.Model.Contact;

public interface ContactService {
    List<Contact> getAllContacts();

    Contact getContactById(int id);

    Contact save(Contact contact);

    void removeContact(int id);
}
