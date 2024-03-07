import { SpinnerGap } from 'phosphor-react';
import './Skeleton.css';

function Skeleton() {
  return (
    <div className="skeleton-container">
      <SpinnerGap size={32} className="spinner-gap" />
    </div>
  );
}

export default Skeleton;
