import {
  Button,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CheckoutOrder } from "./CheckoutOrder";
import { PaymentSuccess } from "./components/PaymentSuccess";
import Mentium, { MentiumConfig } from "@mentiumio/mentium-pay";

interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

const productsData: Product[] = [
  {
    id: "97375399bf10f57d0f0f7fd9",
    image: "/static/product_1.png",
    name: "Healthcare Erbology",
    price: 23.99,
    quantity: 1,
  },
  {
    id: "ece4069546ff025047b97735",
    image: "/static/product_2.png",
    name: "Makeup Lancome Rouge",
    price: 95.0,
    quantity: 1,
  },
];

export const App = () => {
  const [setpIndex, setStepIndex] = useState(1);
  const subtotal = productsData.reduce(
    (accumulator, product) => accumulator + product.price * product.quantity,
    0
  );
  const shippingTax = 12;
  const total = subtotal + shippingTax;

  const onPaymentClick = () => {
    Mentium.open({
      session: "http://localhost:40/phone",
    });
    // const widget = new MentiumWidget();
    // widget.init({
    //   link: "http://localhost:5173/phone",
    //   onSuccess: () => {
    //     setStepIndex(2);
    //   },
    // });
  };

  const steps = ["Order details", "Payment", "Confirmation"];

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {/* <ResponsiveAppBar /> */}
      <Paper
        sx={{
          height: "100%",
          p: fullScreen ? 1 : 2,
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid item xs={fullScreen ? 11 : 8} sx={{ p: 2 }}>
            <Stepper activeStep={setpIndex} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          {setpIndex === 1 && (
            <Grid container item xs={fullScreen ? 11 : 8}>
              <Grid item xs={12} sx={{ p: 2 }}>
                <CheckoutOrder
                  products={productsData}
                  shippingTax={shippingTax}
                  subtotal={subtotal}
                  total={total}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pt: 2,
                }}
              >
                <div id="mentium-pay"></div>
                <Button variant="contained" onClick={() => onPaymentClick()}>
                  Pay with Mentium
                </Button>
              </Grid>
            </Grid>
          )}
          {setpIndex === 2 && (
            <Grid container item xs={fullScreen ? 11 : 8}>
              <PaymentSuccess />
            </Grid>
          )}
        </Grid>
      </Paper>
    </>
  );
};

export default App;
