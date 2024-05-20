import { MagnifyingGlass } from 'phosphor-react';
import './SearchInput.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    const keyword = document.querySelector('input[name="search"]').value;
    // Create a params object
    const params = new URLSearchParams({
      keyword: keyword,
    });

    // Convert to URL query string
    const queryString = params.toString();

    navigate(`/search?${queryString}`);
  };

  return (
    <div className="search-container">
      <input name="search" type="search" placeholder="Tìm kiếm sản phẩm ..." />
      <MagnifyingGlass size={25} className="search-icon" onClick={handleSearch} />
    </div>
  );
};
export default SearchInput;
