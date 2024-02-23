import './index.css';

const SMSwitch = ({id, onClick}) => {
  return (
    <>
      <input type="checkbox" id={id}
             className="checkbox"
             onClick={onClick}
      />
      <label htmlFor={id} className="toggle"/>
    </>
  );
};

export default SMSwitch;
