import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ImageWithFallback from "../components/Image";
import { SERVER_URL } from "../components/Links";


const EditBrand = (props : any) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [establishmentDate, setEstablishmentDate] = useState('');
    const [founder, setFounder] = useState('');
    const [headquarters, setHeadquarters] = useState('');
    const [image, setImage] = useState<string | undefined>(undefined);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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
                    if(!content.image)
                        setImage("https://")
                }
                else alert("Error");
            }
          )();
    }, []);

    const ConfirmPost = async (e : SyntheticEvent) => {
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
            title: 'Confirm changes?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            color: 'white',
            background: '#3e4956',
            confirmButtonColor: 'lightblue'
          }).then((result) => {
            if (result.isConfirmed) 
            {
                const confirm = async () => {
                    const response = await fetch(SERVER_URL + '/Brands/' + id, {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include',
                        body: JSON.stringify({name, description, founder, establishmentDate, headquarters, image})
                    });
                    if(response.ok)
                    {
                        e.preventDefault();
                        MySwal.fire({
                            icon: 'success',
                            title: <p>Changes saved!</p>,
                            showConfirmButton: false,
                            showCancelButton: false,
                            showCloseButton: false,
                            timer: 1200,
                            color: 'white',
                            background: '#3e4956',
                            confirmButtonColor: 'lightblue'
                            }).then(() =>{
                                navigate('/brands/' + id);
                            })
                    }
                    else{
                        MySwal.fire({
                            icon: "error",
                            title: <p>Error saving brand! Check your inputs.</p>,
                            color: 'white',
                            background: '#3e4956',
                            confirmButtonColor: 'lightblue'
                        });
                    }
                }
                confirm()
            } 
            else
            {
              return
            }
        })
    }
    const Delete = async () => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: 'Are you sure you want to delete this brand?',
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
                    const response = await fetch(SERVER_URL + '/Brands/' + id, {
                    method: 'DELETE',
                    credentials: 'include'
                });
                if(response.ok)
                {
                    MySwal.fire({
                        icon: 'success',
                        title: <p>Brand Successfully deleted!</p>,
                        showConfirmButton: false,
                        showCancelButton: false,
                        showCloseButton: false,
                        timer: 1200,
                        color: 'white',
                        background: '#3e4956',
                        confirmButtonColor: 'lightblue'
                        }).then(() =>{
                            navigate('/brands');
                        })
                }
                else if(response.status === 409){
                    MySwal.fire({
                        icon: "error",
                        title: <p>Could not delete brand, items were found!</p>,
                        color: 'white',
                        background: '#3e4956',
                        confirmButtonColor: 'lightblue'
                    });
                }
                else alert("Error");
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
                    <h1 className="center-text-title-smaller">About the form</h1>
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
                    <h1 className="center-text-title">Editing brand ✏️</h1>
                    <form onSubmit={ConfirmPost}>
                        <div className="auth-element">
                            <p className="auth-element-label">◾ Name <b title="Required" className="auth-required">*</b></p>
                            <input type="name" className="auth-input" placeholder="Name"
                                value={name} onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="auth-element">
                            <p className="auth-element-label">◾ Description <b title="Required" className="auth-required">*</b></p>
                            <textarea className="auth-input" placeholder="Description"
                                value={description} onChange={e => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="auth-element">
                            <p className="auth-element-label">◾ Establishment date <b title="Required" className="auth-required">*</b></p>
                            <input type="date" className="auth-input" placeholder="dd-mm-yyyy" required
                                value={establishmentDate} onChange={e => setEstablishmentDate(e.target.value)}
                            />
                        </div>
                        <div className="auth-element">
                            <p className="auth-element-label">◾ Founder <b title="Required" className="auth-required">*</b></p>
                            <input type="brand" className="auth-input" placeholder="Founder"
                                value={founder} onChange={e => setFounder(e.target.value)}
                            />
                        </div>
                        <div className="auth-element">
                            <p className="auth-element-label">◾ Headquarters <b title="Required" className="auth-required">*</b></p>
                            <textarea className="auth-input" placeholder="Headquarters"
                                value={headquarters} onChange={e => setHeadquarters(e.target.value)}
                            />
                        </div>
                        <div className="auth-element">
                            <p className="auth-element-label">◾ Image link </p>
                            <textarea className="auth-input" placeholder="Image link"
                                value={image} onChange={e => setImage(e.target.value)}
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
                            <button className="btn btn-lg" type="submit">Confirm edits ✔️</button>
                            <div></div>
                            <button className="btn btn-lg" type="button" onClick={() => Delete()} >Delete brand ❌</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    );
};

export default EditBrand;