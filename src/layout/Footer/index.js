import './index.css';
import { ReactComponent as Home } from '../../assets/images/home.svg';
import { ReactComponent as Widget } from '../../assets/images/widget.svg';
import { ReactComponent as Electricity } from '../../assets/images/electricity.svg';
import { ReactComponent as Player } from '../../assets/images/player.svg';
import { ReactComponent as Bills } from '../../assets/images/bills.svg';
import { ReactComponent as Profile } from '../../assets/images/profile.svg';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import avatar from '../../assets/images/avatar.jpg';

const Footer = () => {

  return (
    <footer>
      <div className='footer-container'>
        <div className='footer-logo'><Logo /> </div>
        <div className='footer-icon-group'>
          <div className='footer-icon'><Home /> home</div>
          <div className='footer-icon'><Widget /> widget</div>
          <div className='footer-icon'><Electricity /> electricity</div>
          <div className='footer-icon'><Player /> player</div>
          <div className='footer-icon'><Bills /> bills</div>
          <div className='footer-icon'><Profile /> profile</div>
        </div>
        <div className='footer-avatar'><img src={avatar} /></div>
      </div>
    </footer>
  );
};

export default Footer;
