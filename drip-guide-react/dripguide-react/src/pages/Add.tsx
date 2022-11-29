import React, {SyntheticEvent, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ImageWithFallback from "../components/Image";

const Add = (props: {name: string, role: boolean}) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState('');
    const [description2, setDescription2] = useState('');
    const [material, setMaterial] = useState('');
    const [price, setPrice] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [styleCode, setStyleCode] = useState('');
    const [colorway, setColorway] = useState('');
    const [fK_Brand, setBrand] = useState('');
    const [image, setImage] = useState('');
    const [brandId, setBrandId] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const Submit = async (e: SyntheticEvent) => {
        const MySwal = withReactContent(Swal)
        e.preventDefault();

        if([title, fK_Brand, description, material, price, colorway, styleCode].some(e => e.length < 2)){
            MySwal.fire({
                icon: "error",
                title: (<p>Please fill all the required fields!</p>),
                html: <p>At least 2 characters are needed for each input.</p>,
                color: 'white',
                background: '#3e4956',
                confirmButtonColor: 'lightblue'
                });
            return
        }
        MySwal.fire({
            title: 'Are you sure you want to submit this item?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            color: 'white',
            background: '#3e4956',
            confirmButtonColor: 'lightblue'
          }).then((result) => {
            if (result.isConfirmed) 
            {
                const foo = async () => {
                    const response = await fetch('http://localhost:8000/api/Posts', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({title, description, description2, material, price, releaseDate, styleCode, colorway, fK_Brand, image, brandId})
                    });
                    if(response.ok)
                    {
                        var text = "Item was successfully submitted and is waiting for moderator review!";
                        if(props.role)
                            text = "Item was successfully added!";
                        MySwal.fire({
                        icon: 'success',
                        title: <p>{text}</p>,
                        showConfirmButton: true,
                        color: 'white',
                        background: '#3e4956',
                        confirmButtonColor: 'lightblue'
                        }).then(() =>{
                            navigate('/browse');
                        })
                    }
                    else{
                        MySwal.fire({
                            icon: "error",
                            title: <p>Error adding new item! Check your inputs.</p>,
                            color: 'white',
                            background: '#3e4956',
                            confirmButtonColor: 'lightblue'
                        });
                    }
                }
                foo()
            } 
            else
            {
                return
            }
        })
    }
    
    return (
        <div className="center-container-full">
            <div className="parent">
                <div className="grid-left-big"> 
                    <h1 className="center-text-title-smaller">Decided to submit an item? Alright! 👌</h1>
                    <p className="container-text">To submit a new item you must fill in
                    the form on the right. 👉 </p>
                    {!props.role && <p className="container-text">Administrator will review your submitted item and confirm it.</p>}
                    <h1 className="center-text-title-smaller">About form inputs</h1>
                    <p className="grid-right-title">Item title:</p>
                    <p className="container-text">The title/name of the item you are submitting. 
                    Do <u>not</u> write anything extra. Example: <i>Jordan 1 Shattered backboard.</i></p>
                    <p className="grid-right-title">Brand and/or designer:</p>
                    <p className="container-text">The name of brand and/or designer of the item. 
                    Example: <i>Nike, Tinker Hatfield.</i></p>
                    <p className="grid-right-title">Description:</p>
                    <p className="container-text">Detailed description of the item. Write everything that is <u >not covered in other fields</u>.</p>
                    <p className="grid-right-title">More description:</p>
                    <p className="container-text">Another description input field. Optional.</p>
                    <p className="grid-right-title">Materials</p>
                    <p className="container-text">Materials used for this item. Example: <i>Leather, rubber, polyester.</i></p>
                    <p className="grid-right-title">Retail price</p>
                    <p className="container-text">Retail price of the item. Feel free to use currency symbols. Example: <i>$220.</i></p>
                    <p className="grid-right-title">Style code</p>
                    <p className="container-text">Unique style code that most items have. Example: <i>555088-005.</i></p>
                    <p className="grid-right-title">Colorway</p>
                    <p className="container-text">Colorway/colors used for this item. Example: <i>WHITE/VARSITY RED-BLACK.</i></p>
                    <p className="grid-right-title">Image link</p>
                    <p className="container-text">Link to an image of the item. Optional. Recommended image size: at least 350x350 px. </p>
                </div>
                <div className="grid-right-big">
                <h1 className="center-text-title">New drip 👕</h1>
                <form onSubmit={Submit}>
                    <div className="auth-element">
                        <p className="auth-element-label">◾ Brand <b title="Required" className="auth-required">*</b></p>
                        <input type="number" className="auth-input" placeholder="Brand"
                            onChange={e => setBrandId(e.target.value)}
                        />
                    </div>
                    <div className="auth-element">
                        <p className="auth-element-label">◾ Item title <b title="Required" className="auth-required">*</b></p>
                        <input type="title" className="auth-input" placeholder="Title"
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="auth-element">
                        <p className="auth-element-label">◾ Designer <b title="Required" className="auth-required">*</b></p>
                        <input type="brand" className="auth-input" placeholder="Brand, designer"
                            onChange={e => setBrand(e.target.value)}
                        />
                    </div>
                    <div className="auth-element">
                        <p className="auth-element-label">◾ Description <b title="Required" className="auth-required">*</b></p>
                        <textarea className="auth-input" placeholder="Description"
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="auth-element">
                        <p className="auth-element-label">◾ More description</p>
                        <textarea className="auth-input" placeholder="Extra description (optional)"
                            onChange={e => setDescription2(e.target.value)}
                        />
                    </div>
                    <div className="auth-element">
                        <p className="auth-element-label">◾ Materials used <b title="Required" className="auth-required">*</b></p>
                        <input type="material" className="auth-input" placeholder="Material"
                            onChange={e => setMaterial(e.target.value)}
                        />
                    </div>
                    <div className="auth-element">
                        <p className="auth-element-label">◾ Retail price <b title="Required" className="auth-required">*</b></p>
                        <input type="price" className="auth-input" placeholder="Price"
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="auth-element">
                        <p className="auth-element-label">◾ Release date <b title="Required" className="auth-required">*</b></p>
                        <input type="date" className="auth-input" placeholder="dd-mm-yyyy" required
                            onChange={e => setReleaseDate(e.target.value)}
                        />
                    </div>
                      
                    <div className="auth-element">
                        <p className="auth-element-label">◾ Unique style code <b title="Required" className="auth-required">*</b></p>
                        <input type="code" className="auth-input" placeholder="Code"
                            onChange={e => setStyleCode(e.target.value)}
                        />
                    </div>
                    <div className="auth-element">
                        <p className="auth-element-label">◾ Colorway <b title="Required" className="auth-required">*</b></p>
                        <input type="colorway" className="auth-input" placeholder="Colorway"
                            onChange={e => setColorway(e.target.value)}
                        />
                    </div>
                    <div className="auth-element">
                        <p className="auth-element-label">◾ Image link</p>
                        <textarea className="auth-input" placeholder="Image link"
                            onChange={e => setImage(e.target.value)}
                        />
                    </div>
                    <div className="card-icon">
                        <ImageWithFallback 
                            key={image}
                            className="card-image"
                            fallback={'/nopic.png'}
                            src={image}
                        />
                    </div>
                    <div className="auth-element">
                        <button className="btn btn-lg" type="submit">Submit 📤</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
};

export default Add;