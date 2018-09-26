import React from 'react';
import requireAuth from '../requireAuth';

const AccountPage = () => (
  <div className="account-page">
    Wow, how did you access this page???
  </div>
);

export default requireAuth(AccountPage);
