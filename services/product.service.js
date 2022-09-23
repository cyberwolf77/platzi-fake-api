const faker = require('faker');
const boom  = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 100;

    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data) {
    const { name, price, image } = data;
    const product = {
        id: faker.datatype.uuid(),
        name,
        price,
        image,
    };
    this.products.push(product);
    return product;
  }

  async find() {
    // return this.products;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }

  async findOne(id) {
    // const name = this.getTotal();
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw new boom.notFound('Product not found');
    }

    if (product.isBlock) {
      throw new boom.conflict('Product is block');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw new boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw new boom.notFound('Product not found');;
    }
    this.products[index].splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
