import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../ctx/auth.context"

function Navbar() {

  const { isLoggedIn, user, borrarToken } = useContext(AuthContext)

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to="/projects">
            <button>Projects</button>
          </Link>
          <button onClick={borrarToken}>Logout</button>
          {/* ?. */}

          {user?.data?.name}
          {user?.data?.email}


        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
