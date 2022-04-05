import React from 'react'
import styled from 'styled-components'

const StyledContentCard = styled.div<{ color: string }>`
  background-color: ${props => props.color};
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 16px;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr;
  grid-template-rows:50px auto 50px;
  min-height: 200px;
  grid-template-areas: "header" "content" "footer";
`

const Header = styled.div`
  grid-area: header;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 16px;
`
const Footer = styled.div`
  grid-area: footer;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 16px;

`
const Content = styled.div`
  grid-area: content;
  padding: 16px;
`

export interface ContentCardProps {
  children: React.ReactNode | string;
  header?: string;
  footer?: string;
  color?: string;
}


export default function ContentCard({
  children,
  footer,
  header,
  color = "#fff"
}: ContentCardProps) {
  return (
    <StyledContentCard color={color}>
      <Header>{header}</Header>
      <Content>{children}</Content>
      <Footer>{footer}</Footer>
    </StyledContentCard>
  )
}
