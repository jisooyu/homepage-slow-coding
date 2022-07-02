import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className='relative mx-auto p-4 bg-indigo-500 text-slate-100'>
      <div className='flex items-center justify-around font-size text-2xl'>
        <Link to='/' className='flex'>
          <img src='old_man_icon.jpeg' alt='old man' width='50' />
          <p className='m-2'> Old man's slow coding </p>
        </Link>
        <ul>
          {user ? (
            <li>
              <div
                onClick={onLogout}
                className='flex items-center hover:cursor-pointer'>
                <FaSignOutAlt /> Logout
              </div>
            </li>
          ) : (
            <div className='flex mx-2'>
              <li>
                <Link to='/login'>
                  <div className='flex items-center hover:cursor-pointer'>
                    <FaSignInAlt />
                    Login
                  </div>
                </Link>
              </li>
              <li>
                <Link to='/register'>
                  <div className='flex items-center hover:cursor-pointer'>
                    <FaUser />
                    Register
                  </div>
                </Link>
              </li>
            </div>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
