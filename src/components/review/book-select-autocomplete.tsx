import { useBooks } from "@/entities/books/use-books";
import { AsyncWrapper } from "@/shared/components/async-wrapper";
import { RHFAutocomplete } from "@/shared/components/form/rhf-autocomplete";
import type { Book } from "@/types/book";
import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import { memo, useCallback, type SyntheticEvent } from "react";

interface BookSelectAutocompleteInnerProps
  extends BookSelectAutocompleteProps {}

interface BookSelectAutocompleteProps {
  name: string;
  label?: string;
  placeholder?: string;
  onBookSelect?: (book: Book | null) => void;
}

// ----------------------------------------------------------------------

// 도서 옵션 아이템 컴포넌트
const BookOptionItem = memo(function BookOptionItem({ book }: { book: Book }) {
  return (
    <Stack direction="row" spacing={2} alignItems="center" width="100%">
      <Avatar sx={{ width: 48, height: 48 }} variant="rounded">
        📚
      </Avatar>

      <Box flex={1} minWidth={0}>
        <Typography variant="subtitle2" noWrap>
          {book.title}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
          <Typography variant="body2" color="text.secondary" noWrap>
            👤 {book.author}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} mt={0.5}>
          <Chip
            label={`${book.totalPages}쪽`}
            size="small"
            variant="outlined"
          />
          <Chip
            label={new Date(book.publishedAt).getFullYear()}
            size="small"
            variant="outlined"
          />
          {book.publisher && (
            <Chip label={book.publisher} size="small" variant="outlined" />
          )}
        </Stack>
      </Box>
    </Stack>
  );
});

// 도서 선택 Autocomplete 내부 컴포넌트 (Suspense 내부)
const BookSelectAutocompleteInner = memo(function BookSelectAutocompleteInner({
  name,
  label,
  placeholder,
  onBookSelect,
}: BookSelectAutocompleteInnerProps) {
  const { data: booksResponse } = useBooks();

  const books = booksResponse.data;

  const handleChange = useCallback(
    (_event: SyntheticEvent, newValue: Book | null) => {
      console.log("Selected book:", newValue);
      onBookSelect?.(newValue);
    },
    [onBookSelect]
  );

  const getOptionLabel = useCallback(
    (option: Book) => `${option.title} - ${option.author}`,
    []
  );

  const filterOptions = useCallback(
    (options: Book[], { inputValue }: { inputValue: string }) => {
      if (!inputValue.trim()) return options;

      const searchTerm = inputValue.toLowerCase();
      return options.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm)
      );
    },
    []
  );

  const renderOption = useCallback(
    (props: React.HTMLAttributes<HTMLLIElement>, option: Book) => (
      <Box component="li" {...props}>
        <BookOptionItem book={option} />
      </Box>
    ),
    []
  );

  return (
    <RHFAutocomplete
      name={name}
      label={label}
      placeholder={placeholder}
      options={books}
      getOptionLabel={getOptionLabel}
      onChange={handleChange}
      renderOption={renderOption}
      filterOptions={filterOptions}
      noOptionsText="검색 결과가 없습니다"
    />
  );
});

// ----------------------------------------------------------------------

// 메인 도서 선택 Autocomplete 컴포넌트
const BookSelectAutocomplete = memo(function BookSelectAutocomplete({
  name,
  label = "도서 선택",
  placeholder = "책 제목 또는 저자명을 입력하세요...",
  onBookSelect,
}: BookSelectAutocompleteProps) {
  return (
    <AsyncWrapper
      loadingText="도서 목록을 불러오고 있습니다..."
      errorTitle="도서 목록을 불러오는데 실패했습니다."
    >
      <BookSelectAutocompleteInner
        name={name}
        label={label}
        placeholder={placeholder}
        onBookSelect={onBookSelect}
      />
    </AsyncWrapper>
  );
});

export default BookSelectAutocomplete;
