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
          <i className="fas fa-home navbar__icon" />
        </Link>
        <Link to="/new-post">
          <i className="fas fa-plus-square navbar__icon" />
        </Link>
        <Link to="/explore">
          <i className="fas fa-compass navbar__icon" />
        </Link>
        <Link to={`/${user?.username}`}>
          <i className="fas fa-user-circle navbar__icon" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
