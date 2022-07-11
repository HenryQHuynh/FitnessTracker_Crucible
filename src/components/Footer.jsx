import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer>
      <p>Hone your skills and win glory in battle against other Guardians</p>
      <h4>A cruddy and cobbled together attempt by a wayward Guardian</h4>
      <a href='https://github.com/HenryQHuynh' target='_blank' rel="noreferrer">
        <img
          src='https://pbs.twimg.com/profile_images/1414990564408262661/r6YemvF9_400x400.jpg'
          alt='GitHub'
        />
      </a>
      <a href='https://www.linkedin.com/in/henryqhuynh/' target='_blank' rel="noreferrer">
        <img
          id='linkedIn'
          src='https://cdn-icons-png.flaticon.com/512/174/174857.png'
          alt='LinkedIn'
        />
      </a>
      <p id='shout' >What do you mean you can't concentrate when I'm yelling!? Relax!</p>
      <h2>-Lord Shaxx</h2>
    </footer>
  );
};

export default Footer;
