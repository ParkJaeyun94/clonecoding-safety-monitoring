import { useEffect } from 'react';
import SMSelect from '../../../components/SMSelect';
import './index.css'
import Line from '../../../components/SMGraph/Line';
import Bar from '../../../components/SMGraph/Bar';

const MiddleWidget = ({bgColor, title='', select='today', id, icon, iconSize=50 }) => {
  const defaultColor = (bgColor) ?bgColor :(id % 2 === 0) ?'#E6F5FB' :'#E7DCF4'
  let widgetMiddle = document.querySelectorAll('.widget-middle')[id]
  const options = ['today', 'week', 'month', 'year']

  const lineData = [
    {
      time: 1,
      value: 24
    },
    {
      time: 2,
      value: 33
    },
    {
      time: 3,
      value: 29
    },
    {
      time: 4,
      value: 46
    },
    {
      time: 5,
      value: 24
    },
    {
      time: 6,
      value: 33
    },
  ]

  const barData = [
    {
      week: 'Sun',
      value: 20
    },
    {
      week: 'Mon',
      value: 50
    },
    {
      week: 'Tue',
      value: 40
    },
    {
      week: 'Wed',
      value: 80
    },
    {
      week: 'Thr',
      value: 60
    },
    {
      week: 'Fri',
      value: 20
    },
    {
      week: 'Sat',
      value: 70
    },
  ]

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
      <div>
        {
          (title === 'Humidity')
            ? <Line data={lineData} />
            : <Bar data={barData} />
        }
      </div>
    </div>
  )
}

export default MiddleWidget
