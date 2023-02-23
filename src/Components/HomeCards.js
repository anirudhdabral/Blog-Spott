import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalInfo } from '../App';

function HomeCard() {
    const [blogs] = useState(JSON.parse(localStorage.getItem("blog")));
    const { madeBy } = useContext(GlobalInfo);
    if (blogs)
        return (
            <div className="row mx-5 mt-4">
                {
                    blogs.map((element) => {
                        return <div className="col-6" key={element.id}>
                            <div className="card blog-card text-dark">
                                <div className="card-body">
                                    <h5 className="card-title text-truncate">{element.Title}</h5>
                                    <hr />
                                    <p className="content-text-truncate">{element.Content}</p>
                                    <Link to={`/blog/${element.id}`} className="stretched-link"></Link>
                                </div>
                            </div>
                        </div>
                    })
                }

            </div>
        );
    else
        return (
            <div className='mx-5 mt-4'>
                <div>
                    <h1>No blogs to show!!</h1>
                    <div className='h6 mt-3'>Here are the steps to create your first blog:</div>
                    <ol className="list-group list-group-numbered">
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Click new blog</div>
                                Click the new blog button on top of the page
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Select Title</div>
                                Select a title for your blog <small className='text-muted'>(min. 10 characters)</small>
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Mention tags</div>
                                Provide tags so that user can know the subject of your blog <small className='text-muted'>(min. 1 tag)</small>
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Write your content</div>
                                Explain in detail about the topic of your blog and your views on it <small className='text-muted'>(min. 100 characters)</small>
                            </div>
                        </li>
                    </ol>
                </div>
                <div className='sticky-bottom text-muted watermark'>{madeBy}</div>
            </div>
        );
}

export default HomeCard;