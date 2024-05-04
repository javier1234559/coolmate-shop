import { Button, Space, Avatar, Typography, Row } from 'antd';
import { useGetIdentity } from '@refinedev/core';

const { Text } = Typography;
const IconSun = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sun" width={18} height={18} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <circle cx={12} cy={12} r={4} />
    <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
  </svg>
);

const IconMoonStars = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-moon-stars" width={18} height={18} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
    <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
    <path d="M19 11h2m-1 -1v2" />
  </svg>
);

const Header = (props) => {
  const { data: identity } = useGetIdentity();
  const { theme } = props;

  return (
    <Row
      justify="end"
      style={{
        padding: '0 2rem 0 2rem',
        backgroundColor: theme === 'light' ? '#ffffff' : '#1f1f1f',
      }}>
      <Space
        direction="vertical"
        align="end"
        style={{
          padding: '1rem 2rem 1rem 2rem',
        }}>
        <Button
          onClick={() => {
            props.setTheme(props.theme === 'light' ? 'dark' : 'light');
          }}
          icon={props.theme === 'light' ? <IconMoonStars /> : <IconSun />}
        />
      </Space>
      <Space align="center" direction="horizontal">
        <Text>{identity?.name}</Text>
        <Avatar size="large" src={identity?.avatar} />
      </Space>
    </Row>
  );
};

export default Header;
