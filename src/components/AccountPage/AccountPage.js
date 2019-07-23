import React from 'react';

// Components
import Header from '../Header';

// HOC that redirects user away from page if not authenticated
import requireAuth from '../requireAuth';

const AccountPage = () => (
  <div className="account-page">
    Wow, how did you access this page???
  </div>
);

const AccountPageWithHeader = Header(AccountPage);

export default requireAuth(AccountPageWithHeader);
