import { Component } from 'react';

import { CONTACTS } from '../constants/common';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { ContactForm } from './ContactForm';

export class App extends Component {
  state = {
    contacts: CONTACTS,
    filter: '',
  };

  deleteContact = id => {
    this.setState(prev => ({
      ...prev,
      contacts: prev.contacts.filter(item => item.id !== id),
    }));
  };

  changeFilter = value => {
    this.setState(prev => ({
      ...prev,
      filter: value,
    }));
  };

  filterContacts = (filter, contacts) => {
    return contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  addNewContact = contact => {
    this.setState(prev => ({
      ...prev,
      contacts: [...prev.contacts, contact],
    }));
  };

  checkContact = name => {
    return this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  render() {
    return (
      <div className="App">
        <h1>Phonebook</h1>

        <ContactForm
          onSubmit={this.addNewContact}
          checkContact={this.checkContact}
        />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <ContactList
          list={this.filterContacts(this.state.filter, this.state.contacts)}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
