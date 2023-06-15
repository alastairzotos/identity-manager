import { loginWithEmailAndPassword, registerWithEmailAndPassword } from "@/clients/identity.client";
import { createQuery } from "@bitmetro/create-query";

export const useRegisterWithEmailAndPassword = createQuery(registerWithEmailAndPassword);
export const useLoginWithEmailAndPassword = createQuery(loginWithEmailAndPassword);
