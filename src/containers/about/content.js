import { FaGithub, FaFacebook, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const content = {
  links: [
    {
      to: 'https://www.facebook.com/tanmaysch',
      text: 'tanmaysch',
      Icon: FaFacebook,
      newTab: true,
    },
    {
      to: 'https://github.com/tanmaysachan',
      text: 'tanmaysachan',
      Icon: FaGithub,
      newTab: true,
    },
    {
      to: 'www.linkedin.com/in/tanmay-sachan-9b4a32166',
      text: 'Tanmay Sachan',
      Icon: FaLinkedin,
      newTab: true,
    },
    {
      to: 'mailto:tanmay.sachan@research.iiit.ac.in',
      text: 'College Mail-ID',
      Icon: FaEnvelope,
      newTab: true,
    }
  ],
};

export default content;
