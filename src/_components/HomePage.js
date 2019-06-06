import React from 'react';

import  { userService }          from '../_services/user.service';
import { authenticationService } from '../_services/authenticationService';

import Calendar from 'react-calendar'


class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null,
            date: new Date()
        };
    }

    componentDidMount() {
        console.log('HomePage.js: within componentDidMount......display users'); 
       
        userService.getAll().then(users => this.setState({ users:users }));
        console.log(this.state.users); 

    }

    onChange = (date) => {
         this.setState({ date });
         console.log(date);
        //  alert('New date is: '+date);

    }

    render() {
        const { currentUser, users } = this.state;
        return (
            <div>
                <h1>Hi {currentUser.firstName}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                {users &&
                    <ul>
                        {users.map(user =>
                            <li key={user.id}>{user.firstName} {user.lastName}</li>
                        )}
                    </ul>
                }
                <div>
                    <Calendar
                        onChange={this.onChange}
                        value={this.state.date}
                    />
                </div>
            </div>
        );
    }
}

export default HomePage