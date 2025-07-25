import { useCToast } from '../toast/CToastProvider';

export const D1 = () => {
  const { showToast } = useCToast();

  const handleClick = () => {
    showToast('This is a success toast', 'success');
  };

  return <button onClick={handleClick}>Trigger Toast</button>;
};
