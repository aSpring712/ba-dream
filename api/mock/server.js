import { setupServer } from 'msw/node'
// import { setupServer } from "msw";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);