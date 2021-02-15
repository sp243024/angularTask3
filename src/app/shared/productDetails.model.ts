export class productDetails {
    public productId: number;
    public productName: string;
    public productPrice: number;
    public productCategory: string;
    public productDescription: string;
    public productImage: string;
    
    constructor(productId: number, productName: string, productPrice: number, productCategory: string, productDescription: string, productImage: string) {
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productCategory = productCategory;
        this.productDescription = productDescription;
        this.productImage = productImage
    }
}