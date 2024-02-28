import './Footer.scss';
import { Link } from 'react-router-dom';
// import Logo from '../../assets/imgMaster/logo.svg';
// import twitterIcon from '../../assets/imgMaster/twitter.png';
// import youtubeicon from '../../assets/imgMaster/youtube-play--v2.png';
// import facebookIcon from '../../assets/imgMaster/facebook-footer.png';
// import instagramIcon from '../../assets/imgMaster/instagram-new.png';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__contact grid wide">
                <div className="footer__contact-name">
                    <h3 className="footer__contact-heading">{'footer.titleFooter'}</h3>
                    <span className="footer__contact-text">{'footer.contentFooter'}</span>
                </div>
                <form action="" className="footer__contact-form">
                    <input type="text" name="" id="" className="footer__contact__input" />
                    <label htmlFor="footer__contact-submit" className="footer__contact-submit-btn">
                        {'common.signup'}
                    </label>
                </form>
            </div>
            <div className="footer__inner">
                <div className="grid wide">
                    <div className="row">
                        <div className="col l-6 m-12 c-12">
                            {/* <img src={Logo} alt="" className="footer__logo" />
                            <p className="footer__desc">{'footer.intro'}</p>
                            <div className="footer__inner-contact">
                                <Link to="#" className="footer__contact-logo fab fa-twitter">
                                    <img src={twitterIcon} alt="alt-t" />
                                </Link>
                                <Link to="#" className="footer__contact-logo fab fa-youtube">
                                    <img src={youtubeicon} alt="alt-y" />
                                </Link>
                                <Link to="#" className="footer__contact-logo fab fa-facebook-square">
                                    <img src={facebookIcon} alt="alt-f" />
                                </Link>
                                <Link to="#" className="footer__contact-logo fab fa-instagram-square">
                                    <img src={instagramIcon} alt="alt-i" />
                                </Link>
                            </div> */}
                        </div>
                        <div className="col l-2 m-4 c-12">
                            <ul className="footer__list">
                                <h3 className="footer__list-heading">{'footer.contact_1'}</h3>
                                <li className="footer__item">
                                    <i className="footer__item-icon fas fa-chevron-right"></i>
                                    <Link to="/" className="footer__item-link">
                                        {'footer.contact_link_1'}
                                    </Link>
                                </li>
                                <li className="footer__item">
                                    <i className="footer__item-icon fas fa-chevron-right"></i>
                                    <Link to="#" className="footer__item-link">
                                        {'footer.contact_link_2'}
                                    </Link>
                                </li>
                                <li className="footer__item">
                                    <i className="footer__item-icon fas fa-chevron-right"></i>
                                    <Link to="#" className="footer__item-link">
                                        {'footer.contact_link_3'}
                                    </Link>
                                </li>
                                <li className="footer__item">
                                    <i className="footer__item-icon fas fa-chevron-right"></i>
                                    <Link to="#" className="footer__item-link">
                                        {'footer.contact_link_4'}
                                    </Link>
                                </li>
                                <li className="footer__item">
                                    <i className="footer__item-icon fas fa-chevron-right"></i>
                                    <Link to="#" className="footer__item-link">
                                        {'footer.contact_link_5'}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col l-2 m-4 c-12">
                            <ul className="footer__list">
                                <h3 className="footer__list-heading">{'footer.contact_2'}</h3>
                                <li className="footer__item">
                                    <i className="footer__item-icon fas fa-chevron-right"></i>
                                    <Link to="#" className="footer__item-link">
                                        {'footer.contact_link_6'}
                                    </Link>
                                </li>
                                <li className="footer__item">
                                    <i className="footer__item-icon fas fa-chevron-right"></i>
                                    <Link to="#" className="footer__item-link">
                                        {'footer.contact_link_7'}
                                    </Link>
                                </li>
                                <li className="footer__item">
                                    <i className="footer__item-icon fas fa-chevron-right"></i>
                                    <Link to="#" className="footer__item-link">
                                        {'footer.contact_link_8'}
                                    </Link>
                                </li>
                                <li className="footer__item">
                                    <i className="footer__item-icon fas fa-chevron-right"></i>
                                    <Link to="#" className="footer__item-link">
                                        {'footer.contact_link_9'}
                                    </Link>
                                </li>
                                <li className="footer__item">
                                    <i className="footer__item-icon fas fa-chevron-right"></i>
                                    <Link to="#" className="footer__item-link">
                                        {'footer.contact_link_10'}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col l-2 m-4 c-12">
                            <ul className="footer__list">
                                <h3 className="footer__list-heading">{'footer.contact_3'}</h3>
                                <li className="footer__item">
                                    <i className="footer__item-icon fas fa-chevron-right"></i>
                                    <Link to="#" className="footer__item-link">
                                        {'footer.contact_link_11'}
                                    </Link>
                                </li>
                                <li className="footer__item">
                                    <i className="footer__item-icon fas fa-chevron-right"></i>
                                    <Link to="#" className="footer__item-link">
                                        {'footer.contact_link_12'}
                                    </Link>
                                </li>
                                <li className="footer__item">
                                    <i className="footer__item-icon fas fa-chevron-right"></i>
                                    <Link to="#" className="footer__item-link">
                                        {'footer.contact_link_13'}
                                    </Link>
                                </li>
                                <li className="footer__item">
                                    <i className="footer__item-icon fas fa-chevron-right"></i>
                                    <Link to="#" className="footer__item-link">
                                        {'footer.contact_link_14'}
                                    </Link>
                                </li>
                                <li className="footer__item">
                                    <i className="footer__item-icon fas fa-chevron-right"></i>
                                    <Link to="#" className="footer__item-link">
                                        {'footer.contact_link_15'}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;