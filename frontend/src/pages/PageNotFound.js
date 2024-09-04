import React from 'react';
import './Styles/Nopage.css'; // Assuming you have a CSS file for styling

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops...The Link You Clicked may be broken or the page may have been removed. We're Sorry</p>
    </div>
  );
}

export default NotFound;
