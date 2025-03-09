import React from 'react';
import { Link } from 'react-router-dom';
import {

  Typography,

} from "@mui/material";
const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <Typography>
            <Link to="/" style={styles.link}>Home</Link>
          </Typography>
        </li>
        <li style={styles.li}>
          <Typography>
            <Link to="/fabrics" style={styles.link}>Fabrics</Link>
          </Typography>
        </li>
        <Typography>
          <li style={styles.li}>
            <Link to="/notions" style={styles.link}>Notions</Link>

          </li>
        </Typography>
        <li style={styles.li}>
          <Typography> <Link to="/patterns" style={styles.link}>Patterns</Link>
          </Typography>
        </li>
        <li style={styles.li}>
          <Typography> <Link to="/projects" style={styles.link}>Projects</Link></Typography>
        </li>
        <li style={styles.li}>
          <Typography> <Link to="/posts" style={styles.link}>Community</Link> </Typography>
        </li>
      </ul>
    </nav>
  );
};

// Inline styles
const styles = {
  nav: {
    backgroundColor: '#181A18',
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