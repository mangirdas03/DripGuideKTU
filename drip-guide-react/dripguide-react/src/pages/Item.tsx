import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ImageWithFallback from "../components/Image";

const Item = (props : {role: boolean, name: string}) => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState('');
    const [description2, setDescription2] = useState('');
    const [material, setMaterial] = useState('');
    const [price, setPrice] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [date, setdate] = useState(new Date);
    const [styleCode, setStyleCode] = useState('');
    const [colorway, setColorway] = useState('');
    const [fK_Brand, setBrand] = useState('');
    const [edit, setEdit] = useState('');
    const [image, setImage] = useState<string | undefined>(undefined);

    const {id} = useParams();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const Edit = async () => {
        const MySwal = withReactContent(Swal)
            if(props.role === true)
            {
                navigate('/browse/edit/' + id);
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
                const response = await fetch('http://localhost:8000/api/Posts/' + id, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                });
                if(response.ok)
                {
                    const content = await response.json();
                    if(content.status === 0){
                        navigate('/browse/all');
                        window.location.reload();
                    }
                    setTitle(content.title);
                    setDescription(content.description);
                    setDescription2(content.description2);
                    setMaterial(content.material);
                    setPrice(content.price);
                    setReleaseDate(content.releaseDate.substr(0, 10));
                    setStyleCode(content.styleCode);
                    setColorway(content.colorway);
                    setBrand(content.fK_Brand);
                    setImage(content.image);
                    var submit = content.submitDate;
                    submit = submit.replace("T", " ");
                    setEdit(submit);
                }
                else alert("Klaida");
            }
          )();
    }, []);

    return (
        <div className="full-container">
                
                <div className="grid-top">
                    <p className="grid-top-title">🔥 {title}</p>
                    <p className="grid-top-text">{colorway}</p>
                </div>
                <div className="grid-left">
                    <div className="item-image-div">
                    <ImageWithFallback 
                        key={image}
                        className="item-image"
                        fallback={'/nopic.png'}
                        src={image}
                    />
                    {/* <img className="item-image" alt="No image" src={image}></img> */}
                    </div>
                </div>
                <div className="grid-right">
                    <p className="grid-right-title">Brand, designer:</p>
                    <p className="grid-right-text">{fK_Brand}</p>
                    <p className="grid-right-title">Item details:</p>
                    <p className="grid-right-text">{description}</p>
                    <br />
                    <p className="grid-right-text">{description2}</p>
                    <br />
                    <p className="grid-right-title">Retail price:</p>
                    <p className="grid-right-text">{price}</p>
                </div>
                <div className="grid-bottom"></div>
                <div className="grid-bottom-left"> 
                    <p className="grid-right-title">Colorway:</p>
                    <p className="grid-right-text">{colorway}</p>
                    <p className="grid-right-title">Material:</p>
                    <p className="grid-right-text">{material}</p>
                </div>
                <div className="grid-bottom-center"> 
                    <p className="grid-right-title">Style code:</p>
                    <p className="grid-right-text">{styleCode}</p>
                    <p className="grid-right-title">Release date:</p>
                    <p className="grid-right-text">{releaseDate}</p>
                </div>
                <div className="grid-bottom-right"> 
                    {props.role && 
                    <button className="btn btn-lg" onClick={() => Edit()} >
                        Edit item ✏️
                    </button>}
                    {!props.role && !props.name && 
                    <div>
                        <p className="unauth-text">Want to add some drip?</p>
                        <Link className="small-link" to="/login">Login</Link> or <Link className="small-link" to="/register">Register</Link>
                    </div>
                    }
                    {!props.role && props.name && 
                    <div>
                        <p className="unauth-text">Add some drip <Link className="small-link" to="/add">here</Link>.</p>
                    </div>
                    }
                    <p className="tiny-text">Last edited: {edit}</p>
                </div>
        </div>
    );
};

export default Item;