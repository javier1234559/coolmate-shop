import { MagnifyingGlass } from 'phosphor-react';
import './SearchInput.css'; // Import your CSS file

const SearchInput = () => {
  return (
    <div className="search-container">
      <MagnifyingGlass size={25} className="search-icon" />
      <input type="search" placeholder="Tìm kiếm sản phẩm ..." />
    </div>
  );
};

export default SearchInput;
