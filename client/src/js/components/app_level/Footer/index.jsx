import React from 'react';
import constants from '../constants.jsx';
import './footer.css';

const Footer = () => {
  return (
    <div className="app_footer">
      <div className="footer_content_wrapper">
        <div className="activity_year">{constants.appCreationYear}</div>

        <a className="repository_link"
           href={constants.footer.repoLink}
           target='_blank'
           rel='noopener noreferrer'
        >
          <i className="fa fa-github"
             title={constants.footer.repoLinkTitle} />
        </a>

        <div className='app_version'>
          {constants.footer.versionMessage}
        </div>
      </div>
    </div>
  );
};

export default Footer;
