import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";
import Cookies from "js-cookie";
import { getMembershipByUUID, getUserById } from "../../api/api";

const ComprobarMembresia = () => {
  const { uuid } = useParams(); // Obtener la UUID de la URL
  const [user, setUser] = useState(null);
  const [membership, setMembership] = useState(null);
  const token = Cookies.get("auth_token");

  useEffect(() => {
    const fetchMembershipData = async () => {
      try {
        const membershipData = await getMembershipByUUID(uuid, token);
        setMembership(membershipData);
        const userData = await getUserById(membershipData.user, token);
        setUser(userData);
      } catch (error) {
        console.error("Error al obtener los datos de membresía o usuario:", error);
      }
    };
  
    fetchMembershipData();
  }, [uuid, token]);

  // Verifica si la membresía está activa según el campo `active` y la fecha de vencimiento
  const isMembershipActive = (membership) =>
    membership && membership.active && (!membership.end_date || new Date(membership.end_date) > new Date());

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <Card className="w-full max-w-lg p-6 text-center">
        {user && membership ? (
          <>
            <Typography variant="h5" color="blue-gray" className="font-bold mb-4">
              Comprobación de Membresía
            </Typography>
            <Typography color="blue-gray" className="mb-4">
              <strong>Nombre:</strong> {user.first_name}
            </Typography>
            <Typography color="blue-gray" className="mb-4">
              <strong>Apellido:</strong> {user.last_name}
            </Typography>
            <Typography color="blue-gray" className="mb-4">
              <strong>RUT:</strong> {user.run}
            </Typography>
            <Typography
              variant="h6"
              color={isMembershipActive(membership) ? "green" : "red"}
              className="font-bold mt-6"
            >
              {isMembershipActive(membership) ? "Membresía activa" : "Membresía vencida"}
            </Typography>
          </>
        ) : (
          <Typography>Cargando información de la membresía...</Typography>
        )}
      </Card>
    </div>
  );
};

export default ComprobarMembresia;
