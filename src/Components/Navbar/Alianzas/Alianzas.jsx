import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const cardsData = [
  {
    id: 1,
    title: "10% GirlLabs",
    description:
      "GirlLabs tiene 10% de descuento en la mensualidad solo por formar parte de La Tribu. Es hora de ponernos guapas!",
    imgSrc:
      "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Product Launch Analysis",
    description:
      "We provide detailed insights and analysis to ensure your product launch goes smoothly and reaches the right audience.",
    imgSrc:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80", // Reemplazamos con una nueva URL de imagen
  },
  {
    id: 3,
    title: "Social Media Growth",
    description:
      "Our strategy has helped many businesses increase their social media engagement and presence in a competitive market.",
    imgSrc:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  },
];

const Alianzas = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <Typography variant="h2" color="blue-gray" className="text-center mb-10">
          Nuestras Alianzas
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cardsData.map((card) => (
            <Card key={card.id} className="w-full h-full flex flex-col justify-between">
              <CardHeader color="blue-gray" className="relative h-56">
                <img
                  src={card.imgSrc}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </CardHeader>
              <CardBody className="flex-grow">
                <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
                  {card.title}
                </Typography>
                <Typography className="text-center">{card.description}</Typography>
              </CardBody>
              <CardFooter className="flex justify-center pt-4">
                <Button>Read More</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alianzas;
