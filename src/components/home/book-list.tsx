"use client";

import { useReviews } from "@/entities/reviews/use-reviews";
import { RouterLink } from "@/shared/routes/components";
import { Card, Grid, Link, Typography } from "@mui/material";

const BookList = () => {
  const { data: reviews } = useReviews();

  return (
    <Grid container spacing={3}>
      {reviews?.data?.map((review) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={review.id}>
          <Card sx={{ padding: 2, height: "160px" }}>
            <Link
              component={RouterLink}
              href={`/review/${review.id}`}
              underline="none"
            >
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center" }}
              >
                {`${review.emoji} ${review.title}`}
              </Typography>
              <Typography variant="h6">{review.createdAt}</Typography>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
