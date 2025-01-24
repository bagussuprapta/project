import AuthProvider from "./AuthProvider";
import UserProvider from "./UserProvider";
import FlashcardProvider from "./FlashcardProvider";

const providers = [AuthProvider, UserProvider, FlashcardProvider];

export default function Provider({ children }) {
  return providers.reduceRight((acc, ProviderComponent) => <ProviderComponent>{acc}</ProviderComponent>, children);
}
