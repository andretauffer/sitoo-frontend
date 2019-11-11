import React from "react";
import Table from "../../Blocks/Table";
import Card from "../../Blocks/Card";
import "./Manufactorers.css";

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

const mockManufactorers = () => {
  const manufactorArray = [];
  for (let i = 0; i < 16; i++) {
    const image = i >= 8 ? manufactorers[i - 8] : manufactorers[i];
    manufactorArray.push({ name: "manufactorer-test", id: i, image });
  }
  return manufactorArray;
};

export default () => (
  <div>
    <Table header="Manufactorers">
      {mockManufactorers().map(manufactorer => (
        <Card key={manufactorer.id}>
          <div className="manufactorer">
            <i className={`${manufactorer.image} manufactorer-icon`} />
            <p className="manufactorer-name">{manufactorer.name}</p>
          </div>
        </Card>
      ))}
    </Table>
  </div>
);
