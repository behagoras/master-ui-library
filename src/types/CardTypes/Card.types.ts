import React from "react";

export interface Card {
  header: string;
  content: React.ReactNode | string;
  footer: string;
  color?: string;
}