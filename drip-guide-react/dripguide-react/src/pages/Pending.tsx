import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import ImageWithFallback from "../components/Image";
import { SERVER_URL } from "../components/Links";

const Pending = (props: {name: string, role: boolean}) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<any[]>([]);
    const [pageCount, setpageCount] = useState(0);  

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
      
    useEffect(() => {
        (
            async () => {
                const response = await fetch(SERVER_URL + '/Posts/pending/1', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                });
                if(response.ok)
                {
                    const content = await response.json();
                    setpageCount(Number(response.headers.get('Page-Count')));
                    setPosts(content);
                }
                else alert("Error");
            }
          )();
    }, []);

    const fetchPosts = async (currentPage : any) => {
        var res = await fetch(SERVER_URL + `/Posts/pending/${currentPage}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
        const data = await res.json();
        return data;
      };

    const handlePageClick = async (data : any) => {
        let currentPage = data.selected + 1;
        const posts = await fetchPosts(currentPage);
        setPosts(posts);

        window.scrollTo(0, 0)
      };

    const ViewDetails = async (post: any) => {
        navigate('./item/' + post.id);
    }

    return (
        <div className="center-container" data-theme={localStorage.getItem('theme')}>
            <h1 className="center-text-title">Pending user submissions</h1>
            <p className="container-text">Press on the item to see full details.</p>
            <div className="cards">
            {
                posts.map((post, key) => {
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
            {posts.length ? null : <p>No user submissions found!</p>}
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

export default Pending;