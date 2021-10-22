import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProductListCard from "./ProductListCard";

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
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const products1 = [
    {
      id: '1',
      img: 'https://ranchoviejocartagena.com/wp-content/uploads/2020/05/959305-5f612a39-2e72-450c-bbeb-a3e1943a0f2a.jpg?189db0&189db0',
      name: 'Hamburguesa doble',
      price: '5.00',
    },
    {
      id: '2',
      img: 'https://ranchoviejocartagena.com/wp-content/uploads/2020/05/959305-5f612a39-2e72-450c-bbeb-a3e1943a0f2a.jpg?189db0&189db0',
      name: 'Hamburguesa',
      price: '5.00',
    },
    {
      id: '3',
      img: 'https://ranchoviejocartagena.com/wp-content/uploads/2020/05/959305-5f612a39-2e72-450c-bbeb-a3e1943a0f2a.jpg?189db0&189db0',
      name: 'Hamburguesa simple',
      price: '5.00',
    },
  ];
  const products2 = [
    {
      id: '1',
      img: 'https://ranchoviejocartagena.com/wp-content/uploads/2020/05/959305-5f612a39-2e72-450c-bbeb-a3e1943a0f2a.jpg?189db0&189db0',
      name: 'Hamburguesa doble',
      price: '5.00',
    },
    {
      id: '3',
      img: 'https://ranchoviejocartagena.com/wp-content/uploads/2020/05/959305-5f612a39-2e72-450c-bbeb-a3e1943a0f2a.jpg?189db0&189db0',
      name: 'Hamburguesa sal',
      price: '5.00',
    },
    {
      id: '2',
      img: 'https://ranchoviejocartagena.com/wp-content/uploads/2020/05/959305-5f612a39-2e72-450c-bbeb-a3e1943a0f2a.jpg?189db0&189db0',
      name: 'Hamburguesa simple',
      price: '5.00',
    },
  ];

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
          <Tab label="Desayuno" {...a11yProps(0)} />
          <Tab label="Almuerzo y Cena" {...a11yProps(1)} />
          <Tab label="General" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ProductListCard products={products1}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProductListCard products={products2}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProductListCard products={products1}/>
      </TabPanel>
    </Box>
  );
}
