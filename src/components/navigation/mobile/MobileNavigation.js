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
              <span>{link.text}</span>
            </Link>
          </div>
        ))}
      </div>
    )}
  </>
);

export default withStyles(styles)(MobileNavigation);
