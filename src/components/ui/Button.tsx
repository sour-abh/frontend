import React, { type ReactElement } from 'react'
import { cn } from '../utils/cn';

export interface ButtonProps{
    variant:"primary"|"secondary";
    size:"sm"|"md"|"lg";
    text:string;
    startIcon?:ReactElement;
    endIcon?:ReactElement;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?:string;

}
 const variantStyles = {
   primary: "bg-purple-600 text-white hover:bg-purple-600/90 font-light",
   secondary: "bg-purple-200 text-purple-500 hover:bg-purple-200/80 ",
 };
 const size={
    'sm':"h-8 px-3 py-2",
    'md':"h-9 px-4 py-4 text-base ",
    'lg':'h-10 px-6 py-6 text-lg'
 }
export default function Button(props:ButtonProps):ReactElement<HTMLButtonElement> {
    
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-normal transition-all disabled:pointer-events-none disabled:opacity-50   shrink-0  outline-none focus-visible:border-purple-500 focus-visible:ring-purple-500/50 focus-visible:ring-[3px]",
        variantStyles[props.variant] ||
          "bg-purple-600 text-white hover:bg-purple-600/90 font-light",
        size[props.size] || "h-9 px-4 py-5 text-base",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.startIcon} {props.text}
      {props.endIcon}
    </button>
  );
}
