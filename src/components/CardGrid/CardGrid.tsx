import React from "react";
import styled from "styled-components";
import { ContentCard } from "../ContentCard";
import { Card } from "../../types";

const CardGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
`;

export interface CardGridProps {
  cards: Card[];
}

export default function CardGrid({ cards }:CardGridProps) {
  return (
    <CardGridStyled>
      {cards.map((card) => (
        <ContentCard header={card.header} footer={card.footer} color={card.color}>
          {card.content}
        </ContentCard>
      ))}
    </CardGridStyled>
  );
}
