import { Provider } from 'react-wrap-balancer';

/** @param {import('react').PropsWithChildren<unknown>} */
import { ReactNode } from 'react';

export function BalancerProvider({ children }: { children: ReactNode }) {
    return <Provider>{children}</Provider>;
}