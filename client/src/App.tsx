import { useDynamicContext, DynamicWidget } from '@dynamic-labs/sdk-react-core';

export default function App() {
  const { user, isAuthenticated } = useDynamicContext();

  console.log('Authenticated:', isAuthenticated);
  console.log('User:', user);

  return (
    <div>
      <h1>Dynamic Demo</h1>
      <DynamicWidget />
    </div>
  );
}