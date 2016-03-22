import * as React from 'react';
import {Component} from 'react';
import {observer} from 'mobx-react';
import {browserHistory} from 'react-router';

import {Empty} from '../Empty';
import Contact from '../../interfaces/Contact';
import {ProfilePicture} from '../ProfilePicture';
import {AppState, appState} from '../..';

class TableRow extends Component<{label: string; value: string}, {}> {
  render() {
    if (!this.props.value) {
      return <tr></tr>;
    }
    return <tr>
             <td>{this.props.label}</td>
             <td>{this.props.value}</td>
           </tr>
  }
}

@observer
export class ContactDetails extends Component<{contact: Contact}, {}> {

  formatPhoneNumber(raw: string): string {
    return `(${raw.substr(0, 3)}) ${raw.substr(3,3)}-${raw.substr(6)}`;
  }

  edit() {
    browserHistory.push(this.props.contact.id + '/edit');
  }

  navigateToNew() {
    appState.setSelectedContactId(null);

    browserHistory.push('/new');
  }

  render() {
    const contact = this.props.contact;

    if (!contact) {
      return <Empty params={null} />
    }

    return (
      <div className="details">
        <header>
          <ProfilePicture contact={contact} />
          <div className="title">
            <h1 className="name">{contact.firstName}&nbsp;{contact.lastName}</h1>
          </div>
        </header>
        <table>
          <tbody>
            <TableRow label="email" value={contact.email} />
            <TableRow label="phone" value={this.formatPhoneNumber(contact.phoneNumber)} />
            <TableRow label="address" value={contact.address} />
          </tbody>
        </table>
        <footer>
          <div className="left">
            <button onClick={this.navigateToNew.bind(this)}>+</button>
          </div>
          <div className="right">
            <button>Delete</button>
            <button onClick={this.edit.bind(this)}>Edit</button>
          </div>
        </footer>
      </div>
    )
  }
}