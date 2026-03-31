function SearchBar({ value, onChange, placeholder }) {
    return (
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '10px',
          border: '1px solid #333',
          background: '#1a1a1a',
          color: '#fff',
          marginBottom: '20px'
        }}
      />
    );
  }
  
  export default SearchBar;