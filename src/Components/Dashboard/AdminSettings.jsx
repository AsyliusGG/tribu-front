import React from "react";
import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { Home, Settings, People, Dashboard, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const AdminSettings = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/admin/dashboard" },
    { text: "Usuarios", icon: <People />, path: "/admin/usuarios" },
    { text: "Configuración", icon: <Settings />, path: "/admin/configuracion" },
    { text: "Inicio", icon: <Home />, path: "/" },
    { text: "Cerrar Sesión", icon: <Logout />, path: "/logout" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#1976d2",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Panel de Administración
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} onClick={() => handleNavigation(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Bienvenido al Panel de Administración
        </Typography>
        <Typography variant="body1">
          Selecciona una de las opciones del menú lateral para administrar las configuraciones del sistema.
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminSettings;
