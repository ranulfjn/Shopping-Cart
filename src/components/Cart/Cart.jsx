import React from 'react';
import {Container,Typography,Button,Grid } from "@material-ui/core";
import useStyles from './styles'
import CartItem from './CartItem/CartItem';
import  { Link } from 'react-router-dom'


const Cart = ({ cart ,handleEmptyCart ,handleRemove, handleUpdateCartQty  }) => {
    const classes = useStyles();
    //console.log(cart.line_items.length);

    const EmptyCart=()=>(
        <Typography className={classes.title} variant="subtitle1" >You have no items in your cart
        <Link to="/" className={classes.link}> Start Adding </Link>
        </Typography>
    );

    const FilledCart=()=>(
        <>
                <Grid container spacing={3}>
                {
                    cart.line_items.map((item)=>(

                        <Grid item xs={12} sm={4} key={item.id}>
                            <CartItem item={item} handleUpdateCartQty={handleUpdateCartQty} handleRemove={handleRemove}/>
                        </Grid>

                    ))
                }
                </Grid >
                <div className={classes.cardDetails}>
                    <Typography variant ="h4">
                        Subtotal:{cart.subtotal.formatted_with_symbol}
                    </Typography>
                    <div>
                        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty cart</Button>
                        <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                    </div>

                </div>
        </>
    )

    if(!cart.line_items) return 'Loading...'
    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant='h3' gutterBottom >Your Shopping cart</Typography>
            {
                 !cart.line_items.length ? <EmptyCart/>:<FilledCart />
                
            }
        </Container>
    )
}

export default Cart;
