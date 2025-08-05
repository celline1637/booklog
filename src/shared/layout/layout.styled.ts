import styled from "@emotion/styled";

export const BookWrapper = styled.div`
  padding: 40px;
  max-width: 960px;
  margin: 0 auto;
`;

export const BookHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 32px;
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .desc {
    color: #666;
  }
`;

export const HeaderContents = styled.div`
  margin-top: 8px;
`;

export const BookContents = styled.section`
  background: #fafafa;
  padding: 32px;
  border-radius: 12px;
`;

export const ContentsInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
