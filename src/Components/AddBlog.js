import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddBlog.css';
import { GlobalInfo } from '../App'
import { useSelector } from 'react-redux';
import Login from './Login';


function AddBlog() {
    const isLoggedin = useSelector(state => state.isLoggedin);

    const navigate = useNavigate()
    const { madeBy } = useContext(GlobalInfo)

    const [title, setTitle] = useState("")
    const [title_error, setTitle_error] = useState("")
    const [tags, setTags] = useState("")
    const [tags_error, setTags_error] = useState("")
    const [content, setContent] = useState("")
    const [content_error, setContent_error] = useState("")
    const [liked] = useState(false)

    function valid() {
        if (title.length < 10) {
            setTitle_error("Title must be of minimum 10 characters.");
            var titleCheck = true;
        }
        else {
            titleCheck = false;
            setTitle_error("");
        }
        if (tags.length < 1) {
            setTags_error("Please give atleast one tag.")
            var tagsCheck = true;
        }
        else {
            tagsCheck = false;
            setTags_error("")
        }
        if (content.length < 100) {
            setContent_error("Content must be of minimum 100 characters.")
            var contentCheck = true;
        }
        else {
            contentCheck = false;
            setContent_error("")
        }
        return (titleCheck === false && tagsCheck === false && contentCheck === false)
    }

    function submit() {
        if (valid()) {
            var Title = title;
            var Tags = tags;
            var Content = content;
            var id = 1;
            var stored;
            if (JSON.parse(localStorage.getItem("blog")) === null) {
                stored = []
            }
            else {
                stored = JSON.parse(localStorage.getItem("blog"));
                id = stored.length + 1;
            }
            var newBlog = { id, Title, Tags, Content, liked };
            stored.push(newBlog);
            localStorage.setItem('blog', JSON.stringify(stored))
            navigate('/')
        }
    }

    if (isLoggedin)
        return (
            <div>
                <div className="container">
                    <div className="mb-3 text-light">
                        <span className='h2'>Write your blog</span>
                        <small className='px-3'>( Title of the blog cannot be changed later )</small>
                    </div>
                    <form>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" name="title" placeholder="Blog Title"
                                onChange={(e) => { setTitle(e.target.value); }} />
                            <label>Blog Title</label>
                            <small className='input-error'>{title_error}</small>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" name="tags" placeholder="Tags"
                                onChange={(e) => { setTags(e.target.value); }} />
                            <label>Tags</label>
                            <small className='input-error'>{tags_error}</small>
                        </div>

                        <div className="mb-3">
                            <textarea className="form-control add-content" name="content" placeholder='Write your content here' rows="3"
                                onChange={(e) => { setContent(e.target.value); }} ></textarea>
                            <small className='input-error'>{content_error}</small>
                        </div>

                        <button type='button' className='btn btn-light'
                            onClick={() => { submit() }} >Publish</button>
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

export default AddBlog;