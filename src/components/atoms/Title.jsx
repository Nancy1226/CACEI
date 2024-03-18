function Title({ level, text }) {
    return ( 
    <>
        {level === 'h1' && <h1 className="font-bold text-2xl ">{text}</h1>}
        {level === 'h2' && <h3>{text}</h3>}
        {level === 'h3' && <h3>{text}</h3>}
        {level === 'h4' && <h4>{text}</h4>}
    </> 
    );
}

export default Title;