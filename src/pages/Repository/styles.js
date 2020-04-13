import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  margin-top: 30px;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 2px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const IssueFilter = styled.div`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;

  span {
    color: #333;
    font-weight: 600;
  }

  select {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 10px;
    border-radius: 4px;
    font-size: 16px;
    margin-left: 10px;
    background-color: #eee;
  }
`;

export const Footer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-around;

  button {
    background: #eee;
    color: #333;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;
    font-size: 16px;

    &:hover {
      color: #7159c1;
      box-shadow: 0px 0px 0px transparent;
      border: 0px solid transparent;
      text-shadow: 0px 0px 0px transparent;
    }

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.6;

      &:hover {
        color: #333;
        box-shadow: 0px 0px 0px transparent;
        border: 0px solid transparent;
        text-shadow: 0px 0px 0px transparent;
      }
    }
  }
`;