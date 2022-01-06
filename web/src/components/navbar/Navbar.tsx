import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import "./index.css";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.session);
  return (
    <nav className="navbar__container">
      <Link className="app__logo__home" to="/">
        Isntagram
      </Link>

      <input className="navbar__search" placeholder="search" />

      <div className="navbar__icons">
        <Link to="/">
          <i className="fas fa-home" />
        </Link>
        <Link to="/new-post">
          <i className="fas fa-plus-square" />
        </Link>
        <Link to="/explore">
          <i className="fas fa-compass" />
        </Link>
        <Link to={`/${user?.username}`}>
          <i className="fas fa-user-circle" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
