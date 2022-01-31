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
import PublicarLibro from "../pages/PublicarLibro";
import BooksContext from "../context/BooksContext";

const linkStyle = "w-full text-center p-2 hover:bg-green-900 duration-500";

const MenuRouter = () => {
  const { setBooks } = useContext(BooksContext);

  return (
    <div className="w-full m-4 bg-white rounded-xl shadow-2xl mt-2">
      <Router>
        <div className="p-8 pl-10">
          <Link
            className="md:w-1/4 sm:w-40 lg:w-1/4 bg-black tracking-tighter text-white text-3xl justify-center h-16 flex items-center"
            to="/"
            onClick={() => setBooks()}
          >
            OpenBook
          </Link>
        </div>

        <nav className="flex bg-black text-white items-center justify-center">
          <Link to="/" className={linkStyle} onClick={() => setBooks()}>
            Inicio
          </Link>
          <Link to="/categories" className={linkStyle}>
            Categorías
          </Link>
          <Link to="/publish" className={linkStyle}>
            Publicar
          </Link>
        </nav>

        <div className="flex justify-center">
          <Switch>
            <Route exact path="/" component={Inicio} />
            <Route exact path="/categories" component={Categorias} />
            <Route exact path="/publish" component={PublicarLibro} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default MenuRouter;
