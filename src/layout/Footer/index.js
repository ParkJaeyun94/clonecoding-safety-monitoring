import './index.css';
import { ReactComponent as Home } from '../../assets/images/home.svg';
import { ReactComponent as Widget } from '../../assets/images/widget.svg';
import { ReactComponent as Electricity } from '../../assets/images/electricity.svg';
import { ReactComponent as Player } from '../../assets/images/player.svg';
import { ReactComponent as Bills } from '../../assets/images/bills.svg';
import { ReactComponent as Profile } from '../../assets/images/profile.svg';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import avatar from '../../assets/images/avatar.jpg';
import { useState } from 'react';

const Footer = () => {
  const [ select, setSelect ] = useState('home')


  const handleClick = (e) => {
    const menuBtns = document.querySelectorAll('.footer-icon')

    menuBtns.forEach((item) => {
      if (e.currentTarget === item) {
        item.classList.add('active')
        setSelect(item.value)
      } else item.classList.remove('active');
    })
  }

  const menus = [
    { name: 'home', value: 'home', component: <Home /> },
    { name: 'widget', value: 'widget', component: <Widget /> },
    { name: 'electricity', value: 'electricity', component: <Electricity /> },
    { name: 'player', value: 'player', component: <Player /> },
    { name: 'bills', value: 'bills', component: <Bills /> },
    { name: 'profile', value: 'profile', component: <Profile /> },
  ]

  return (
    <footer>
      <div className='footer-container'>
        <div className='footer-logo'><Logo /> </div>
        <div className='footer-icon-group'>
          {
            menus.map((item, idx) => {
              return (
                <button onClick={(e)=>{handleClick(e)}}
                        key={idx}
                        className={`footer-icon ${(select === item.value) ?'active' :''}`}
                        value={item.value}>{ item.component } { item.name }</button>
              )
            })
          }

        </div>
        <div className='footer-avatar'><img src={avatar} /></div>
      </div>
    </footer>
  );
};

export default Footer;
