import React from 'react';
import Link from 'gatsby-link';
import { withStyles } from '@material-ui/styles';

import styles from './style';
import { FaFileDownload } from 'react-icons/fa';

import resume from 'images/Resume.pdf'

type Props = {
  classes: Object,
  options: [],
};

const MainNavigation = ({ classes, options }: Props) => (
  <ul>
    {options.map((link, i) => (
      <li className={classes.menuContainer} key={i}>
        <Link
          to={link.to}
          className={classes.navLink}
          activeClassName={classes.navLinkActive}
          exact={'true'}>
          <span>{link.text}</span>
        </Link>
      </li>
    ))}
    {/*hardcoded values change it in main and mobile for key!!!!!!!!!!*/}
    <li className={classes.menuContainer} key={3}>
      <a
        href={resume}
        className={classes.navLink}
        // activeClassName={classes.navLinkActive}
        // exact={'true'}
        target="_blank"
        download>
        <span>Resume<FaFileDownload /></span>
      </a>
    </li>
  </ul>
);

export default withStyles(styles)(MainNavigation);
