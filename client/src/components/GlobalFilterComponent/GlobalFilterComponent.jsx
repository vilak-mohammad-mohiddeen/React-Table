import { useRef ,useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './GlobalFilterComponent.css'
import { faArrowRight, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { globalfilterActions } from '../../store/global-filter-slice';
import { useDispatch } from 'react-redux';
import './GlobalFilterComponent.css'

export default function GlobalFilterComponent() {

    const inputRef = useRef();
    const dispatch = useDispatch();
    const [startedSearch, setStartedSearch] = useState(false);


    const handleOnChange = (e) => {
        const value = e.target.value || '';
        
        if (value == '') {
            dispatch(globalfilterActions.search(''));
            setStartedSearch(false);
        }
        console.log(value);
    };


    const fetchFilteredData=async (value)=>{
        await fetch(`http://localhost:3000/table/filter?search=${value}`).then(res=>{
            return res.json();
        }).then(result=>{
            dispatch(globalfilterActions.data(result.data));
        }).catch(err => {
            console.error("Couldn't fetch data", err);
        });
    }

    const handleClick = () => {

        //check if null
        const value = inputRef.current.value;
        fetchFilteredData(value);
        // inputRef.current.value='';
        dispatch(globalfilterActions.search(value));
        if (value != '') {
            setStartedSearch(true);
        }

        console.log("By Click ", value);
    }

    const handleClear = () => {
        inputRef.current.value = '';
        const value = inputRef.current.value;
        dispatch(globalfilterActions.search(value));
        dispatch(globalfilterActions.data([]));
        setStartedSearch(false);
        console.log("By Clear ", value);
    }

    return (
        <>
            <div className="input-btn-group">
                <input ref={inputRef} className='search' name='search' type="text" onChange={handleOnChange} />
                <button className='btn' onClick={startedSearch ? handleClear : handleClick}>{startedSearch ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faSearch} />}</button>
                
            </div>
        </>
    );

}