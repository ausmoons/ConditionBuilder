import React from 'react';
import { render } from 'react-dom'
import GetAll from './GetAll';
import ConditionBuilder from './ConditionBuilder'
import { Router,  navigate, useLocation, LocationProvider } from "@reach/router"
import { Layout, Menu} from "antd";
const { Header } = Layout;



const App = () => {
const location = useLocation();
console.log(location.pathname)
return(
 
    <Layout>
        <Header className="header" >
        <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
        defaultSelectedKeys={[location.pathname]}
        selectedKeys={[location.pathname]}
      >
        <Menu.Item key="/" onClick={() => navigate('/')}> 
           All subjects
         </Menu.Item>
        <Menu.Item key="/ConditionBuilder"  onClick={() => navigate('/ConditionBuilder')}>  
           Condition builder
            </Menu.Item>
      </Menu>
        </Header >
        <Router>
            <All path="/"></All>
            <Make path="/ConditionBuilder" />
        </Router>
    </Layout >
)
};


const All = () => (
    <GetAll />
);

const Make = () => (
    <ConditionBuilder />
);


render(<LocationProvider><App /></LocationProvider>, document.getElementById("root"));






