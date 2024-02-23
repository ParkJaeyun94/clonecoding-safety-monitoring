import './index.css';

const SMSelect = ({ options }) => {
  const handleSelect = (e) => {
    e.target.parentElement.previousSibling.innerText = e.target.textContent

    if (e.target.parentElement.parentElement.classList.contains('active')) {
      e.target.parentElement.parentElement.classList.remove('active');
    } else {
      e.target.parentElement.parentElement.classList.add('active');
    }
  };


  const handleClick = (e) => {
    if (e.target.parentNode.classList.contains('active')) {
      e.target.parentNode.classList.remove('active');
    } else {
      e.target.parentNode.classList.add('active');
    }
  };


  return (
    <div className='select'>
      <button className='select-label' onClick={(e)=>{handleClick(e)}}>{options[0]}</button>
      <ul className='select-list'>
        {
          options.map((item, idx) => {
            return (
              <li onClick={(e)=>{handleSelect(e)}} className='select-item' key={idx} value={item}>{item}</li>
            );
          })
        }
      </ul>
    </div>

  );
};

export default SMSelect;
