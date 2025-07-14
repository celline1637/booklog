"use client";

import { useGetBooks } from "@/entities/books/use-get-books";
import { RouterLink } from "@/shared/routes/components";
import { Card, Grid, Link, Typography } from "@mui/material";

const BookList = () => {
  const { data: books } = useGetBooks();

  return (
    <Grid container spacing={3}>
      {books?.data?.map((book) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
          <Card sx={{ padding: 2, height: "160px" }}>
            <Link
              component={RouterLink}
              href={`/review/${book.id}`}
              underline="none"
            >
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center" }}
              >
                {`${book.emoji} ${book.title}`}
              </Typography>
              <Typography variant="h6">{book.createdAt}</Typography>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
