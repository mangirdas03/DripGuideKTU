import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

import ImageWithFallback from "../components/Image";
import { SERVER_URL } from "../components/Links";

const Browse = (props: {name: string}) => {
    const navigate = useNavigate();
    const [items, setItems] = useState<any[]>([]);
    const [title, setTitle] = useState('🔥 Browsing all drip 🔥');
    const [pageCount, setpageCount] = useState(0);  
    const {query} = useParams();
    const [isLoading, setIsLoading] = useState(false);  

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    useEffect( () =>{
        (
          async () => {
            const getPosts = async () => {
              var res;
              setIsLoading(true);
              if(!query){
                setTitle('🔥 Browsing all drip 🔥');
                await fetch(SERVER_URL + `/Posts/Page/1`).then(async (result) => {
                    res = result;
                    const data = await res.json();
                    setpageCount(Number(res.headers.get('Page-Count')));
                    setItems(data);
                }).finally(() => {
                    setIsLoading(false)
                });
              }
              else{
                setTitle("🔥 Browsing results for \"" + query + "\" 🔥");
                await fetch(SERVER_URL + `/Posts/Page/1/${query}`).then(async (result) => {
                    res = result;
                    const data = await res.json();
                    setpageCount(Number(res.headers.get('Page-Count')));
                    setItems(data);
                }).finally(() => {
                    setIsLoading(false)
                });
              } 
          };
          getPosts();
        }
        )();
    }, [query]);

    const fetchPosts = async (currentPage : any) => {
        var res;
        if(!query){
           res = await fetch(SERVER_URL + `/Posts/Page/${currentPage}`);
        }
        else{
           res = await fetch(SERVER_URL + `/Posts/Page/${currentPage}/${query}`);
        } 
        const data = await res.json();
        return data;
      };

    const handlePageClick = async (data : any) => {
        let currentPage = data.selected + 1;
        const posts = await fetchPosts(currentPage);
        setItems(posts);

        window.scrollTo(0, 0)
      };

    const ViewDetails = async (post: any) => {
        navigate('/browse/item/' + post.id);
    }

    return (
        <div className="center-container" data-theme={localStorage.getItem('theme')}>
            <h1 className="center-text-title">{title}</h1>
            <p className="container-text">Press on the item to see full details.</p>
            <div className="cards">
            {
                items.map((post, key) => {
                    return(
                        <a className="card-box" key={key} onClick={() => ViewDetails(post)}>
                            <div className="card-icon">
                                <ImageWithFallback 
                                    key={post.id}
                                    className="card-image"
                                    fallback={'/nopic.png'}
                                    src={post.image}
                                />
                            </div>
                            <div className="center-option-title">
                                <p>{post.title}</p>
                            </div>
                            <div className="center-option-style">{post.styleCode}</div>
                        </a>
                    )
                }
                )
            }
            </div>
            {isLoading && <p>Loading items...</p>}
            {!isLoading && (items.length ? null : <p>No items matching your search...</p>)}
            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
                disabledClassName={"page-disabled"}
            />
        </div>
    );
};

export default Browse;