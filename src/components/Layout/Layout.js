import React, {useState, useEffect} from "react";
import { Layout, Menu } from 'antd';
import { Link, Route, Switch} from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CodepenCircleOutlined,
} from '@ant-design/icons';
import Dashboard from "../Dashboard/Dashboard";
import Categories from "../Categories/Categories";
import Products from "../Products/Products";
import { useSelector, useDispatch } from "react-redux";
import { getLocalData } from "../../redux/actions/action";

const { Header, Sider, Content } = Layout;

const SiderDemo = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dataForSave = useSelector((store) => store.data);
  const dispatch = useDispatch();

  useEffect(() => { 
    localGet();
  }, []);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const localSave = (datSave) => {
        localStorage.setItem("data", JSON.stringify(datSave));
  }

  const localGet = () => {
      if(localStorage.getItem("data") === null) {
          localStorage.setItem("data", JSON.stringify([]));
      } else {
          let dataLocal = JSON.parse(localStorage.getItem("data"));
          dispatch(getLocalData(dataLocal));
      }
  }

   useEffect(() => {
      localSave(dataForSave);
   },[dataForSave]);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo"><h1>Logo</h1></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<CodepenCircleOutlined />}>
            <Link to="/">
               Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<CodepenCircleOutlined />}>
            <Link to="/categries">
              Categories
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<CodepenCircleOutlined />}>
            <Link to="/products">
              Products
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route path="/categries">
              <Categories />
            </Route>
            <Route path="/products">
              <Products />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}     
export default SiderDemo;
