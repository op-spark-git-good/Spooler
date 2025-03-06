import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <Link to="/" style={styles.link}>Home</Link>
        </li>
        <li style={styles.li}>
          <Link to="/fabrics" style={styles.link}>Fabrics</Link>
        </li>
        <li style={styles.li}>
          <Link to="/notions" style={styles.link}>Notions</Link>
        </li>
        <li style={styles.li}>
          <Link to="/patterns" style={styles.link}>Patterns</Link>
        </li> 
        <li style={styles.li}>
          <Link to="/projects" style={styles.link}>Projects</Link>
        </li>
        <li style={styles.li}>
          <Link to="/posts" style={styles.link}>Community</Link>
        </li>
      </ul>
    </nav>
  );
};

// Inline styles
const styles = {
  nav: {
    backgroundColor: '#333',
    padding: '10px',
  },
  ul: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    margin: 0,
    padding: 0,
  },
  li: {
    margin: '0 10px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
  },
};

export default Navbar;