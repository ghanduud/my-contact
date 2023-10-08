package com.mycontact.mycontact.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mycontact.mycontact.Model.Contact;
import com.mycontact.mycontact.Service.ContactService;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1")
public class ContactController {
    ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping("/contacts")
    public List<Contact> getContacts() {
        return contactService.getAllContacts();
    }

    @GetMapping("/contacts/{id}")
    public Contact getContactById(@PathVariable int id) {
        Contact contact = contactService.getContactById(id);
        return contact;
    }

    @PostMapping("/contacts")
    public Contact addContact(@RequestBody Contact contact) {
        contact.setId(0);
        Contact thisContact = contactService.save(contact);
        return contactService.save(thisContact);
    }

    @PutMapping("/contacts")
    public Contact updateContact(@RequestBody Contact contact) {
        Contact theContact = contactService.save(contact);
        return theContact;
    }

    @DeleteMapping("/contacts/{id}")
    public String deleteContact(@PathVariable int id) {
        contactService.removeContact(id);
        return "Deleted Contact with id : " + id;
    }
}
