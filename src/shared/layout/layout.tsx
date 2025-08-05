"use client";

import { type ReactNode } from "react";

import { Typography } from "@mui/material";
import * as S from "./layout.styled";

interface HeaderProps extends TitleProps {
  children?: ReactNode;
}

const Header = ({ title, desc, children }: HeaderProps) => {
  return (
    <S.BookHeader>
      <Title title={title} desc={desc} />
      {children && <S.HeaderContents>{children}</S.HeaderContents>}
    </S.BookHeader>
  );
};

interface TitleProps {
  title: string;
  desc?: string;
}

const Title = ({ title, desc }: TitleProps) => {
  return (
    <S.TitleBox>
      <Typography variant={"h3"}>{title}</Typography>
      {desc && <Typography variant={"subtitle1"}>{desc}</Typography>}
    </S.TitleBox>
  );
};

const Contents = ({ children }: { children: ReactNode }) => {
  return (
    <S.BookContents>
      <S.ContentsInner>{children}</S.ContentsInner>
    </S.BookContents>
  );
};

const Layout = ({ children }: { children: ReactNode }) => {
  return <S.BookWrapper>{children}</S.BookWrapper>;
};

const BookLayout = Object.assign(Layout, {
  Header,
  Title,
  Contents,
});

export default BookLayout;
