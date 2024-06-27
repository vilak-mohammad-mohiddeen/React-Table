import React,{useRef, useState} from "react";

export function GlobalFilterComponent({ filter, setFilter }) {

  const inputRef=useRef();
  const [startedSearch,setStartedSearch] = useState(false);
  const handleOnChange = (e) => {
    const value = e.target.value || '';
    // setFilter(value);
    if(value == ''){
      setFilter('');
      setStartedSearch(false);
    }
    console.log(value);
  };

  const handleClick=()=>{
    
    const value=inputRef.current.value;
    // inputRef.current.value='';
    setFilter(value);
    if(value != ''){
      setStartedSearch(true);
    }
    
    console.log("By Click ",value);
  }

  const handleClear=()=>{
    inputRef.current.value='';
    const value=inputRef.current.value;
    setFilter(value);
    setStartedSearch(false);
    console.log("By Clear ",value);
  }
  
  return (
    <>
      <span>

        <input
        ref={inputRef}
          name="search"
          type="text"
          // value={filter}
          onChange={handleOnChange}
        /> {" "}
        <span><button onClick={startedSearch ? handleClear : handleClick }>{ startedSearch ? 'Clear' : 'Search' }</button></span>
      </span>
    </>
  );
}
