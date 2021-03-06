import {Component} from 'react';
import * as React from 'react';
import {observer, inject} from 'mobx-react';
import {computed} from 'mobx';

import Contact from '../../interfaces/Contact';

import {AppState} from '../..';
import {ContactListItem} from './ContactListItem';
import {ContactListDivider} from './ContactListDivider';

class Divider {
  public isDivider: boolean = true;
  public id: string;
  constructor (public charchtar: string) {
    this.id = Math.random().toString(36);
  }
}

@inject('appState')
@observer
export class ContactList extends Component<{appState?: AppState}, {}> {

  get contactsAndDividers(): Array<Contact | Divider> {
    const contacts = this.props.appState.filteredContacts;
    const result: Array<Contact | Divider> = [];

    if (!contacts.length) return [];

    result.push(new Divider(contacts[0].firstName.charAt(0)));

    for (let i = 0; i < contacts.length; i++) {
      const element = contacts[i];
      const nextElement = contacts[i+1];

      result.push(element);

      if (nextElement && (nextElement.firstName.charAt(0) !== element.firstName.charAt(0))) {
        result.push(new Divider(nextElement.firstName.charAt(0)));
      }
    }

    return result;
  }

  render() {
    return (
      <div className="list">
        <ul>
          {this.contactsAndDividers.map(item => {
            if (item instanceof Divider) {
              return <ContactListDivider key={item.id.toString()} charchtar={item.charchtar} />
            }
            const contact = item as Contact;
            return <ContactListItem
                      key={contact.id.toString()}
                      contact={contact}
                      isSelected={this.props.appState.selectedContact === contact} />
          })}
        </ul>
      </div>
    );
  }
}