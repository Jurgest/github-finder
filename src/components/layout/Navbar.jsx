import React from 'react';
import {FaGithub } from 'react-icons/fa';
import {Link} from 'react-router-dom';


const Navbar = ({title}) => {
  return <nav className='navbar mb-12 shadow-lg bg-neutral text-neutral-content'> 
    Navbar
  </nav>
};

Navbar.defaultProps = {
    title: 'Github Finder',
}


export default Navbar;
