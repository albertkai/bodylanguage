import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

// Layouts
import AppLayout from '../../ui/layouts/AppLayout.jsx';
import MainLayout from '../../ui/layouts/MainLayout.jsx';
import RegistrationLayout from '../../ui/layouts/RegistrationLayout.jsx';

//Pages
import Login from '../../ui/pages/Login.jsx';
import RegistrationStart from '../../ui/pages/RegistrationStart.jsx';
import RegistrationStep1 from '../../ui/pages/RegistrationStep1.jsx';
import RegistrationStep2 from '../../ui/pages/RegistrationStep2.jsx';
import RegistrationConfirm from '../../ui/pages/RegistrationConfirm.jsx';
import RegistrationVerifyEmail from '../../ui/pages/RegistrationVerifyEmail.jsx';
import ListUsers from '../../ui/pages/ListUsers.jsx';
import MyPhotos from '../../ui/pages/MyPhotos.jsx';
import Likes from '../../ui/pages/Likes.jsx';
import Messages from '../../ui/pages/Messages.jsx';
import Settings from '../../ui/pages/Settings.jsx';

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={AppLayout}>
            <IndexRedirect to="/app/list-users" />
            <Route path="login" component={Login}></Route>
            <Route path="verify-email/:token" component={RegistrationVerifyEmail}></Route>
            <Route path="registration" component={RegistrationLayout}>
                <Route path="start" component={RegistrationStart}></Route>
                <Route path="step1" component={RegistrationStep1}></Route>
                <Route path="step2" component={RegistrationStep2}></Route>
                <Route path="confirm" component={RegistrationConfirm}></Route>
            </Route>
            <Route path="app" component={MainLayout}>
                <Route path="list-users" component={ListUsers}></Route>
                <Route path="my-photos" component={MyPhotos}></Route>
                <Route path="likes" component={Likes}></Route>
                <Route path="messages" component={Messages}></Route>
                <Route path="settings" component={Settings}></Route>
            </Route>
        </Route>
    </Router>
);