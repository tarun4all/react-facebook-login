import React, { Component } from 'react';
import { Button, Avatar, Input, Row, Col, Card, Drawer, Menu, Icon, Select, Radio } from "antd";
import './App.css';
import 'antd/dist/antd.css';
import $ from 'jquery'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import Notification  from 'react-web-notification';
import FacebookLogin from 'react-facebook-login';


const listOfData = [1,2,3,4,5];
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      ignore: false,
      title: '',
      current: 'mail',
      visible: false,
      login: false
    };
  }
  showDrawer = () => {
    this.setState({
      visible: !this.state.visible,
    });
    console.log(this.state);
  };

  logout = () => {
    window.FB.logout();
    this.setState({
      login: false
    });
  }

  responseFacebook = (response) => {
    this.setState({
      login: true,
      url:response.picture.data.url,
      name:response.name
    });

    var token = '214999961.4d75f6b.9b80811d53a9428ca0c767571c58933e';
    var hashtag='wordcamprussia2015';
    var num_photos = 4;
 
    $.ajax({
      url: 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent',
      dataType: 'jsonp',
      type: 'GET',
      data: {access_token: token, count: num_photos}, // actually it is just the search by username
      success: function(data){
        console.log(data);
      },
      error: function(data){
        console.log(data);
      }
    });

  }
  
  responsive = {
    0: { items: 2 },
    600: { items: 3 },
    1024: { items: 5 },
  };

  handleClick = (e) => {
    console.log(this.state);
    this.setState({
      current: e.key,
    });
    this.showDrawer();
  }

  onSlideChange(e) {
    
  };
 
  onSlideChanged(e) {
  };
  
  galleryItems() {
    return (
      [1, 2, 3, 4, 5, 12, 13, 14, 15].map((item, i) => (
        <div key={`key-${i}`} className="yours-custom-class">
        <Card
          size="small"
          title="Small size card"
          extra={<a href="#">More</a>}
          style={{ width: 250}}
        >
        <h2>{item}</h2>
        </Card></div>
      ))
    )
  };

  render() {
    const items = this.galleryItems();
    return (
      <div>
        <Menu
        theme="dark" 
        onClick={this.showDrawer}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        >
        <Menu.Item key="mail">
          <Icon type="mail"/>My Profile
        </Menu.Item>
       
      </Menu>

      <Drawer
          title="User Profile"
          placement="left"
          closable={false}
          onClose={this.showDrawer}
          visible={this.state.visible}
        >
         {this.state.login ? <div> <Avatar size={64} src={this.state.url} /> <p>Welcome {this.state.name}</p> 
            <Button onClick={this.logout}>logout</Button> </div>: 
            <FacebookLogin
              appId="572409363238665"
              autoLoad={true}
              fields="name,email,picture"
              callback={this.responseFacebook} />
         }
        </Drawer>

      <div style = {{'padding' : '20px'}}>
       {this.state.login ? <AliceCarousel
        items={items}
        duration={100}
        autoPlay={true}
        startIndex = {1}
        fadeOutAnimation={true}
        mouseDragEnabled={true}
        autoPlayInterval={1000}
        autoPlayDirection="rtl"
        responsive={this.responsive}
        disableAutoPlayOnAction={true}
        onSlideChange={this.onSlideChange}
        onSlideChanged={this.onSlideChanged}
      /> : <center><p>You need to <a href="#" onClick={this.showDrawer}>login</a> first</p></center>}
      </div> 
      </div>

    );
  }
}

export default App;
