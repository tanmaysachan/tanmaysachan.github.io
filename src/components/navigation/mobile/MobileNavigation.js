import React from 'react';
import Link from 'gatsby-link';
import { withStyles } from '@material-ui/styles';
import { FaBars, FaFileDownload } from 'react-icons/fa';

import styles from './style';

import resume from 'images/Resume.pdf';

type Props = {
  classes: Object,
  options: [],
  open: Boolean,
  onClick: () => void,
};

const MobileNavigation = ({ classes, options, onClick, open }: Props) => (
  <>
    <FaBars className={classes.menuIcon} onClick={onClick} />
    {open && (
      <div className={classes.menuContainer}>
        {options.map((link, i) => (
          <div key={i}>
            <Link
              to={link.to}
              className={classes.navLink}
              activeClassName={classes.navLinkActive}
              exact={'true'}>
              <span>{link.text}{link.text === 'Resume' ? <FaFileDownload /> : "" }</span>
            </Link>
          </div>
        ))}
        {/*hardcoded values change it in main and mobile for key!!!!!!!!!!*/}
        <li className={classes.menuContainer} key={3}>
          <a
            href={resume}
            className={classes.navLink}
            target="_blank"
            download>
            <span>Resume<FaFileDownload /></span>
          </a>
        </li>
      </div>
    )}
  </>
);

export default withStyles(styles)(MobileNavigation);
