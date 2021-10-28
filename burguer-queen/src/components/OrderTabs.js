import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProductListCard from "./ProductListCard";
import Pagination from "./Pagination";

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

export default function BasicTabs({ products, addProduct }) {
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
                    <Tab label="Llevando a mesa" {...a11yProps(2)} />
                    <Tab label="Entregado" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ProductListCard type="Desayuno" products={products} addProduct={addProduct} />
                <Pagination counter={3} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ProductListCard type="Preparados" products={products} addProduct={addProduct} />
                <Pagination counter={3} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ProductListCard type="Llevando a mesa" products={products} addProduct={addProduct} />
                <Pagination counter={3} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <ProductListCard type="Entregado" products={products} addProduct={addProduct} />
                <Pagination counter={3} />
            </TabPanel>
        </Box>
    );
}