

export function GlobalFilterComponent({globalFilter,setGlobalFilter}){

    return (
        <>
        <span>
            <input name="search" type="text" value={globalFilter || ''} onChange={(e)=>setGlobalFilter(e.target.value)} />
            
        </span>
        </>
    );
}