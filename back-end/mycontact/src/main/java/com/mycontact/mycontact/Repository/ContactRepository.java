package com.mycontact.mycontact.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mycontact.mycontact.Model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Integer>{
}
