import { Link } from "react-router-dom";
import { FaRegHandPointRight } from "react-icons/fa";

function BlogItem({ blog }) {
  return (
    <div className='grid grid-cols-8 gap-2 mx-3'>
      <Link to={`/blog/${blog._id}`} className='col-span-3 flex mx-2'>
        <FaRegHandPointRight color='purple' />
        <p className='pl-3'>{blog.title}</p>
      </Link>
      <div className='col-span-2 mx-5'>{blog.category}</div>
      <div className={`col-span-1 status status-${blog.status} mx-5`}>
        {blog.status}
      </div>
      <div className='col-span-2 ml-5 mb-3'>
        {new Date(blog.createdAt).toLocaleString("en-US")}
      </div>
    </div>
  );
}

export default BlogItem;
