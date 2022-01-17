import Layout from '../components/Layout';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import NextLink from 'next/link';
import data from '../utils/data';
import db from '../utils/db';
import Product from '../models/Product';

export default function Home(props) {
  const { products } = props;
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} pssHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <Typography>$ {product.price}</Typography>
                <Button size="small" color="secondary">
                  Add To Cart
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
