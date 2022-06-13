import { IconButton, InputBase } from 'material';
import { SearchIcon } from 'material/icons';
import { useState } from 'react';
import styles from './searchBar.module.scss';

const SearchBar = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpanded = () => {
    setExpanded((prevState: boolean) => {
      return !prevState;
    });
  };

  return (
    <div className="d-flex align-items-center">
      <IconButton aria-label="search" onClick={toggleExpanded}>
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        className={[
          styles.inputBar,
          !expanded ? styles.inputBarCollapsed : null
        ].join(' ')}
      />
    </div>
  );
};

export default SearchBar;
