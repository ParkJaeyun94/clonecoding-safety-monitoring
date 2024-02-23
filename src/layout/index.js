import Footer from './Footer';
import './index.css'
import SMSwitch from '../components/SMSwitch';
import { useEffect, useState } from 'react';
import { ReactComponent as Humidity } from '../assets/images/humidity.svg';
import { ReactComponent as Energy } from '../assets/images/energy.svg';
import { ReactComponent as Wifi } from '../assets/images/wifi.svg';
import { ReactComponent as Tv } from '../assets/images/tv.svg';
import { ReactComponent as Music } from '../assets/images/music.svg';
import { ReactComponent as Sockets } from '../assets/images/sockets.svg';
import { ReactComponent as Edit } from '../assets/images/edit.svg';
import { ReactComponent as Moon } from '../assets/images/moon.svg';
import { ReactComponent as Sun } from '../assets/images/sun.svg';
import SMSelect from '../components/SMSelect';
import moon from '../assets/images/moon.png'

const Layout = (props) => {

  const WeatherWidget = () => {
    const handleClick = (e) => {
      e.target.classList.add('active');
      (e.target.nextSibling) ?e.target.nextSibling.classList.remove('active') :e.target.previousSibling.classList.remove('active')

    }
    return (
      <div className='weather-widget'>
        <div className='weather-widget-header'>
          <div className='weather-widget-icon'><Moon /></div>
          <div className='weather-widget-text'>
            <div className='weather-widget-title'>Weather outside</div>
            <div className='weather-widget-location'>Kjws</div>
          </div>
        </div>
        <div className='weather-widget-body'>
          <div className='weather-widget-period'>
            <button className='active' onClick={(e)=>{handleClick(e)}}>Day</button>
            <button onClick={(e)=>{handleClick(e)}}>Week</button>
          </div>
          <div className='weather-widget-info'>
            <div className='weather-widget-info-text'>
              <div className='date'>Thr, Jun 30</div>
              <div className='temperature'>26 ℃</div>
              <div className='weather'>cloudless</div>
            </div>
            <div className='weather-widget-info-img'><img src={moon} /></div>
          </div>
        </div>
        <div className='weather-widget-footer'>
          The weather promise to be great, <strong>have a good  night</strong>
        </div>
      </div>
    )
  }

  const MiddleWidget = ({bgColor, title='', select='today', id, icon, iconSize=50 }) => {
    const defaultColor = (bgColor) ?bgColor :(id % 2 === 0) ?'#E6F5FB' :'#E7DCF4'
    let widgetMiddle = document.querySelectorAll('.widget-middle')[id]
    const options = ['today', 'week', 'month', 'year']

    useEffect(()=>{
      widgetMiddle = document.querySelectorAll('.widget-middle')[id]

      widgetMiddle.style.setProperty('--default-color', defaultColor);

    }, [])

    return (
      <div className='widget-middle'>
        <div className='widget-middle-header'>
          <div className='widget-middle-icon' style={{ width: iconSize, height: iconSize }}>{icon}</div>
          <div className='widget-middle-title'>{title}</div>
          <div className='widget-middle-select'>
            <SMSelect options={options} />
          </div>
        </div>
        <div className='widget-middle-body'>
          graph
        </div>
      </div>
    )
  }

  const SmallWidget = ({title='', icon, id, iconSize=30}) => {
    let result = '';
    const defaultColor = (id % 3 === 0) ?'#B9C9CF' :'#E7DCF4'
    const [ value, setValue ] = useState('off')
    let widgetSwitch = document.querySelectorAll('.widget-small-switch')[id]
    let stateText = document.querySelectorAll('.widget-small-switch-state')[id]

    useEffect(()=>{
      widgetSwitch = document.querySelectorAll('.widget-small-switch')[id]
      stateText = document.querySelectorAll('.widget-small-switch-state')[id]
      stateText.style.color = (value === 'off') ?'#8a8a8a' :'#ffffff'

      const toggle = widgetSwitch.querySelector('.toggle')
      const widgetSmall = document.querySelectorAll('.widget-small')[id]
      toggle.style.setProperty('--default-color', defaultColor);
      widgetSmall.style.setProperty('--default-color', defaultColor);

    }, [])


    const getValue = (e) => {
      if (e.target.checked)  {
        result = e.target.value;
        stateText.style.color = '#ffffff'
      } else {
        result = 'off';
        stateText.style.color = '#8a8a8a'
      }

      setValue(result)
    }
    return (
      <div className='widget-small'>
        <div className='widget-small-header'>
          <div className='widget-small-icon' style={{ width: iconSize, height: iconSize }}>{icon}</div>
          <div className='widget-small-title'>
            {title}
          </div>
        </div>
        <div className='widget-small-switch'>
          <div className='widget-small-switch-state'>{value}</div>
          <div className='widget-small-switch-btn'>
            <SMSwitch id={'switch-'+id} onClick={(e) => getValue(e)} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='app-container'>
      <main>
        <div className='main-widget'>{props.children}</div>
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
