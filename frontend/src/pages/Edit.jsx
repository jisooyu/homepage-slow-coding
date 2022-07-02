import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { toast } from "react-toastify";
import { getBlog, updateBlog } from "../features/blogs/blogSlice";
import uploadImage from "../components/uploadImage";
import Spinner from "../components/Spinner";

function Edit() {
  const { user } = useSelector((state) => state.auth);
  const { blog, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.blogs
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogid } = useParams();
  const [name] = useState(user.name);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getBlog(blogid));
    setTitle(blog.title);
    setCategory(blog.category);
    setStatus(blog.status);
  }, [dispatch, isError, isSuccess, message, navigate]);

  const initialState = blog.contentState
    ? EditorState.createWithContent(
        convertFromRaw(JSON.parse(blog.contentState))
      )
    : EditorState.createEmpty();

  const [editorState, setEditorState] = useState(initialState);

  if (isError) {
    return <h3>Something went wrong in Edit.jsx</h3>;
  }

  const uploadImageCallback = (file) => {
    return new Promise((resolve, reject) => {
      console.log("uploading image...");
      uploadImage(file)
        .then((link) => {
          resolve({ data: { link } });
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const content = convertToRaw(editorState.getCurrentContent());
    const contentState = JSON.stringify(content);
    dispatch(updateBlog({ category, title, status, contentState }));
    navigate("/blogs");
  };
  if (isLoading) {
    return <Spinner />;
  }

  const wrapperStyle = {
    border: "1px solid",
    height: "35em",
    width: "60em",
  };

  return (
    <div className='grid grid-cols-1 place-items-center text-2xl mt-10'>
      <header className='text-violet-900 font-bold text-3xl'>
        블로그 편집기
      </header>
      <form className='mt-10' onSubmit={onSubmit}>
        <label className='m-4 text-violet-900 font-bold' htmlFor='category'>
          카테고리
        </label>
        <select
          className='bg-blue-600 rounded-lg hover:bg-blue-900 text-white'
          name='category'
          id='category'
          value={category}
          placeholder={category}
          onChange={(e) => setCategory(e.target.value)}>
          <option value='SW General'>SW General</option>
          <option value='React JS'>React JS</option>
          <option value='Node JS'>Node JS</option>
          <option value='Javascript'>Javascript</option>
          <option value='python'>Python</option>
          <option value='C++'>C++</option>
          <option value='others'>Others</option>
        </select>
        <label className='text-violet-900 m-10' htmlFor='status'>
          상태
        </label>
        <select
          className='bg-blue-600 rounded-lg hover:bg-blue-900 text-white'
          name='status'
          id='status'
          value={status}
          placeholder={status}
          onChange={(e) => setStatus(e.target.value)}>
          <option value='new'>new</option>
          <option value='open'>open</option>
          <option value='closed'>closed</option>
        </select>
        <label className='text-violet-900 m-10' htmlFor='title'>
          블로그 제목
        </label>
        <input
          type='text'
          value={title}
          placeholder={title}
          className='w-1/3 cursor-auto'
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className='mt-10'>
          <Editor
            toolbarClassName='toolbarClassName'
            wrapperClassName='wrapperClassName'
            editorClassName='editorClassName'
            wrapperStyle={wrapperStyle}
            editorState={editorState}
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: {
                uploadCallback: uploadImageCallback,
                previewImage: true,
              },
            }}
            localization={{ locale: "ko" }}
            onEditorStateChange={onEditorStateChange}
          />
        </div>
        <button className='mt-12'>Submit</button>
      </form>
    </div>
  );
}

export default Edit;
