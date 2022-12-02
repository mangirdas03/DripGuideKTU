import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ImageWithFallback from "../components/Image";

const Item = (props : {role: boolean, name: string}) => {
    const navigate = useNavigate();

    const {id} = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState('');
    const [description2, setDescription2] = useState('');
    const [material, setMaterial] = useState('');
    const [price, setPrice] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [styleCode, setStyleCode] = useState('');
    const [colorway, setColorway] = useState('');
    const [fK_Brand, setBrand] = useState('');
    const [edit, setEdit] = useState('');
    const [image, setImage] = useState<string | undefined>(undefined);

    const [comments, setComments] = useState<any[]>([]);


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

    const AddComment = async () => {
        const postId = id;
        const MySwal = withReactContent(Swal)
        await MySwal.fire({
            title: 'New comment',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            color: 'white',
            background: '#3e4956',
            confirmButtonColor: 'lightblue',
            preConfirm: (text) => {
                if(!text){
                    MySwal.showValidationMessage('Comment cannot be empty!');
                }
                else if(text.length < 2){
                    MySwal.showValidationMessage('Comment is too short!');
                }
                else{
                    MySwal.fire({
                        title: 'Confirm comment?',
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
                                const response = await fetch('http://localhost:8000/api/Comments', {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    credentials: 'include',
                                    body: JSON.stringify({text, postId})
                                });
                                if(response.ok)
                                {
                                    MySwal.fire({
                                        icon: 'success',
                                        title: <p>Comment added!</p>,
                                        showConfirmButton: false,
                                        showCancelButton: false,
                                        showCloseButton: false,
                                        timer: 1200,
                                        color: 'white',
                                        background: '#3e4956',
                                        confirmButtonColor: 'lightblue'
                                    }).then(() =>{
                                        window.location.reload();
                                    });
                                }
                                else{
                                    MySwal.fire({
                                        icon: "error",
                                        title: <p>Error adding comment!</p>,
                                        color: 'white',
                                        background: '#3e4956',
                                        confirmButtonColor: 'lightblue'
                                    });
                                }
                            }
                            confirm();
                        } 
                        else
                        {
                          return;
                        }
                    })
                }
            }
        });
    }

    const EditComment = async (commentId: string, currentText: string) => {
        const MySwal = withReactContent(Swal)
        await MySwal.fire({
            title: 'Editing comment',
            input: 'text',
            inputValue: currentText,
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            color: 'white',
            background: '#3e4956',
            confirmButtonColor: 'lightblue',
            preConfirm: (text) => {
                if(!text){
                    MySwal.showValidationMessage('Comment cannot be empty!');
                }
                else if(text.length < 2){
                    MySwal.showValidationMessage('Comment is too short!');
                }
                else{
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
                                const response = await fetch('http://localhost:8000/api/Comments/' + commentId, {
                                    method: 'PUT',
                                    headers: {'Content-Type': 'application/json'},
                                    credentials: 'include',
                                    body: JSON.stringify({text})
                                });
                                if(response.ok)
                                {
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
                                        window.location.reload();
                                    });
                                }
                                else{
                                    MySwal.fire({
                                        icon: "error",
                                        title: <p>Error saving comment!</p>,
                                        color: 'white',
                                        background: '#3e4956',
                                        confirmButtonColor: 'lightblue'
                                    });
                                }
                            }
                            if(text != currentText){
                                confirm()
                            }
                            else{
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
                                });
                            }
                        } 
                        else
                        {
                          return;
                        }
                    })
                }
            }
        });
        
    }

    const DeleteComment = async (id: string) => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: 'Are you sure you want to delete this comment?',
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
                    const response = await fetch('http://localhost:8000/api/Comments/' + id, {
                    method: 'DELETE',
                    credentials: 'include'
                    });
                    if(response.ok)
                    {
                        MySwal.fire({
                            icon: 'success',
                            title: <p>Comment Successfully deleted!</p>,
                            showConfirmButton: false,
                            showCancelButton: false,
                            showCloseButton: false,
                            timer: 1200,
                            color: 'white',
                            background: '#3e4956',
                            confirmButtonColor: 'lightblue'
                        }).then(() =>{
                            window.location.reload();
                        });
                    }
                    else{
                        MySwal.fire({
                            icon: "error",
                            title: <p>Error deleting comment!</p>,
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
                else alert("Error loading item!");
            }
          )();
    }, []);

    // fetch comments
    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/Posts/' + id + "/Comments", {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                });
                if(response.status === 200)
                {
                    var content = await response.json();
                    setComments(content);
                }
                else if(response.status >= 400) {
                    alert("Error loading comments!");
                }
            }
          )();
    }, []);

    return (
        <div>
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
            <div className="comments">
                {!comments.length && <div>No comments, add some!</div>}
                {
                    comments.map((comment, key) => {
                        return(
                            <div className="comment" key={key}>
                                <div className="comment-header">
                                    <div className="comment-user">
                                        👤 {comment.userName}
                                    </div>
                                    <div className="comment-actions">
                                        {props.name === comment.userName && <button className="btn comment-btn" onClick={() => EditComment(comment.id, comment.text)} >✏️</button>}
                                        {(props.role || props.name === comment.userName) && <button className="btn comment-btn" onClick={() => DeleteComment(comment.id)} >❌</button>}
                                    </div>
                                </div>
                                <div className="comment-text">{comment.text}</div>
                                <div className="comment-date">{comment.submitTime.substr(0,16).replace("T"," ")}</div>
                            </div>
                        )
                    }
                    )
                }
                </div>
                <div className="comments-addnew">
                    {!props.role && !props.name && 
                        <div>
                            <Link className="small-link" to="/login">Login</Link> or <Link className="small-link" to="/register">Register</Link> to add a comment.
                        </div>
                    }
                    {props.name && 
                        <button className="btn btn-lg" onClick={() => AddComment()} >
                            New comment ✏️
                        </button>
                    }
                </div>
        </div>
    );
};

export default Item;