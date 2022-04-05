import React, { ReactChild, HTMLAttributes} from 'react'
export interface ThingProps extends HTMLAttributes<HTMLDivElement> {
  /** custom content, defaults to 'the snozzberries taste like snozzberries' */
  children?: ReactChild;
}
export default function Thing({ children }: ThingProps) {
  return <div>{children || `the snozzberries taste like snozzberries`}</div>;
}