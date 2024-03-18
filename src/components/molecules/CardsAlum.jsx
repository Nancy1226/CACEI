import Up from '../../assets/Up.png'
import Paragraph from '../atoms/Paragraph';
import Title from '../atoms/Title';

function CardsAlum({alumno}) {
    return ( 
    <>
        <article className="w-full border-[1.5px] h-[336px] bg-white flex flex-col gap-5 items-center justify-center py-7 rounded-lg">
            <div className=" w-36 h-36 rounded-full overflow-hidden">
                <img className="w-full h-full object-cover" src={Up} alt="" />
            </div>

            <Title level="h2" text={alumno.nombre} />
            <Paragraph text={alumno.matricula} />
            <Title level="h3" text="Software" />
        </article>
    </> 
    );
}

export default CardsAlum;