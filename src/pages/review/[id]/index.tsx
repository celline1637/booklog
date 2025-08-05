import BookLayout from "@/shared/layout/layout";
import { Button } from "@mui/material";

const Page = () => {
  return (
    <BookLayout>
      <BookLayout.Header title="책이름" desc="...">
        <Button>수정하기</Button>
      </BookLayout.Header>
    </BookLayout>
  );
};

export default Page;
