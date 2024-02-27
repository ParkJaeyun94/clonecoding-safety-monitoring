import Footer from './Footer';
import './index.css'
import { useEffect, useState } from 'react';
import { ReactComponent as Humidity } from '../assets/images/humidity.svg';
import { ReactComponent as Energy } from '../assets/images/energy.svg';
import { ReactComponent as Wifi } from '../assets/images/wifi.svg';
import { ReactComponent as Tv } from '../assets/images/tv.svg';
import { ReactComponent as Music } from '../assets/images/music.svg';
import { ReactComponent as Sockets } from '../assets/images/sockets.svg';
import { ReactComponent as Edit } from '../assets/images/edit.svg';
import WeatherWidget from './components/WeatherWidget';
import SmallWidget from './components/SmallWidget';
import MiddleWidget from './components/MiddleWidget';

const Layout = (props) => {
  const [ room, setRoom ] = useState('living')

  const roomList = [
    { name: 'Living Room', value: 'living' },
    { name: 'Dining Room', value: 'dining' },
    { name: 'Bed Room', value: 'bed' },
    { name: 'Bath Room', value: 'bath' },
    { name: 'Backyard', value: 'backyard' }
  ]

  const mainBtnHandleClick = (e) => {
    const roomBtns = document.querySelectorAll('.room-btn')

    roomBtns.forEach((item) => {
      if (e.currentTarget === item) {
        item.classList.add('active')
        setRoom(item.value)
      } else item.classList.remove('active');
    })
  }

  return (
    <div className='app-container'>
      <main>
        <div className='main-widget'>
          <div className='main-widget-header'>
            {
              roomList.map((item, idx) => {
                return (
                  <button onClick={(e)=>{mainBtnHandleClick(e)}}
                          className={`main-widget-btn room-btn ${(room === item.value) ?'active' :''} `}
                          key={idx} value={item.value}>
                    { item.name }
                  </button>
                )
              })
            }
            <button className='main-widget-btn add-btn'>+ Add</button>
          </div>
          <div className='main-widget-body'>
            {props.children}
          </div>
        </div>
        <div className='weather-widget-cover'>
          <WeatherWidget />
        </div>
        <div className='widgets'>
          <div className='widgets-header'>
            <div className='widgets-title'>Widgets</div>
            <div className='widgets-edit'>Edit
              <Edit />
            </div>
          </div>

          <div className='widgets-contents'>
            <MiddleWidget title='Humidity' id={0} icon={<Humidity />} />
            <MiddleWidget title='Energy' id={1} icon={<Energy />} />
            <SmallWidget title='Wi-fi' id={0} icon={<Wifi />} />
            <SmallWidget title='TV' id={1} icon={<Tv />} />
            <SmallWidget title='Music' id={2} icon={<Music />} />
            <SmallWidget title='Sockets' id={3} icon={<Sockets />} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Layout
