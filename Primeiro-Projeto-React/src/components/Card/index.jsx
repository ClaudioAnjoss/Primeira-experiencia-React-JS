import './styles.css';

export function Card(props) {
    return (
        <div className='card'>
            <div className="containerUser">
                <img src={props.src} alt="Foto do perfil" />
                <strong>{props.name}</strong>
            </div>
            <small>{props.time}</small>

        </div>
    );
}