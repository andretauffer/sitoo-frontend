import React from "react";
import Table from "../../Blocks/Table";
import Card from "../../Blocks/Card";
import "./Products.css";

const images = [
  "fas fa-drumstick-bite",
  "fas fa-oil-can",
  "fas fa-satellite",
  "fas fa-thermometer",
  "fas fa-gas-pump",
  "fab fa-expeditedssl",
  "fas fa-assistive-listening-systems",
  "fas fa-toilet"
];

const manufactorers = [
  "fas fa-synagogue",
  "fas fa-building",
  "fas fa-warehouse",
  "fas fa-torii-gate",
  "fas fa-store-alt",
  "fas fa-kaaba",
  "fas fa-hotel",
  "fas fa-gopuram"
];

const mockProducts = () => {
  const products = [];
  for (let i = 0; i < 16; i++) {
    const image = i >= 8 ? images[i - 8] : images[i];
    products.push({ name: "product-test", id: i, image });
  }
  return products;
};

export default () => (
  <div>
    <Table header="Products">
      {mockProducts().map(product => (
        <Card key={product.id}>
          <div className="product">
            <i className={`${product.image} product-icon`} />
            <p className="product-name">{product.name}</p>
          </div>
        </Card>
      ))}
    </Table>
  </div>
);
