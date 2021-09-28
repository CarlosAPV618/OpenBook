import React, { useContext } from 'react';
import { ThemeProvider } from '@material-ui/core'
import Acordeon from '../components/CategoriasAccordion';
import BooksContext from '../context/BooksContext';
import useAccordionStyles from '../hooks/useAccordionStyles';

const Categorias = () => {

    const { categories } = useContext(BooksContext)
    const {theme, classes} = useAccordionStyles()
    
    return (
        <div className='py-8 md:px-32 px-4 flex justify-center items-center'>
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    {categories.map(collection => (
                        <Acordeon 
                            key={collection._id}
                            collection={collection}
                            headingStyle={classes.heading}
                        />
                    ))}
                </div>
            </ThemeProvider>
        </div>
    );
};

export default Categorias;