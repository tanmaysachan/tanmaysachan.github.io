import React from 'react';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';

import { LinkList } from 'components';

import content from './content';

const { links } = content;

const About = () => (
  <>
    <Fade in timeout={1000}>
      <Typography variant='h1' color='textPrimary'>
        About me.
      </Typography>
    </Fade>
    <Typography variant='h3' color='textPrimary'>
      I'm an undergrad research student at IIIT Hyderabad. <br />
      You would generally find me sitting at my desk coding away, or listening to some John Mayer. <br /> <br />
      Feel free to reach out to me.
    </Typography>
    <LinkList links={links} />
  </>
);

export default About;
