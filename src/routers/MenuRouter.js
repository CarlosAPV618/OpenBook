import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import Inicio from "../pages/Inicio";
import Categorias from "../pages/Categorias";
// import Support from "../pages/Support";
import PublicarLibro from "../pages/PublicarLibro";
import BooksContext from "../context/BooksContext";

const linkStyle = "w-full text-center p-2 hover:bg-green-900 duration-500";

const MenuRouter = () => {

  const {
    setBooks,
  } = useContext(BooksContext)

  return (
    <div className='w-11/12 bg-white rounded-xl shadow-2xl'>
      <div className="p-8 pl-10">
        <h1 className="md:w-1/4 sm:w-1/5 lg:w-1/4 bg-black tracking-tighter text-white text-2xl md:text-3xl justify-center h-16 flex items-center">
          OpenBook
        </h1>
      </div>

      <Router>

        <nav className="flex bg-black text-white items-center justify-center">
          <Link
            to="/"
            className={linkStyle}
            onClick={() => setBooks()}
          >
            Inicio
          </Link>
          <Link to="/categories" className={linkStyle}>Categorías</Link>
          {/* <Link to="/support" className={linkStyle}>Support</Link> */}
        </nav>

        <div>
          <Switch>
            <Route exact path="/" component={Inicio} />
            <Route exact path="/categories" component={Categorias} />
            {/* <Route exact path="/support" component={Support} /> */}
            <Route exact path="/publish" component={PublicarLibro} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default MenuRouter;
