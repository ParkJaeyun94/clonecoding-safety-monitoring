import './index.css'
import { ReactComponent as Light } from '../../assets/images/light.svg';
import { ReactComponent as Wind } from '../../assets/images/wind.svg';
import { ReactComponent as Virus } from '../../assets/images/virus.svg';
import { ReactComponent as Humidity } from '../../assets/images/humidity2.svg';
import { ReactComponent as Bulb } from '../../assets/images/bulb.svg';
import { ReactComponent as Conditioner } from '../../assets/images/condition.svg';
import { useEffect, useState } from 'react';
import Gauge from '../../components/SMGraph/Gauge';
import Point from '../../components/SMGraph/Point';

const LivingRoom = () => {
  const [selectMenu, setSelectMenu] = useState('wind')

  const mainControlMenu = [
    { value: 'light', component: <Light /> },
    { value: 'wind', component: <Wind /> },
    { value: 'virus', component: <Virus /> },
    { value: 'humidity', component: <Humidity /> },
  ]

  const subControlMenu = [
    { value: 'light1', text: 'Light bulb #1', percent: 54, icon: <Bulb />, autoIcon: <Light /> },
    { value: 'light2', text: 'Light bulb #2', percent: 27, icon: <Bulb />, autoIcon: <Light /> },
    { value: 'condition1', text: 'Condition #1', percent: 85, icon: <Conditioner />, autoIcon: <Wind /> },
    { value: 'condition2', text: 'Condition #2', percent: 62, icon: <Conditioner />, autoIcon: <Wind /> },
  ]
  const [subMenu, setSubMenu] = useState(subControlMenu)

  const mainControlMenuHandleClick = (e) => {
    const mainControlMenus = document.querySelectorAll('.main-control-menu')

    mainControlMenus.forEach((item) => {
      if (e.currentTarget === item) {
        item.classList.add('active')
        setSelectMenu(item.value)
      } else item.classList.remove('active');
    })
  }

  const subControlAutoBtnHandleClick = (e) => {
    const updateMenu = subMenu.map(item => {
      if (item.value === e.currentTarget.value) {
        if (item.percent === 100) item.percent = 0
        else item.percent += 10
        if (item.percent > 100) item.percent = 100
      }
      return item;
    })

    setSubMenu(updateMenu)
  }

  return (
    <div className='living-room'>
      <div className='living-room-container'>
        <div className='main-control-area'>
          <div className='main-control-info'>
            <Gauge temperature={28}/>
          </div>
          <div className='main-control-menus'>
            {
              mainControlMenu.map((item, idx) => {
                return (
                  <button className='main-control-menu' onClick={(e)=>{mainControlMenuHandleClick(e)}} key={idx} value={item.value}>{ item.component }</button>
                )
              })
            }
          </div>
        </div>
        <div className='sub-control-area'>
            {
              subMenu.map((item, idx) => {
                return (
                  <div className='sub-controller' key={idx}>
                    <button className='sub-controller-icon'>{item.icon}</button>
                    <div className='sub-controller-info'>
                      <Point title={item.text} percent={item.percent}/>
                    </div>
                    <button className='sub-controller-auto-icon'
                            value={item.value}
                            onClick={(e)=>{subControlAutoBtnHandleClick(e)}}>
                      {item.autoIcon}
                    </button>
                  </div>
                )
              })
            }
        </div>
      </div>
    </div>
  )
}

export default LivingRoom
