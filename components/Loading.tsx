import { ReactElement, ReactNode } from "react";

export function Loading(): ReactElement {
    return (
    <div className="flex flex-grow w-full place-content-center place-items-center">
      <progress className="progress w-1/4 progress-primary"></progress>
    </div>
    )
}