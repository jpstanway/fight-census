import { NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";
import menus from "../../data/menus";

const Rankings: NextPage = () => {
  const rankings = menus.find((menu) => menu.header === "Rankings");

  return (
    <div>
      <Title>Divisions</Title>
      <InnerContainer>
        {rankings?.items.map((division) => (
          <Link key={division.id} href={division.url}>
            <DivisionLink>
              <LinkContainer>
                <span>{division.name}</span>
                <span>{division.limit}</span>
              </LinkContainer>
            </DivisionLink>
          </Link>
        ))}
      </InnerContainer>
    </div>
  );
};

const Title = styled.h1`
  color: ${(props) => props.theme.textDark};
  text-align: center;
`;

const InnerContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 2rem;
  margin: auto;
  max-width: 75rem;
`;

const DivisionLink = styled.a`
  color: ${(props) => props.theme.textDark};

  &:hover {
    color: ${(props) => props.theme.textLight};
    text-decoration: none;
  }
`;

const LinkContainer = styled.div`
  box-shadow: 0 0 0.5rem rgba(53, 64, 82, 0.2);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;

  &:hover {
    box-shadow: 0 0 1rem rgba(53, 64, 82, 0.3);
  }
`;

export default Rankings;
