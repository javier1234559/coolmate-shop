import { CircleNotch } from 'phosphor-react';
import './Skeleton.css';

function Skeleton() {
  return (
    <div className="skeleton-container">
      <CircleNotch size={32} className="spinner-gap" color="#ffff" />
    </div>
  );
}

export default Skeleton;
