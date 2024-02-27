import './index.css'
import moon from '../../../assets/images/moon.png';
import { ReactComponent as Moon } from '../../../assets/images/moon.svg';
import { ReactComponent as Sun } from '../../../assets/images/sun.svg';

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

export default WeatherWidget
