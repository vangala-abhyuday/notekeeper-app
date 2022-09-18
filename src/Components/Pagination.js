const Pagination=({PPP,totalNotes,changePage})=>{
    const pages=[];

    for(let i=1;i<=Math.ceil(totalNotes/PPP);i++){
        pages.push(i);
    }

    return (
        <nav className="mt-3 pb-3 bottom">
            <ul className="pagination">
                {pages.map(num => (
                    <li key={num} className='pageNo'>
                        <a onClick={()=>changePage(num)} href="#!" className="page-link">
                            {num}
                        </a>

                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;