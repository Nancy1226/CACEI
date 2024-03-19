import Up from '../../assets/Up.png'
import Paragraph from '../atoms/Paragraph';
import Title from '../atoms/Title';

function CardsAlum({alumno, total, actual}) {
    return ( 
    <>
        <article className="w-full border-[1.5px] h-[506px] bg-white flex flex-col gap-5 items-center justify-center py-7 rounded-lg">
            <div className=" w-38 h-36 rounded-full overflow-hidden">
                <img className="w-full h-full object-cover" src={Up} alt="" />
            </div>
            <Title level="h1" text="Alumno a evaluar:" />
            <Title level="h2" text={alumno.nombre} />
            <p className='text-base font-bold'>{alumno.matricula}</p>
            <Title level="h3" text="Software" />
            <h2> {actual+1}/{total}</h2>
        </article>
    </> 
    );
}

export default CardsAlum;