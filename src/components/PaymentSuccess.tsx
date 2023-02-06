import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const PaymentSuccess = () => {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          p: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h3">Thanks you for your order!</Typography>
        <Typography variant="h5" sx={{ p: 3 }}>
          Your payment is confirmed and your order will be on the way shortly!
        </Typography>
        <Button variant="contained">Continue shopping</Button>
      </Grid>
    </Grid>
  );
};
