import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import OrderListCard from "./OrderListCard";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2}}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ orders, updateOrder }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="tabs"
        >
          <Tab label="Pendientes" {...a11yProps(0)} />
          <Tab label="Preparados" {...a11yProps(1)} />
          <Tab label="Listos" {...a11yProps(2)} />
          <Tab label="Entregados" {...a11yProps(3)} />
          <Tab label="Cancelados" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <OrderListCard
          type="pendiente"
          orders={orders}
          updateOrder={updateOrder}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OrderListCard
          type="preparando"
          orders={orders}
          updateOrder={updateOrder}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <OrderListCard
          type="listo"
          orders={orders}
          updateOrder={updateOrder}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <OrderListCard
          type="entregado"
          orders={orders}
          updateOrder={updateOrder}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <OrderListCard
          type="cancelado"
          orders={orders}
          updateOrder={updateOrder}
        />
      </TabPanel>
    </Box>
  );
}
