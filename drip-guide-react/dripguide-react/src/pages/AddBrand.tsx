import {SyntheticEvent, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ImageWithFallback from "../components/Image";

const AddBrand = (props: {name: string, role: boolean}) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [establishmentDate, setEstablishmentDate] = useState('');
    const [founder, setFounder] = useState('');
    const [headquarters, setHeadquarters] = useState('');
    const [image, setImage] = useState<string | undefined>(undefined);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const Submit = async (e: SyntheticEvent) => {
        const MySwal = withReactContent(Swal)
        e.preventDefault();

        if([name, founder, description, headquarters].some(e => e.length < 2)){
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
            title: 'Are you sure you want to submit this brand?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            color: 'white',
            background: '#3e4956',
            confirmButtonColor: 'lightblue'
          }).then((result) => {
            if (result.isConfirmed) 
            {
                const submitBrand = async () => {
                    const response = await fetch('http://localhost:8000/api/Brands', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({name, description, headquarters, founder, establishmentDate, image})
                    });
                    if(response.ok)
                    {
                        MySwal.fire({
                        icon: 'success',
                        title: <p>Brand was successfully added!</p>,
                        showConfirmButton: true,
                        color: 'white',
                        background: '#3e4956',
                        confirmButtonColor: 'lightblue'
                        }).then(() =>{
                            navigate('/brands');
                        })
                    }
                    else{
                        MySwal.fire({
                            icon: "error",
                            title: <p>Error adding new brand! Check your inputs.</p>,
                            color: 'white',
                            background: '#3e4956',
                            confirmButtonColor: 'lightblue'
                        });
                    }
                }
                submitBrand()
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
                    <h1 className="center-text-title-smaller">About the form</h1>
                    <p className="container-text">To submit a new brand you must fill in
                    the form on the right. 👉 </p>
                    <h1 className="center-text-title-smaller">About form inputs</h1>
                    <p className="grid-right-title">Brand name:</p>
                    <p className="container-text">The name of the brand you are submitting. 
                    Do <u>not</u> write anything extra. Example: <i>Air Jordan</i>.</p>
                    <p className="grid-right-title">Description:</p>
                    <p className="container-text">Detailed description of the brand. Write everything that is <u>not covered in other fields</u>.</p>
                    <p className="grid-right-title">Establishment date</p>
                    <p className="container-text">Date when the brand was first established.</p>
                    <p className="grid-right-title">Founder</p>
                    <p className="container-text">Founder(-s) of the brand.</p>
                    <p className="grid-right-title">Headquarters</p>
                    <p className="container-text">Location where the main office/headquarters of the brand is currently located.</p>
                    <p className="grid-right-title">Image link</p>
                    <p className="container-text">Link to an image of the brand logo. Optional. Recommended image size: at least 350x350 px. </p>
                </div>
                <div className="grid-right-big">
                <h1 className="center-text-title">New brand 🏢</h1>
                <form onSubmit={Submit}>
                    <div className="auth-element">
                        <p className="auth-element-label">◾ Name <b title="Required" className="auth-required">*</b></p>
                        <input type="name" className="auth-input" placeholder="Name"
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="auth-element">
                        <p className="auth-element-label">◾ Description <b title="Required" className="auth-required">*</b></p>
                        <input type="title" className="auth-input" placeholder="Description"
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="auth-element">
                        <p className="auth-element-label">◾ Establishment date <b title="Required" className="auth-required">*</b></p>
                        <input type="date" className="auth-input" placeholder="dd-mm-yyyy" required
                            onChange={e => setEstablishmentDate(e.target.value)}
                        />
                    </div>
                    <div className="auth-element">
                        <p className="auth-element-label">◾ Founder <b title="Required" className="auth-required">*</b></p>
                        <input type="brand" className="auth-input" placeholder="Founder"
                            onChange={e => setFounder(e.target.value)}
                        />
                    </div>
                    <div className="auth-element">
                        <p className="auth-element-label">◾ Headquarters <b title="Required" className="auth-required">*</b></p>
                        <textarea className="auth-input" placeholder="Headquarters"
                            onChange={e => setHeadquarters(e.target.value)}
                        />
                    </div>
                    <div className="auth-element">
                        <p className="auth-element-label">◾ Image link </p>
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

export default AddBrand;