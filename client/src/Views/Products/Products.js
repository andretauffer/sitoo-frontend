import React from "react";
import Table from "../../Blocks/Table";
import Card from "../../Blocks/Card";

const mockProducts = () => {
  const products = [];
  for (let i = 0; i < 30; i++) {
    products.push({ name: "product-test", id: i });
  }
  return products;
};

export default () => (
  <div>
    <Table header="Products">
      {mockProducts().forEach(product => (
        <Card key={product.id}>
          <p>{product.name}</p>
        </Card>
      ))}
    </Table>
  </div>
);
