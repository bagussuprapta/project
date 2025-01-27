import AuthProvider from "./AuthProvider";
import UserProvider from "./UserProvider";
import FlashcardProvider from "./FlashcardProvider";
import AttemptProvider from "./AttemptProvider";

const providers = [AuthProvider, UserProvider, FlashcardProvider, AttemptProvider];

export default function Provider({ children }) {
  return providers.reduceRight((acc, ProviderComponent) => <ProviderComponent>{acc}</ProviderComponent>, children);
}
