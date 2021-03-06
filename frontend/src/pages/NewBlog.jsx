import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { toast } from "react-toastify";
import { createBlog, reset } from "../features/blogs/blogSlice";
import uploadImage from "../components/uploadImage";
import Spinner from "../components/Spinner";
import CustomOption from "../components/CustomOption";
import CustomTable from "../components/CustomTable";
import ColorPic from "../components/ColorPic.jsx";

const NewBlog = () => {
  // const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.blogs
  );
  // const [name] = useState(user.name);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [category, setCategory] = useState("SW General");
  const [status, setStatus] = useState("new");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/blogs");
    }
  }, [dispatch, isError, isSuccess, message, navigate]);

  // const uploadImageCallback = (file) => {
  //   return new Promise((resolve, reject) => {
  //     uploadImage(file)
  //       .then((link) => {
  //         resolve({ data: { link } });
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // };

  const uploadImageCallback = async (file) => {
    try {
      const link = await uploadImage(file);
      return { data: { link } };
    } catch (error) {
      return error;
    }
  };

  const handleEditorChange = (currentState) => {
    setEditorState(currentState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const content = convertToRaw(editorState.getCurrentContent());
    const contentState = JSON.stringify(content);
    dispatch(createBlog({ title, category, status, contentState }));
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
        ????????? ?????????
      </header>
      <form className='mt-10' onSubmit={onSubmit}>
        <label className='m-4 text-violet-900 font-bold' htmlFor='category'>
          ????????????
        </label>
        <select
          className='bg-blue-600 rounded-lg hover:bg-blue-900 text-white'
          name='category'
          id='category'
          onChange={(e) => setCategory(e.target.value)}>
          <option value='SW General'>SW General</option>
          <option value='React JS'>React JS</option>
          <option value='Node JS'>Node JS</option>
          <option value='Javascript'>Javascript</option>
          <option value='Python'>Python</option>
          <option value='C++'>C++</option>
          <option value='others'>Others</option>
        </select>
        <label className='text-violet-900 m-10' htmlFor='status'>
          ??????
        </label>
        <select
          className='bg-blue-600 rounded-lg hover:bg-blue-900 text-white'
          name='status'
          id='status'
          onChange={(e) => setStatus(e.target.value)}>
          <option value='new'>new</option>
          <option value='open'>open</option>
          <option value='closed'>closed</option>
        </select>
        <label className='text-violet-900 m-10' htmlFor='title'>
          ????????? ??????
        </label>
        <input
          type='text'
          className='w-1/3 cursor-auto'
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <div className='mt-10'>
          <Editor
            toolbarClassName='toolbarClassName'
            wrapperClassName='wrapperClassName'
            editorClassName='editorClassName'
            wrapperStyle={wrapperStyle}
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            toolbarCustomButtons={[<CustomOption />, <CustomTable />]}
            toolbar={{
              colorPicker: { component: ColorPic },
              inline: {
                inDropdown: false,
                options: ["bold", "italic", "underline"],
              },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: {
                popupClassName: "demo-popup-custom",
                link: { className: "demo-option-custom" },
                unlink: { className: "demo-option-custom" },
              },
              history: { inDropdown: true },
              image: {
                uploadCallback: uploadImageCallback,
                previewImage: true,
              },
            }}
          />
        </div>
        <button className='mt-12'>Submit</button>
      </form>
    </div>
  );
};

export default NewBlog;
