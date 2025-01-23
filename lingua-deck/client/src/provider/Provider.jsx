import AuthProvider from "./AuthProvider";
import UserProvider from "./UserProvider";

const providers = [AuthProvider, UserProvider];

export default function Provider({ children }) {
  return providers.reduceRight((acc, ProviderComponent) => <ProviderComponent>{acc}</ProviderComponent>, children);
}
