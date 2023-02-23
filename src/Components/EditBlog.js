import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './EditBlog.css'
import { GlobalInfo } from '../App';
import { useSelector } from 'react-redux';
import Login from './Login';

function EditBlog() {
    const isLoggedin = useSelector(state => state.isLoggedin);

    const navigate = useNavigate()
    const { madeBy } = useContext(GlobalInfo)

    const [Title, setTitle] = useState("");
    const [Tags, setTags] = useState("");
    const [tags_error, setTags_error] = useState("");
    const [Content, setContent] = useState("");
    const [content_error, setContent_error] = useState("");
    const [liked, setLiked] = useState(false)

    var { id } = useParams();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("blog"));
        if (stored)
            for (let i = 0; i < stored.length; i++) {
                if (JSON.parse(localStorage.getItem("blog"))[i].id === Number(id)) {
                    setContent(JSON.parse(localStorage.getItem("blog"))[i].Content);
                    setTitle(JSON.parse(localStorage.getItem("blog"))[i].Title);
                    setTags(JSON.parse(localStorage.getItem("blog"))[i].Tags);
                    setLiked(JSON.parse(localStorage.getItem("blog"))[i].liked);
                    break;
                }
            }
        else {
            navigate('/')
        }
        // eslint-disable-next-line
    }, [])

    function valid() {
        if (Tags.length < 10) {
            setTags_error("Please give atleast one tag.");
            var tagsCheck = true;
        }
        else {
            tagsCheck = false;
            setTags_error("");
        }
        if (Content.length < 100) {
            setContent_error("Content must be of minimum 100 characters.");
            var contentCheck = true;
        }
        else {
            contentCheck = false;
            setContent_error("");
        }
        return (tagsCheck === false && contentCheck === false)
    }

    async function submit() {
        if (valid()) {
            const stored = JSON.parse(localStorage.getItem("blog"));
            var newStored = []
            id = Number(id)
            var updatedBlog = { id, Title, Tags, Content, liked };
            newStored.push(updatedBlog);
            for (let i = 0; i < stored.length; i++) {
                if (JSON.parse(localStorage.getItem("blog"))[i].id === Number(id)) { }
                else {
                    newStored.push(JSON.parse(localStorage.getItem("blog"))[i])
                }
            }
            localStorage.setItem('blog', JSON.stringify(newStored))
            navigate('/')
        }
    }

    if (isLoggedin)
        return (
            <div>
                <div className="container">
                    <div className="h2 mb-3 text-light">Edit your blog</div>
                    <form className="text-dark">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" readonly placeholder="Blog Title" value={Title} />
                            <label>Blog Title</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" placeholder="Tags" defaultValue={Tags}
                                onChange={(e) => { setTags(e.target.value) }} on
                            />
                            <label>Tags</label>
                            <small className='input-error'>{tags_error}</small>
                        </div>
                        <div className="mb-3">
                            <textarea className="form-control edit-content" placeholder='Write your content here'
                                rows="3" defaultValue={Content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                            <small className='input-error'>{content_error}</small>
                        </div>
                        <button type='button' className='btn btn-light' onClick={() => { submit() }} >Update</button>
                        <Link to='/' className='btn btn-danger'>Cancel</Link>
                    </form>

                </div>
                <div className='sticky-bottom text-muted watermark'>{madeBy}</div>
            </div>
        );
    else
        return (
            <Login />
        )
}

export default EditBlog;