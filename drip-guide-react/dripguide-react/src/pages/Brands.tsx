import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ImageWithFallback from "../components/Image";
import { SERVER_URL } from "../components/Links";

const Brands = (props: {role: boolean, name: string}) => {
    const navigate = useNavigate();
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    useEffect( () =>{
        (
            async () => {
                const getBrands = async () => {
                var res = await fetch(SERVER_URL + `/Brands`);
                const data = await res.json();
                setItems(data);
            };
            getBrands();
        }
        )();
    }, []);

    const ViewDetails = async (brand: any) => {
        navigate('/brands/' + brand.id);
    }

    const AddBrand = async () => {
        navigate('/brands/add');
    }

    return (
        <div className="center-container" data-theme={localStorage.getItem('theme')}>
            <h1 className="center-text-title">Browsing all brands</h1>
            <p className="container-text">Press on brand to view more info.</p>
            <div className="cards">
            {
                items.map((brand, key) => {
                    return(
                        <a className="card-box" key={key} onClick={() => ViewDetails(brand)}>
                            <div className="card-icon">
                                <ImageWithFallback 
                                    key={brand.id}
                                    className="card-image"
                                    fallback={'/nopic.png'}
                                    src={brand.image}
                                />
                            </div>
                            <div className="center-option-title">
                                <p>{brand.name}</p>
                            </div>
                            <div className="center-option-style">{brand.establishmentDate.substr(0, 10)}</div>
                        </a>
                    )
                }
                )
            }
            </div>
            <br/>
            <br/>
            {props.role && <div className="center-text-title">
                    <button className="btn btn-lg" onClick={() => AddBrand()} >
                        New brand 🏢
                    </button>
                </div>
            }
            {items.length ? null : <p>Loading brands...</p>}
        </div>
    );
};

export default Brands;