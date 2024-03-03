import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer mobile--hidden">
      <div className="container">
        <div className="site-footer__inner">
          <div className="site-footer__sidebar">
            <div>
              <h4 className="site-footer__title">COOLMATE lắng nghe bạn!</h4>
              <p className="site-footer__description" style={{ marginBottom: '30px' }}>
                Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến đóng góp từ khách hàng để có thể nâng cấp trải nghiệm dịch vụ và sản phẩm tốt hơn nữa.
              </p>
            </div>
            <div style={{ width: '25%' }}>
              <div className="footer-social">
                <a href="https://www.facebook.com/coolmate.me" className="footer-social__item" target="_blank" rel="noreferrer">
                  <img src="https://mcdn.coolmate.me/image/June2023/mceclip1_43.png" alt="Footer Icon facebook" />
                </a>
                <a href="https://zalo.me/1517736583279228381" target="_blank" className="footer-social__item" rel="noreferrer">
                  <img src="https://mcdn.coolmate.me/image/June2023/mceclip2_68.png" alt="Footer Icon Zalo" />
                </a>
                <a href="https://www.tiktok.com/@cool.coolmate" target="_blank" className="footer-social__item" rel="noreferrer">
                  <img src="https://mcdn.coolmate.me/image/June2023/mceclip0_62.png" alt="Footer Icon tiktok" />
                </a>
                <a href="https://www.instagram.com/coolmate.me/" className="footer-social__item" target="_blank" rel="noreferrer">
                  <img src="https://www.coolmate.me/images/footer/icon-instar.svg" alt="Footer Icon instar" />
                </a>
                <a href="https://www.youtube.com/channel/UCWw8wLlodKBtEvVt1tTAsMA" className="footer-social__item" target="_blank" rel="noreferrer">
                  <img src="https://www.coolmate.me/images/footer/icon-youtube.svg" alt="Footer Icon youtube" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
