package com.mycontact.mycontact.Service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mycontact.mycontact.Model.Contact;
import com.mycontact.mycontact.Repository.ContactRepository;
import com.mycontact.mycontact.Service.ContactService;

@Service
public class ContactServiceImpl implements ContactService {

    ContactRepository contactRepository;
    
    public ContactServiceImpl(ContactRepository contactRepository)
    {
        this.contactRepository = contactRepository;
    }

    @Override
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    @Override
    public Contact getContactById(int id) {
        Optional<Contact> result = contactRepository.findById(id);

        Contact contact = null;

        if(result.isPresent())
        {
            contact = result.get();
        }
        else {
            throw new RuntimeException("Could not find contact with id : " + id);
        }

        return contact;
    }

    @Override
    public Contact save(Contact contact) {
        return contactRepository.save(contact);
    }

    @Override
    public void removeContact(int id) {
        contactRepository.deleteById(id);
    }
    
}
