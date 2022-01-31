import React, { useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BooksContext from '../context/BooksContext'

const linkStyles = 'text-white bg-green-600 lg:bg-green-700 p-3 rounded hover:bg-green-900 duration-500'
const accordionStyle = 'flex flex-wrap gap-y-3 md:gap-y-4 mb-2 w-full gap-x-4 justify-center md:mx-8'

const CategoriasAccordion = ({collection, headingStyle}) => {

  const { setBooks } = useContext(BooksContext)

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion expanded={expanded === collection.rama} onChange={handleChange(collection.rama)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography className={headingStyle}>{collection.rama}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <div className={accordionStyle}>
          {collection.categorias.map(cat => (
            <Link
              // to={'/categories/'+cat.endpoint}
              onClick={() => {
                setBooks(cat._id)
              }}
              className={linkStyles}
              key={cat._id}
              to='/'
              >
                {cat.name}
            </Link>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default CategoriasAccordion
