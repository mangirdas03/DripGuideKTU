import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ImageWithFallback from "../components/Image";
import { SERVER_URL } from "../components/Links";

const Brand = (props : {role: boolean, name: string}) => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [establishmentDate, setEstablishmentDate] = useState('');
    const [founder, setFounder] = useState('');
    const [headquarters, setHeadquarters] = useState('');
    const [image, setImage] = useState<string | undefined>(undefined);

    const {id} = useParams();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const Edit = async () => {
        const MySwal = withReactContent(Swal)
            if(props.role === true)
            {
                navigate('/brands/edit/' + id);
            }
            else{
            MySwal.fire({
                icon: 'error',
                title: <p>Admin only!</p>,
                showConfirmButton: false,
                showCancelButton: false,
                showCloseButton: false,
                timer: 1200
                })
            }
    }

    useEffect(() => {
        (
            async () => {
                const response = await fetch(SERVER_URL + '/Brands/' + id, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                });
                if(response.ok)
                {
                    const content = await response.json();
                    if(content.status === 0){
                        navigate('/brands');
                        window.location.reload();
                    }
                    setName(content.name);
                    setDescription(content.description);
                    setEstablishmentDate(content.establishmentDate.substr(0, 10));
                    setFounder(content.founder);
                    setHeadquarters(content.headquarters);
                    setImage(content.image);
                }
                else alert("Error!");
            }
          )();
    }, []);

    return (
        <div className="brand-container">
            <div className="grid-top">
                <p className="grid-top-title brand-big">{name}</p>
            </div>
            <div className="grid-left">
                <div className="item-image-div">
                <ImageWithFallback 
                    key={image}
                    className="item-image"
                    fallback={'/nopic.png'}
                    src={image}
                />
                </div>
            </div>
            <div className="grid-right">
                <p className="grid-right-title">Founder:</p>
                <p className="grid-right-text">{founder}</p>
                <p className="grid-right-title">Description:</p>
                <p className="grid-right-text">{description}</p>
                <br />
                <p className="grid-right-title">Establishment date:</p>
                <p className="grid-right-text">{establishmentDate}</p>
                <p className="grid-right-title">Headquarters:</p>
                <p className="grid-right-text">{headquarters}</p>
                <br />
                {props.role && 
                <button className="btn btn-lg" onClick={() => Edit()} >
                    Edit brand ✏️
                </button>}
            </div>
        </div>
    );
};

export default Brand;