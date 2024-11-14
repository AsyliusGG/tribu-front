import React, { useState } from "react";
import { Typography, Input, Button, Textarea } from "@material-tailwind/react";
import { FaBuilding, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Contacto = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    alert("Mensaje enviado con éxito");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <Typography
          variant="h4"
          color="blue-gray"
          className="mb-4 text-center font-bold"
        >
          Contáctanos
        </Typography>
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="mb-8 text-center"
        >
          We use an agile approach to test assumptions and connect with the
          needs of your audience early and often.
        </Typography>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Formulario de contacto */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <Input
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div className="flex gap-4">
                <Input
                  type="email"
                  label="Your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
                <Input
                  type="tel"
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              <Input
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <Textarea
                label="Your message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <Button
                type="submit"
                className="w-full bg-pink-300 hover:bg-pink-400 text-white"
              >
                Enviar mensaje
              </Button>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="w-full md:w-1/3 flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <FaBuilding size={20} className="text-pink-300" />
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold"
                >
                  Información:
                </Typography>
                <Typography color="blue-gray" className="text-sm">
                  La Tribu Corp SpA
                  <br />
                  77.822.517-4
                </Typography>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt size={20} className="text-pink-300" />
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold"
                >
                  Address:
                </Typography>
                <Typography color="blue-gray" className="text-sm">
                  Reñaca Norte #265, oficina 510 <br />
                  Viña del Mar, Chile
                </Typography>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaPhoneAlt size={20} className="text-pink-300" />
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold"
                >
                  Llámanos:
                </Typography>
                <Typography color="blue-gray" className="text-sm">
                  Call us to speak to a member of our team. We are always happy
                  to help. <br />
                  <a href="tel:+56948190856" className="text-amber-900 font-bold">
                    (+56) 9 4819 0856
                  </a>
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
