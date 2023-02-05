import React from "react";
import { useSelector } from "react-redux";
import { selectServices } from "../features/servicesSlice";

function Services() {
  const services = useSelector(selectServices);
  return (
    <div>
      <table>
        <tr>
          <th>ID</th>
          <th>Emri Sherbimit</th>
          <th>Çmimi per 1000</th>
          <th>Limiti porosise</th>
          <th>Kategoria</th>
        </tr>
        {services.map((service) => (
          <tr>
            <td>{service.service}</td>
            <td>{service.name}</td>
            <td>${service.rate}</td>
            <td>
              {service.min} - {service.max}
            </td>
            <td>{service.category}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Services;
