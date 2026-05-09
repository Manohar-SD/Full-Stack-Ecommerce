import Product from "./Product"

const ProductList = ({products})=>{
    return <div className="flex flex-wrap justify-center gap-7 p-4">
        {products.map(product=>{
            return <Product key={product.name} product={product}/>
        })}
    </div> 
}
export default ProductList