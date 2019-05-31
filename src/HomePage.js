import React from 'react';

import  { userService }          from './_services/user.service';
import { authenticationService } from './_services/authenticationService';


class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null
        };
    }

    componentDidMount() {
        console.log('HomePage.js: within componentDidMount......display users'); 
       
        userService.getAll().then(users => this.setState({ users:users.result }));
        console.log(this.state.users); 

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
            </div>
        );
    }
}

export default HomePage