import React from 'react';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Typewriter from 'typewriter-effect'

const Welcome = () => (
  <>
    <Typography variant='h3' color='textPrimary'>
      Hello! I'm
    </Typography>
    <Fade in timeout={1000}>
      <Typography variant='h1' color='textPrimary'>
        Tanmay
      </Typography>
    </Fade>
    <br />
    <Typography variant='h3' color='textPrimary'>
      I know a little bit of
      <div style={{ "backgroundColor": "#000000", "color":"white" }}>
      <Typewriter
        options={{
          cursor: '_',
          strings: ['Python', 'C++', 'JavaScript', 'Bash', 'Web development', 'NLP', 'Machine Learning', 'Systems Programming'],
          autoStart: true,
          loop: true,
        }}
      />
      </div>
    </Typography>
  </>
);

export default Welcome;
