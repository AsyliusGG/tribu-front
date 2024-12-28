import React, { useState } from "react";
import { Typography, Input, Button, Textarea } from "@material-tailwind/react";
import { FaBuilding, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { enviarFormularioContacto } from "../../api/api";

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    phone_number: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await enviarFormularioContacto(formData);
      alert("Mensaje enviado con éxito");
      setFormData({
        name: "",
        last_name: "",
        email: "",
        phone_number: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Error al enviar el mensaje");
    }
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
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <Input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
              />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <Input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
              />
              <Input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
              />
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
              />
              <Button type="submit">Enviar</Button>
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
