import { useEffect, useState } from 'react';
import SMSwitch from '../../../components/SMSwitch';
import './index.css'

const SmallWidget = ({ title='', icon, id, iconSize=30 }) => {
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

export default SmallWidget
