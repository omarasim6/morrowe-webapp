'use client';
import { createContext, useContext } from 'react';
// Lightweight read-only product list for client UI (search, cart thumbnails, recently viewed).
const Ctx = createContext([]);
export const useCatalog = () => useContext(Ctx);
export function CatalogProvider({ products, children }) { return <Ctx.Provider value={products}>{children}</Ctx.Provider>; }
