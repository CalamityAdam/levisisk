import { Layout } from 'antd';

const { Header, Footer, Content} = Layout;

const Layout = ({ ...children }) => {
  <Layout>
    <Header>Header</Header>
    <Content>Content</Content>
    <Footer>Footer</Footer>
  </Layout>
}

export default Layout;
