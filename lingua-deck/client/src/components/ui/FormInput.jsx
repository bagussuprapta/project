export default function FormInput({ value, placeholder, onChange, type }) {
  return <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="border text-center font-mono text-xs w-full py-1 rounded-lg outline-none" />;
}
