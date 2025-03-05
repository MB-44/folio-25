import { ReactNode } from "react";
import { BalancerProvider } from "./balancer";
import { StyledComponentsRegistry } from "./styled-components";

/** @param {import('react').PropsWithChildren<unknown>} */
export function Providers({ children} : {children : ReactNode}) {
    return (
        <StyledComponentsRegistry>
            <BalancerProvider>{children}</BalancerProvider>
        </StyledComponentsRegistry>
    );
}