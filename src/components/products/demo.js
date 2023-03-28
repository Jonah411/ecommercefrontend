<Card>
  <CardContent>
    <Typography
      sx={{ fontSize: 14 }}
      variant="h5"
      color="text.secondary"
      gutterBottom
    >
      {productDetails?.name}
    </Typography>
    <Typography variant="h5" component="div"></Typography>

    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={3}
    >
      {" "}
      <Typography gutterBottom variant="h5" component="div">
        Price: {productDetails?.price}
      </Typography>
      <Rating
        name="read-only"
        value={parseInt(productDetails?.rating_star)}
        readOnly
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
      />
    </Stack>
    {/* <Typography variant="body2" color="text.secondary">
    <Typography
      variant="body2"
      color="text.secondary"
      dangerouslySetInnerHTML={{ __html: productDetails?.description }}
    />
  </Typography> */}
  </CardContent>
  <CardActions>
    <Grid container justifyContent="flex-end" spacing={2}>
      <Grid item>
        <AddCart productId={productDetails?._id} />
      </Grid>
      <Grid item>
        <BuyCart product={productDetails} />
      </Grid>
    </Grid>
  </CardActions>
</Card>;
